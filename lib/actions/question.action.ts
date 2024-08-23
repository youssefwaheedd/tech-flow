/* eslint-disable no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Question from "../models/question.model";
import User from "../models/user.model";
import Tag from "../models/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    const { title, content, tags, author, path } = params;
    connectToDatabase();
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
    connectToDatabase();
    const questions: any = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionById(questionId: string) {
  try {
    connectToDatabase();
    const question = await Question.findById(questionId)
      .populate({
        path: "author",
        model: User,
      })
      .populate({ path: "tags", model: Tag });
    return question;
  } catch (error) {
    console.error(error);
  }
}
