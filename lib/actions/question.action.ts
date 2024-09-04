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

    revalidatePath(path);
    // create an interaction record for the user ask-question action

    // Increment author's reputation by +5 for creating a question
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const questions: any = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return { questions };
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

      // Update user votes
      await User.findByIdAndUpdate(userId, {
        $pull: { upvotes: questionId },
        $push: { downvotes: questionId },
      });
    } else {
      // Handle upvote
      if (alreadyUpvoted) {
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

      // Update user votes
      await User.findByIdAndUpdate(userId, {
        $push: { upvotes: questionId },
        $pull: { downvotes: questionId },
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

    const { clerkID } = params;

    const user = await User.findOne({ clerkID }).populate({
      path: "savedQuestions",
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
      options: { sort: { createdAt: -1 } },
    });

    // Check if user was found
    if (!user) {
      throw new Error("User not found");
    }

    // Return the populated saved questions
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
