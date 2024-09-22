/* eslint-disable no-unused-vars */
"use server";

import { Item } from "@radix-ui/react-menubar";
import { connectToDatabase } from "../database";
import Answer from "../models/answer.model";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import { SearchParams } from "./shared.types";

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };
    const SearchableTypes = ["question", "answer", "user", "tag"];

    let results: any = [];

    const modelsAndTypes = [
      {
        model: Question,
        searchField: "title",
        type: "question",
      },
      {
        model: Answer,
        searchField: "content",
        type: "answer",
      },
      {
        model: User,
        searchField: "name",
        type: "user",
      },
      {
        model: Tag,
        searchField: "name",
        type: "tag",
      },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // search across all searchable types
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((result) => ({
            title:
              type === "answer"
                ? `Answers containing "${query}"`
                : result[searchField],
            type,
            id:
              type === "user"
                ? result.clerkID
                : type === "answer"
                  ? result.question
                  : result._id,
          }))
        );
      }
    } else {
      // search only one type
      const modelInfo = modelsAndTypes.find((model) => model.type === type);

      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((result) => ({
        title:
          type === "answer"
            ? `Answers containing "${query}"`
            : result[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? result.clerkID
            : type === "answer"
              ? result.question
              : result._id,
      }));
    }

    return JSON.stringify(results);
  } catch (err: any) {
    throw new Error(err);
  }
}
