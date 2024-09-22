import { getUserQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import PaginationComponent from "../shared/PaginationComponent";

interface Props extends SearchParamsProps {
  userId: string;
  clerkID: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkID }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: Number(searchParams.page),
  });

  const totalNumberOfUserQuestions = result?.totalNumberOfQuestions;

  return (
    <>
      {result?.questions.map((question: any) => (
        <QuestionCard
          _id={question._id}
          key={question._id}
          clerkID={clerkID}
          author={question.author}
          title={question.title}
          createdAt={question.createdAt}
          upvotes={question.upvotes}
          answers={question.answers}
          views={question.views}
          tags={question.tags.map((tag: []) => tag)}
        />
      ))}
      <div className="mt-10">
        <PaginationComponent
          setInitialPage={true}
          pageSize={3}
          noOfCards={Number(totalNumberOfUserQuestions)}
        />
      </div>
    </>
  );
};

export default QuestionTab;
