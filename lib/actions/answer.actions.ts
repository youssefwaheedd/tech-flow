/* eslint-disable no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Answer from "../models/answer.model";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "../models/question.model";
import User from "../models/user.model";
import Interaction from "../models/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();
    const { content, authorId, questionId, path } = params;
    const newAnswer = await Answer.create({
      content,
      author: authorId,
      question: questionId,
    });
    const questionObject = await Question.findByIdAndUpdate(questionId, {
      $push: { answers: newAnswer._id },
    });
    await User.findByIdAndUpdate(authorId, {
      $push: { answers: newAnswer._id },
      $inc: { reputation: 10 },
    });

    await Interaction.create({
      user: authorId,
      action: "answer",
      questionId,
      answer: newAnswer._id,
      tags: questionObject.tags,
    });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    // Ensure the database connection is established before querying
    await connectToDatabase(); // Assuming this function is async
    const { questionId, sortBy, page = 1, pageSize = 3 } = params;
    let sortOptions = {};
    if (sortBy === "recent") {
      sortOptions = { createdAt: -1 };
    } else if (sortBy === "old") {
      sortOptions = { createdAt: 1 };
    } else if (sortBy === "lowestUpvotes") {
      sortOptions = { upvotes: 1 };
    } else if (sortBy === "highestUpvotes") {
      sortOptions = { upvotes: -1 };
    }

    // Fetch answers from the database with populated author details
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkID name avatar")
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Return the fetched answers
    return { answers };
  } catch (error) {
    console.error("Error fetching answers:", error);

    // Return an empty array and an error message
    return { answers: [], error: "Failed to fetch answers" };
  }
}

export async function voteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    // Fetch the current Answer and user to check voting status
    const answer = await Answer.findById(answerId);
    const user = await User.findById(userId);

    if (!answer || !user) {
      throw new Error("Answer or User not found");
    }

    const alreadyUpvoted = answer.upvotes.includes(userId);
    const alreadyDownvoted = answer.downvotes.includes(userId);

    // Handle downvote
    if (hasdownVoted) {
      if (alreadyDownvoted) {
        await User.findByIdAndUpdate(answer.author, {
          $inc: { reputation: 10 },
        });
        await Answer.findByIdAndUpdate(answerId, {
          $pull: { downvotes: userId },
        });
        await User.findByIdAndUpdate(userId, {
          $pull: { downvotes: answerId },
          $inc: { reputation: 2 },
        });
        return; // Exit if already downvoted
      }

      // Update Answer votes
      await Answer.findByIdAndUpdate(answerId, {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      });

      await User.findByIdAndUpdate(answer.author, {
        $inc: { reputation: -10 },
      });
      // Update user votes
      await User.findByIdAndUpdate(userId, {
        $pull: { upvotes: answerId },
        $push: { downvotes: answerId },
        $inc: { reputation: -2 },
      });
    } else {
      // Handle upvote
      if (alreadyUpvoted) {
        await User.findByIdAndUpdate(answer.author, {
          $inc: { reputation: -10 },
        });
        await Answer.findByIdAndUpdate(answerId, {
          $pull: { upvotes: userId },
        });
        await User.findByIdAndUpdate(userId, {
          $pull: { upvotes: answerId },
          $inc: { reputation: -2 },
        });
        return; // Exit if already upvoted
      }

      // Update Answer votes
      await Answer.findByIdAndUpdate(answer, {
        $push: { upvotes: userId },
        $pull: { downvotes: userId },
      });

      await User.findByIdAndUpdate(answer.author, {
        $inc: { reputation: 10 },
      });
      // Update user votes
      await User.findByIdAndUpdate(userId, {
        $push: { upvotes: answerId },
        $pull: { downvotes: answerId },
        $inc: { reputation: 2 },
      });
    }
    // increment author's reputation by +10 for upvote and -5 for downvote
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getAnswerById(answerId: string) {
  try {
    await connectToDatabase();
    const answer = await Answer.findById(answerId);
    return answer;
  } catch (error) {
    console.error(error);
  }
}

export async function editAnswer(answerId: string, content: string) {
  try {
    await connectToDatabase();
    const answer = await Answer.findByIdAndUpdate(answerId, { content });
    return answer;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await connectToDatabase();
    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    await Answer.deleteOne({ _id: answerId });

    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );

    await Interaction.deleteMany({ answer: answerId });

    await User.updateMany(
      { answers: answerId },
      { $pull: { answers: answerId } }
    );

    await User.updateMany(
      { upvotedAnswers: answerId },
      { $pull: { upvotedAnswers: answerId } }
    );
    await User.updateMany(
      { downvotedAnswers: answerId },
      { $pull: { downvotedAnswers: answerId } }
    );
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
