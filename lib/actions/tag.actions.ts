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
import mongoose, { FilterQuery, model } from "mongoose";
import Question from "../models/question.model";
import Interaction from "../models/interaction.model";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();
    const { page = 1, pageSize = 20, filter, searchQuery } = params;
    // Ensure page and pageSize are valid integers, defaulting to 1 and 30 respectively

    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: searchQuery, $options: "i" } }];
    }

    let sortOptions = {};
    if (filter === "popular") {
      sortOptions = { questions: -1 };
    } else if (filter === "recent") {
      sortOptions = { createdOn: -1 };
    } else if (filter === "old") {
      sortOptions = { createdOn: 1 };
    } else if (filter === "name") {
      sortOptions = { name: 1 };
    } else {
      sortOptions = { createdAt: 1 };
    }

    // Use aggregation to sort by the length of the questions array
    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Optionally count total tags for pagination purposes
    const totalTags = await Tag.countDocuments(query);

    return { tags, totalTags };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching tags");
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
      options: {
        sort: { createdAt: -1 },
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
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
    await connectToDatabase();
    const { userId, limit = 3 } = params;

    // Check if the user exists
    const user = await mongoose.models.User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Aggregation to get the top interacted tags
    const topTags = await Interaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$tags", // Unwind the array of tags
      },
      {
        $group: {
          _id: "$tags", // Group by the tag
          count: { $sum: 1 }, // Count the occurrences of each tag
        },
      },
      {
        $sort: { count: -1 }, // Sort by count in descending order
      },
      {
        $limit: limit, // Limit to the top 'n' tags
      },
      {
        $lookup: {
          from: "tags", // Assuming 'Tag' is the name of the tag collection
          localField: "_id",
          foreignField: "_id",
          as: "tagDetails",
        },
      },
      {
        $unwind: "$tagDetails", // Unwind the tag details to get full information about the tag
      },
      {
        $project: {
          _id: 0, // Exclude the internal _id from the result
          tag: "$tagDetails",
          count: 1, // Include the count of interactions
        },
      },
    ]);

    return topTags;
  } catch (error) {
    console.error("Error getting top interacted tags:", error);
    throw error;
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
