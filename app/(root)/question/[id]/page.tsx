/* eslint-disable no-unused-vars */
import Metric from "@/components/shared/Metric";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById(params.id);
  const author = question.author;
  const { createdAtValue, dateFormat } = getTimeStamp(question.createdAt);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-6">
        <div className="flex flex-1 items-center gap-2">
          <Image
            src={author.avatar}
            alt="author"
            width={35}
            height={35}
            className="rounded-full object-contain"
          />
          <p className="text-dark300_light900 font-bold">{author.name}</p>
        </div>
        <div className="flex gap-4">
          <Metric
            imgUrl="/assets/icons/upvote.svg"
            alt="upvote"
            value={question.upvotes.length}
            title=""
            textStyles="background-light800_dark300 text-dark300_light900 px-3 py-2 rounded-md text-sm"
          />
          <Metric
            imgUrl="/assets/icons/downvote.svg"
            alt="upvote"
            value={question.downvotes.length}
            title=""
            textStyles="background-light800_dark300 text-dark300_light900 px-3 py-2  rounded-md text-sm"
          />
          <Metric imgUrl="/assets/icons/star.svg" alt="saved" />
        </div>
      </div>

      <p className="h2-bold text-dark300_light900 mt-4">{question.title}</p>
      <div className="mt-4 flex gap-3">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="created at"
          title={`asked ${createdAtValue} ${dateFormat}${createdAtValue > 1 ? "s" : ""} ago`}
          textStyles=" small-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatNumber(question.answers.length)}
          title={` ${question.answers.length === 1 ? "Answer" : "Answers"} `}
          textStyles=" small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(question.views)}
          title={` ${question.views === 1 ? "View" : "Views"} `}
          textStyles=" small-medium text-dark400_light800"
        />
      </div>
      <div className="text-dark400_light700 mt-12 flex flex-col gap-6">
        <p className="base-medium">{question.content}</p>
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            name={tag.name}
            _id={tag._id}
            showCount={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
