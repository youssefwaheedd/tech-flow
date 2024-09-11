/* eslint-disable no-unused-vars */
"use serveer";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import User from "../models/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  GetUserStatsParams,
  UpdateUserParams,
} from "./shared.types";
import Question, { IQuestion } from "../models/question.model";
import Tag from "../models/tag.model";
import Answer from "../models/answer.model";
import Interaction from "../models/interaction.model";
import { FilterQuery } from "mongoose";

export const createUser = async (params: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(params);
    revalidatePath("/");
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

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

export const getUsers = async (params: GetAllUsersParams) => {
  const { page = 1, pageSize = 20, filter, searchQuery } = params;
  const query: FilterQuery<typeof User> = {};
  if (searchQuery) {
    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { username: { $regex: searchQuery, $options: "i" } },
    ];
  }

  let sortOptions = {};
  if (filter === "new_users") {
    sortOptions = { joinedAt: -1 };
  } else if (filter === "old_users") {
    sortOptions = { joinedAt: 1 };
  } else if (filter === "top_contributors") {
    sortOptions = { reputation: -1 };
  }

  try {
    await connectToDatabase();
    const users = await User.find(query).sort(sortOptions);
    return { users };
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (params: GetUserByIdParams) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkID: params.userId })
      .populate({
        path: "questions",
        model: "Question",
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: "author", model: "User" },
          {
            path: "tags",
            model: "Tag",
          },
        ],
      })
      .populate({
        path: "answers",
        model: "Answer",
        populate: [{ path: "author", model: "User" }],
      });
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkID: params.clerkID });
    if (!user) {
      throw new Error("User not found");
    }

    // Get all question IDs related to the user
    const userQuestionsIds = user.questions.map((q: IQuestion) => q._id);

    // Delete user questions
    await Question.deleteMany({ author: user._id });

    await Question.updateMany(
      { downvotes: user._id },
      { $pull: { downvotes: user._id } }
    );
    await Answer.deleteMany({ author: user._id });
    await Tag.updateMany(
      { questions: { $in: userQuestionsIds } },
      { $pull: { questions: { $in: userQuestionsIds } } }
    );
    await Interaction.deleteMany({ user: user._id });

    // Delete the user and other associated data
    const deletedUser = await User.findOneAndDelete({
      clerkID: params.clerkID,
    });
    revalidatePath("/");
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};

export const getUserQuestions = async (params: GetUserStatsParams) => {
  try {
    await connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const userQuestions = await Question.find({ author: params.userId })
      .sort({
        views: -1,
        upvotes: -1,
      })
      .populate("tags", "_id name")
      .populate("author", "_id name avatar clerkID");
    return { questions: userQuestions };
  } catch (error) {
    console.error(error);
  }
};

export const getUserAnswers = async (params: GetUserStatsParams) => {
  try {
    await connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const userAnswers = await Answer.find({ author: userId })
      .sort({
        upvotes: -1,
      })
      .populate("question", "_id title")
      .populate("author", "_id name avatar clerkID");
    return { answers: userAnswers };
  } catch (error) {
    console.error(error);
  }
};
