/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable no-unused-vars */

import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import { Filters } from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";

const Home = async ({ searchParams }: SearchParamsProps) => {
  const result: any = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: Number(searchParams.page),
  });

  const totalNumberOfQuestions = result.totalNumberOfQuestions;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center">
        <h1 className="text-dark300_light900 h1-bold self-start">
          All Questions
        </h1>
        <Link href="/ask-question" className="flex justify-start max-sm:w-full">
          <Button className="bg-primary-500 !text-light-900 min-h-[46px] rounded-md px-2 py-1 text-center">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="max-xs:flex-col mt-11 flex flex-col items-center justify-between gap-5 max-md:flex-row">
        <LocalSearch
          route="/"
          placeholder="Search questions..."
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex max-xs:w-full"
        />
        <HomeFilters />
      </div>
      <div className="mt-10 flex w-full  flex-col gap-[24px] ">
        {result?.questions?.length > 0 ? (
          result?.questions?.map((question: any) => (
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
      {result?.questions?.length > 0 && (
        <div className="mt-auto">
          <PaginationComponent
            noOfCards={totalNumberOfQuestions}
            pageSize={10}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
