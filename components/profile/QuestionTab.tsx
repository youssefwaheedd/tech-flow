import { getUserQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkID: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkID }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });

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
    </>
  );
};

export default QuestionTab;
