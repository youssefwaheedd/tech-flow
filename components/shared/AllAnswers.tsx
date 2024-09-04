import { getAnswers } from "@/lib/actions/answer.actions";
import { getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
}

const AllAnswers = async ({ questionId, userId, totalAnswers }: Props) => {
  const result = await getAnswers({ questionId: JSON.parse(questionId) });
  const answers = result?.answers;
  return (
    <div className="mt-10 w-full">
      <div>
        {answers?.map((answer) => (
          <article className="light-border border-b py-10" key={answer._id}>
            <div className="flex items-center justify-between">
              {/* Span ID */}
              <div className="mb-8 flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkID}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.avatar}
                    alt="author profile"
                    width={18}
                    height={18}
                    className="rounded-full object-contain max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}{" "}
                    </p>
                    <p className="small-regular text-light400_light500 ml-2 mt-0.5 line-clamp-1">
                      answered {getTimeStamp(answer.createdAt).createdAtValue}{" "}
                      {getTimeStamp(answer.createdAt).dateFormat}
                      {getTimeStamp(answer.createdAt).createdAtValue > 1
                        ? "s"
                        : ""}{" "}
                      ago
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={userId}
                    upvotes={answer.upvotes.length}
                    downvotes={answer.downvotes.length}
                    isUpvoted={answer.upvotes.includes(JSON.parse(userId))}
                    isDownvoted={answer.downvotes.includes(JSON.parse(userId))}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
