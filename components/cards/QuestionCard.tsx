import React from "react";
// import Image from "next/image";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";

interface Props {
  _id: string;
  author: { _id: string; name: string; avatar: string; clerkID: string };
  title: string;
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
  createdAt,
  upvotes,
  answers,
  views,
  tags,
}) => {
  const { createdAtValue, dateFormat } = getTimeStamp(createdAt);

  return (
    <section className="card-wrapper text-dark300_light900 min-h-[209px] rounded-[10px] px-4">
      <div className="xs:px-[35px] flex w-full flex-col gap-3.5 py-[36px] sm:px-[45px]">
        <Link href={`/question/${_id}`}>
          <h3 className="base-semibold sm:h3-semibold line-clamp-2 flex-1">
            {title}
          </h3>
        </Link>

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
      </div>
    </section>
  );
};

export default QuestionCard;
