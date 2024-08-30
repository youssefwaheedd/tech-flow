/* eslint-disable no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Answer from "../models/answer.model";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "../models/question.model";
import User from "../models/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();
    const { content, authorId, questionId, path } = params;
    const newAnswer = await Answer.create({
      content,
      author: authorId,
      question: questionId,
    });
    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: newAnswer._id },
    });

    // TODO : Add interaction
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    // Ensure the database connection is established before querying
    await connectToDatabase(); // Assuming this function is async

    const { questionId } = params;

    // Fetch answers from the database with populated author details
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkID name avatar")
      .sort({ createdAt: -1 });

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

    // Fetch the current question and user to check voting status
    const answer = await Answer.findById(answerId);
    const user = await User.findById(userId);

    if (!answer || !user) {
      throw new Error("Question or User not found");
    }

    const alreadyUpvoted = answer.upvotes.includes(userId);
    const alreadyDownvoted = answer.downvotes.includes(userId);

    // Handle downvote
    if (hasdownVoted) {
      if (alreadyDownvoted) {
        await Answer.findByIdAndUpdate(answerId, {
          $pull: { downvotes: userId },
        });
        await User.findByIdAndUpdate(userId, {
          $pull: { downvotedAnswers: answerId },
        });
        return; // Exit if already downvoted
      }

      // Update question votes
      await Answer.findByIdAndUpdate(answerId, {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      });

      // Update user votes
      await User.findByIdAndUpdate(userId, {
        $pull: { upvotedAnswers: answerId },
        $push: { downvotedAnswers: answerId },
      });
    } else {
      // Handle upvote
      if (alreadyUpvoted) {
        await Answer.findByIdAndUpdate(answerId, {
          $pull: { upvotes: userId },
        });
        await User.findByIdAndUpdate(userId, {
          $pull: { upvotedAnswers: answerId },
        });
        return; // Exit if already upvoted
      }

      // Update question votes
      await Answer.findByIdAndUpdate(answerId, {
        $push: { upvotes: userId },
        $pull: { downvotes: userId },
      });

      // Update user votes
      await User.findByIdAndUpdate(userId, {
        $push: { upvotedAnswers: answerId },
        $pull: { downvotedAnswers: answerId },
      });
    }
    // increment author's reputation by +10 for upvote and -5 for downvote
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
