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
  UpdateUserParams,
} from "./shared.types";
import Question, { IQuestion } from "../models/question.model";
import Tag from "../models/tag.model";

export const getUsers = async (params: GetAllUsersParams) => {
  // const { page = 1, pageSize = 20, filter, searchQuery } = params;
  try {
    connectToDatabase();
    const users = await User.find({}).sort({ joinedAt: -1 });
    return { users };
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (params: CreateUserParams) => {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectToDatabase();
    await User.findOneAndUpdate(
      {
        clerkID: params.clerkID,
      },
      params.updateData,
      { new: true }
    );
    revalidatePath(params.path);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (params: GetUserByIdParams) => {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkID: params.userId });
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
    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // Delete user questions
    await Question.deleteMany({ author: user._id });

    // Delete the user and other associated data
    const deletedUser = await User.findOneAndDelete({
      clerkID: params.clerkID,
    });

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};
