/* eslint-disable no-unused-vars */
import React from "react";
// import Image from "next/image";
import Link from "next/link";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkID?: string | null;
  _id: string;
  author: { _id: string; name: string; avatar: string; clerkID: string };
  question: { _id: string; title: string };

  createdAt: Date;
  upvotes: Array<object>;
}

const AnswerCard: React.FC<Props> = ({
  clerkID,
  _id,
  author,
  question,
  createdAt,
  upvotes,
}) => {
  const { createdAtValue, dateFormat } = getTimeStamp(createdAt);
  const showActionButtons = clerkID && JSON.parse(clerkID) === author.clerkID;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="min-h-[150px] w-full rounded-[10px] px-4"
      passHref
      legacyBehavior
    >
      <div className="card-wrapper text-dark300_light900 xs:px-[35px] flex min-h-[209px]  w-full flex-col gap-3.5 rounded-[10px] px-4 py-[36px] sm:px-[45px]">
        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
          <h3 className="base-semibold sm:h3-semibold line-clamp-2 flex-1">
            {question.title}
          </h3>
        </div>

        <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-6">
          <Metric
            imgUrl={author.avatar}
            alt="user"
            value={author.name}
            title={` - asked ${createdAtValue} ${dateFormat}${createdAtValue > 1 ? "s" : ""} ago`}
            href={`/profile/${author.clerkID}`}
            isAuthor
            textStyles=" small-medium text-dark400_light700"
          />

          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            value={formatNumber(upvotes.length)}
            title={` ${upvotes.length === 1 ? "Vote" : "Votes"} `}
            textStyles=" small-medium text-dark400_light800"
          />
        </div>
        <div className="mt-4 flex w-full justify-end">
          <SignedIn>
            {showActionButtons && (
              <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
