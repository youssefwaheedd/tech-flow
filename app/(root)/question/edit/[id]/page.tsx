import Question from "../../../../../components/forms/Question";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import { getUserById } from "../../../../../lib/actions/user.actions";
import { getQuestionById } from "../../../../../lib/actions/question.action";

const Page = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById({ questionId: params.id });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          formType="edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          question={JSON.stringify(question)}
        />
      </div>
    </div>
  );
};

export default Page;
