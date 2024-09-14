import { getUserAnswers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import PaginationComponent from "../shared/PaginationComponent";

interface Props extends SearchParamsProps {
  userId: string;
  clerkID: string;
}

const AnswerTab = async ({ searchParams, userId, clerkID }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: Number(searchParams.page),
  });

  const totalNumberOfAnswers = result?.totalNumberOfAnswers || 0;

  return (
    <>
      {result?.answers.map((answer: any) => (
        <AnswerCard
          _id={answer._id}
          key={answer._id}
          clerkID={clerkID}
          author={answer.author}
          question={answer.question}
          createdAt={answer.createdAt}
          upvotes={answer.upvotes}
        />
      ))}

      <div className="mt-5 w-full">
        <PaginationComponent
          pageSize={3}
          noOfCards={Number(totalNumberOfAnswers)}
        />
      </div>
    </>
  );
};

export default AnswerTab;
