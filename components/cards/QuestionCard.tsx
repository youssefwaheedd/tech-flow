import React from "react";
// import Image from "next/image";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  _id: string;
  author: { _id: string; name: string; avatar: string; clerkID: string };
  title: string;
  clerkID?: string | null;
  createdAt: Date;
  upvotes: Array<object>;
  community?: string;
  answers: Array<object>;
  views: number;
  tags: {
    _id: number;
    name: string;
  }[];
}

const QuestionCard: React.FC<Props> = ({
  _id,
  author,
  title,
  clerkID,
  createdAt,
  upvotes,
  answers,
  views,
  tags,
}) => {
  const { createdAtValue, dateFormat } = getTimeStamp(createdAt);
  const showActionButtons = clerkID && clerkID === author.clerkID;
  return (
    <Link
      href={`/question/${_id}`}
      className="min-h-[209px] cursor-pointer rounded-[10px] px-4"
      passHref
      legacyBehavior
    >
      <div className="card-wrapper text-dark300_light900 xs:px-[35px] flex min-h-[209px] w-full cursor-pointer flex-col gap-3.5 rounded-[10px] px-4 py-[36px] sm:px-[45px]">
        <h3 className="base-semibold sm:h3-semibold text-dark300_light900 line-clamp-2 flex-1">
          {title}
        </h3>

        <div className="flex flex-wrap gap-4">
          {tags.map((tag, index) => (
            <RenderTag
              key={index}
              name={tag.name}
              _id={tag._id}
              showCount={false}
            />
          ))}
        </div>

        <div className="mt-8 flex w-full flex-wrap items-center justify-between gap-6">
          <Metric
            imgUrl={author.avatar}
            alt="user"
            value={author.name}
            title={` - asked ${createdAtValue} ${dateFormat}${createdAtValue > 1 ? "s" : ""} ago`}
            href={`/profile/${author.clerkID}`}
            isAuthor
            textStyles=" small-medium text-dark400_light700"
          />
          <div className="flex gap-2">
            <Metric
              imgUrl="/assets/icons/like.svg"
              alt="upvotes"
              value={formatNumber(upvotes.length)}
              title={` ${upvotes.length === 1 ? "Vote" : "Votes"} `}
              textStyles=" small-medium text-dark400_light800"
            />
            <Metric
              imgUrl="/assets/icons/message.svg"
              alt="answers"
              value={formatNumber(answers.length)}
              title={` ${answers.length === 1 ? "Answer" : "Answers"} `}
              textStyles=" small-medium text-dark400_light800"
            />
            <Metric
              imgUrl="/assets/icons/eye.svg"
              alt="eye"
              value={formatNumber(views)}
              title={` ${views === 1 ? "View" : "Views"} `}
              textStyles=" small-medium text-dark400_light800"
            />
          </div>
        </div>
        <div className="flex w-full justify-end p-0">
          <SignedIn>
            {showActionButtons && (
              <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
