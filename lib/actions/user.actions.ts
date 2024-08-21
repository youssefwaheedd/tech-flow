"use serveer";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import User from "../models/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import Question from "../models/question.model";

export const getUsers = async () => {
  try {
    connectToDatabase();
    const users = await User.find({});
    return users;
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

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkID: params.clerkID });
    if (!user) {
      throw new Error("User not found");
    }

    // delete all user related data
    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );
    await Question.deleteMany({ author: user._id });

    // delete user answers comments and more
    const deletedUser = await User.findOneAndDelete({
      clerkID: params.clerkID,
    });
    return deletedUser;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkID: userId });
    return user;
  } catch (error) {
    console.error(error);
  }
};
