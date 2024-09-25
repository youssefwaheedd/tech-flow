/* eslint-disable no-unused-vars */
import QuestionCard from "@/components/cards/QuestionCard";
import { Filters } from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import PaginationComponent from "@/components/shared/PaginationComponent";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters, TagFilters } from "@/constants/filters";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { getTimeStamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const tag = await getQuestionsByTagId({
    tagId: params.id,
    page: Number(searchParams.page),
    searchQuery: searchParams.q,
  });
  const { createdAtValue, dateFormat } = getTimeStamp(tag.createdOn);
  const { userId: clerkID } = auth();
  let mongoUser;
  if (clerkID) {
    const { user }: any = await getUserById({ userId: clerkID });
    mongoUser = user;
  }
  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="text-dark300_light900 h1-bold self-start capitalize">
        {tag.name} Questions
      </h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder={`Search for questions related to ${tag.name}...`}
          otherClasses="flex-1"
        />

        <Filters
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-[24px]">
        {tag?.questions?.length > 0 ? (
          tag?.questions?.map((question: any) => (
            <QuestionCard
              _id={question._id}
              key={question._id}
              author={question.author}
              title={question.title}
              createdAt={question.createdAt}
              upvotes={question.upvotes}
              answers={question.answers}
              views={question.views}
              tags={question.tags.map((tag: []) => tag)}
            />
          ))
        ) : (
          <NoResult
            title="There are no questions to show"
            description="✨ Be the first to break the silence! ❓ Ask a question and kickstart
          the discussion. 💡 Your query could be the next big thing others learn
          from. 🙌 Get involved and make a difference! 🌟"
            buttonHref="/ask-question"
            buttonTitle="Ask a Question"
          />
        )}
      </div>
      {tag?.questions?.length > 10 && (
        <div className="mt-auto">
          <PaginationComponent
            noOfCards={tag?.questions?.length}
            pageSize={10}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
