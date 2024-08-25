"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Answer from "../models/answer.model";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "../models/question.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
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
