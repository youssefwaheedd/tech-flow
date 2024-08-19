import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import { Filters } from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to use React Query in Next.js?",
    tags: [
      {
        _id: 1,
        name: "reat-query",
      },
      {
        _id: 2,
        name: "next.js",
      },
    ],
    upvotes: 5,
    answers: [{}], // Assuming each answer is an object, you can define the actual structure
    views: 1100,
    author: {
      _id: "1",
      name: "Ahmedwahidd",
      avatar: "/assets/icons/avatar.svg",
    },
    createdAt: new Date("2024-08-19T18:22:05.935Z"),
    community: "Next.js Community",
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      {
        _id: 1,
        name: "css",
      },
      {
        _id: 2,
        name: "next.js",
      },
    ],
    upvotes: 3,
    answers: [{}], // Assuming each answer is an object, you can define the actual structure
    views: 20,
    author: {
      _id: "2",
      name: "Youssefwahidd",
      avatar: "/assets/icons/avatar.svg",
    },
    createdAt: new Date("2021-09-10T10:00:00.000Z"),
    community: "CSS Community",
  },
];

export default function Home() {
  return (
    <>
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
      <div className="mt-10 flex w-full flex-col gap-[24px]">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              _id={question._id}
              key={question._id}
              author={question.author}
              title={question.title}
              createdAt={question.createdAt}
              upvotes={question.upvotes}
              answers={question.answers}
              views={question.views}
              tags={question.tags.map((tag) => tag)}
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
    </>
  );
}
