import { getAnswers } from "@/lib/actions/answer.actions";
import { getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import PaginationComponent from "./PaginationComponent";
// import { useSearchParams } from "next/navigation";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  filter?: string;
  page?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  filter,
  page,
}: Props) => {
  // const searchParams = useSearchParams();

  const result = await getAnswers({
    questionId: JSON.parse(questionId),
    page: page ? +page : 1,
    sortBy: filter,
  });
  const answers = result?.answers;
  return (
    <div className="mt-10 w-full">
      <div>
        {answers?.map((answer) => (
          <article
            id={`${answer._id}`}
            className="light-border border-b py-10"
            key={answer._id}
          >
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
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1 sm:ml-2">
                      answered {getTimeStamp(answer.createdAt).createdAtValue}{" "}
                      {getTimeStamp(answer.createdAt).dateFormat}
                      {getTimeStamp(answer.createdAt).createdAtValue > 1 ||
                      getTimeStamp(answer.createdAt).createdAtValue === 0
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
                    isUpvoted={
                      userId
                        ? answer.upvotes.includes(JSON.parse(userId))
                        : false
                    }
                    isDownvoted={
                      userId
                        ? answer.downvotes.includes(JSON.parse(userId))
                        : false
                    }
                    disabled={!userId}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10">
        <PaginationComponent noOfCards={totalAnswers} pageSize={3} />
      </div>
    </div>
  );
};

export default AllAnswers;
