/* eslint-disable no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Question from "../models/question.model";
import User from "../models/user.model";
import Tag from "../models/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetSavedQuestionsParams,
  QuestionVoteParams,
  ToggleSaveQuestionParams,
} from "./shared.types";
import Answer from "../models/answer.model";
import Interaction from "../models/interaction.model";
import { FilterQuery } from "mongoose";
import { Filter } from "lucide-react";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();
    const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    await User.findByIdAndUpdate(author, {
      $push: { questions: question },
    });

    // create an interaction record for the user ask-question action
    await Interaction.create({
      user: author,
      action: "ask-question",
      question: question._id,
      tags: tagDocuments,
    });
    // Increment author's reputation by +5 for creating a question
    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 5 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const { page = 1, pageSize = 10, searchQuery, filter } = params;

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, "i") },
        },
        {
          content: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }
    let sortOptions = {};
    if (filter === "unanswered") {
      query.answers = { $size: 0 };
    } else if (filter === "newest") {
      sortOptions = { createdAt: -1 };
    } else if (filter === "recommended") {
      sortOptions = { upvotes: -1 };
    } else if (filter === "frequent") {
      sortOptions = { views: -1 };
    }

    const totalNumberOfQuestions = await Question.countDocuments(query);

    const questions: any = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return { questions, totalNumberOfQuestions };
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({
        path: "author",
        model: User,
        select: "_id name avatar clerkID",
      })
      .populate({ path: "tags", model: Tag, select: "_id name" });
    return question;
  } catch (error) {
    console.error(error);
  }
}

export async function voteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    // Fetch the current question and user to check voting status
    const question = await Question.findById(questionId);
    const user = await User.findById(userId);

    if (!question || !user) {
      throw new Error("Question or User not found");
    }

    const alreadyUpvoted = question.upvotes.includes(userId);
    const alreadyDownvoted = question.downvotes.includes(userId);

    // Handle downvote
    if (hasdownVoted) {
      if (alreadyDownvoted) {
        await User.findByIdAndUpdate(question.author, {
          $inc: { reputation: 10 },
        });
        await Question.findByIdAndUpdate(questionId, {
          $pull: { downvotes: userId },
        });
        await User.findByIdAndUpdate(userId, {
          $pull: { downvotes: questionId },
        });
        return; // Exit if already downvoted
      }

      // Update question votes
      await Question.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      });

      await User.findByIdAndUpdate(question.author, {
        $inc: { reputation: -10 },
      });

      // Update user votes
      await User.findByIdAndUpdate(userId, {
        $pull: { upvotes: questionId },
        $push: { downvotes: questionId },
        $inc: { reputation: -1 },
      });
    } else {
      // Handle upvote
      if (alreadyUpvoted) {
        await User.findByIdAndUpdate(question.author, {
          $inc: { reputation: -10 },
        });
        await Question.findByIdAndUpdate(questionId, {
          $pull: { upvotes: userId },
        });
        await User.findByIdAndUpdate(userId, {
          $pull: { upvotes: questionId },
        });
        return; // Exit if already upvoted
      }

      // Update question votes
      await Question.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
        $pull: { downvotes: userId },
      });

      await User.findByIdAndUpdate(question.author, {
        $inc: { reputation: 10 },
      });

      // Update user votes
      await User.findByIdAndUpdate(userId, {
        $push: { upvotes: questionId },
        $pull: { downvotes: questionId },
        $inc: { reputation: 1 },
      });
    }
    // increment author's reputation by +10 for upvote and -5 for downvote
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, path } = params;

    const user = await User.findById(userId);
    if (user.savedQuestions.includes(questionId)) {
      await User.findByIdAndUpdate(userId, {
        $pull: { savedQuestions: questionId },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { savedQuestions: questionId },
      });
    }
    revalidatePath(path);
  } catch (error: any) {
    throw new Error("Error saving question", error);
  }
}

export async function getUserSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase();

    const { clerkID, searchQuery, page = 1, pageSize = 10, filter } = params;
    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, "i") },
        },
        {
          content: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    let sortOptions = {};

    if (filter === "most_recent") {
      sortOptions = { createdAt: -1 };
    } else if (filter === "most_voted") {
      sortOptions = { upvotes: -1 };
    } else if (filter === "most_answered") {
      sortOptions = { answers: -1 };
    } else if (filter === "oldest") {
      sortOptions = { createdAt: 1 };
    } else if (filter === "most_viewed") {
      sortOptions = { views: -1 };
    }

    const user = await User.findOne({ clerkID }).populate({
      path: "savedQuestions",
      match: query,
      model: "Question",
      populate: [
        {
          path: "author",
          model: "User",
        },
        {
          path: "tags",
          model: "Tag",
        },
      ],
      options: {
        sort: sortOptions,
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
    });

    // Check if user was found
    if (!user) {
      throw new Error("User not found");
    }

    return user.savedQuestions;
  } catch (error: any) {
    throw new Error("Error fetching user saved questions:", error);
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, path } = params;
    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );
    await User.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );
    await User.updateMany(
      { savedQuestions: questionId },
      { $pull: { savedQuestions: questionId } }
    );
    await User.updateMany(
      { upvotes: questionId },
      { $pull: { upvotes: questionId } }
    );
    await User.updateMany(
      { downvotes: questionId },
      { $pull: { downvotes: questionId } }
    );
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getHotQuestions() {
  try {
    await connectToDatabase(); // Ensure database is connected

    // Use aggregation to sort if any fields are arrays
    const questions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);

    return { questions };
  } catch (error) {
    console.error("Error fetching hot questions:", error);
    return { error: "Failed to retrieve hot questions" }; // Return an error response for better handling
  }
}
