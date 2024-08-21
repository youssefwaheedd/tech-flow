"use serveer";
import { connectToDatabase } from "../database";
import User from "../models/user.model";
import { CreateUserParams } from "./shared.types";

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
    const user = await User.create(params);
    return user;
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
