/* eslint-disable no-unused-vars */
import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import { Filters } from "@/components/shared/Filters";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { AnswerFilters } from "@/constants/filters";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.actions";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById({ questionId: params.id });
  const author = question.author;
  const { createdAtValue, dateFormat } = getTimeStamp(question.createdAt);
  const { userId: clerkID } = auth();
  let mongoUser;
  if (clerkID) {
    mongoUser = await getUserById({ userId: clerkID });
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-6">
        {/* Author information and option to upvote and downvote */}

        <Link
          href={`/profile/${author.clerkID}`}
          className="flex flex-1 items-center gap-2"
        >
          <Image
            src={author.avatar}
            alt="author"
            width={30}
            height={30}
            className="rounded-full object-contain"
          />
          <p className="text-dark300_light900 flex-1 text-xs font-bold">
            {author.name}
          </p>
        </Link>
        <Votes
          type="question"
          itemId={JSON.stringify(question._id)}
          userId={JSON.stringify(mongoUser?._id)}
          upvotes={question.upvotes.length}
          downvotes={question.downvotes.length}
          isUpvoted={question.upvotes.includes(mongoUser?._id)}
          isDownvoted={question.downvotes.includes(mongoUser?._id)}
          isSaved={mongoUser?.savedQuestions.includes(question._id)}
        />
      </div>

      {/* Question title   */}

      <p className="h2-bold text-dark300_light900 mt-4">{question.title}</p>

      {/* Question information ( Date, Answers, Views) */}

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

      {/* Question content */}

      <div className="mt-5 max-w-full">
        <ParseHTML data={question.content} />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            name={tag.name}
            _id={tag._id}
            showCount={false}
          />
        ))}
      </div>

      {/* Question Answers ( Date, Answers, Views) */}
      <div className="mt-12 flex justify-between gap-6">
        <p className="h2-bold primary-text-gradient mt-4 text-sm">
          {question.answers.length}{" "}
          {question.answers.length === 1 ? "Answer" : "Answers"}
        </p>
        <Filters filters={AnswerFilters} otherClasses=" sm:min-w-[170px]" />
      </div>

      {/* Answer's author content */}
      {/* Answer content */}

      <AllAnswers
        questionId={JSON.stringify(question._id)}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={question.answers.length}
      />

      <Answer
        questionContent={question.content}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </div>
  );
};

export default Page;
