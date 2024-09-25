import React from "react";
import QuestionCard from "../../../components/cards/QuestionCard";
import { Filters } from "../../../components/shared/Filters";
import NoResult from "../../../components/shared/NoResult";
import LocalSearch from "../../../components/shared/search/LocalSearch";
import { QuestionFilters } from "../../../constants/filters";
import { auth } from "@clerk/nextjs/server";
import { getUserSavedQuestions } from "../../../lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";

const page = async ({ searchParams }: SearchParamsProps) => {
  const { userId: clerkID } = auth();
  let result;
  if (clerkID) {
    result = await getUserSavedQuestions({
      clerkID,
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: Number(searchParams.page),
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="text-dark300_light900 h1-bold self-start">
        Saved Questions
      </h1>

      <div className="max-xs:flex-col mt-11 flex  items-center justify-between gap-5 max-md:flex-row">
        <LocalSearch
          route="/collection"
          placeholder="Search your saved questions..."
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filters
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="max-md:flex max-xs:w-full"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-[24px]">
        {result?.length > 0 ? (
          result?.map((question: any) => (
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
            title="No Saved Questions Yet!"
            description="Oops! It seems like there are no saved questions yet. Don't worry, you can be the first one to ask a question and start the conversation! 😊🚀"
            buttonHref="/"
            buttonTitle="Explore Questions"
          />
        )}
      </div>
      {result?.length > 10 && (
        <div className="mt-auto">
          <PaginationComponent noOfCards={result?.length} pageSize={10} />
        </div>
      )}
    </div>
  );
};

export default page;
