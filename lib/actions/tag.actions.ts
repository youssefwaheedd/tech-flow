/* eslint-disable no-unused-vars */
"use server";

import { connectToDatabase } from "../database";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import { GetTopInteractedTagsParams } from "./shared.types";

const tempTags = [
  { _id: 1, name: "react" },
  { _id: 2, name: "nextjs" },
  { _id: 3, name: "javascript" },
];
export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    // connectToDatabase();
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
