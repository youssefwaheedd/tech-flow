/* eslint-disable no-unused-vars */
"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../database";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
  UpdateUserParams,
} from "./shared.types";
import path from "path";
import { revalidatePath } from "next/cache";
import { FilterQuery, model } from "mongoose";
import Question from "../models/question.model";

const tempTags = [
  { _id: 1, name: "react" },
  { _id: 2, name: "nextjs" },
  { _id: 3, name: "javascript" },
];

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();
    const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: searchQuery, $options: "i" } }];
    }

    let sortOptions = {};
    if (filter === "popular") {
      sortOptions = { questionsCount: -1 };
    } else if (filter === "recent") {
      sortOptions = { createdAt: -1 };
    } else if (filter === "old") {
      sortOptions = { createdAt: 1 };
    } else if (filter === "name") {
      sortOptions = { name: 1 };
    } else {
      sortOptions = { createdAt: 1 };
    }

    // Use aggregation to sort by the length of the questions array
    const tags = await Tag.aggregate([
      { $match: query },
      {
        $addFields: {
          questionsCount: { $size: "$questions" },
        },
      },
      {
        $sort: sortOptions,
      },
    ]);

    return { tags };
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
    }
    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: "Question",
      options: { sort: { createdAt: -1 } },
      match: query,
      populate: [
        { path: "author", model: "User" },
        {
          path: "tags",
          model: "Tag",
        },
      ],
    });

    return tag;
  } catch (error) {
    console.error(error);
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    // await connectToDatabase();
    // const { limit = 3, userId } = params;
    // const user = await User.findById(userId);
    // if (!user) {
    //   throw new Error("User not found");
    // Find interactions of the user with the tags
    // Create a new model for interactions
    // const tags = await Tag.find({}).sort({ count: -1 }).limit(limit);
    return tempTags;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();
    const { clerkID, updateData, path } = params;
    await User.findOneAndUpdate({ clerkID }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    await connectToDatabase();
    const tags = await Tag.find({}).sort({ questions: -1 }).limit(5);

    return { tags };
  } catch (error) {
    console.error(error);
  }
}
