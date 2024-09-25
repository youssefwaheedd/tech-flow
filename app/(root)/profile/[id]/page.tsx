/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable no-unused-vars */
import Metric from "@/components/shared/Metric";
import { getUserById } from "@/lib/actions/user.actions";
import { getTimeStamp } from "@/lib/utils";
import { URLProps } from "@/types";
import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { auth } from "@clerk/nextjs/server";
import RenderTag from "@/components/shared/RenderTag";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnswerTab from "@/components/profile/AnswerTab";
import QuestionTab from "@/components/profile/QuestionTab";

const popularTags = [
  {
    _id: 1,
    name: "React",
    totalQuestions: 10,
  },
  {
    _id: 2,
    name: "Redux",
    totalQuestions: 10,
  },
  {
    _id: 3,
    name: "Context API",
    totalQuestions: 10,
  },
  {
    _id: 4,
    name: "Custom Hooks",
    totalQuestions: 10,
  },
];

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId } = auth();
  const { user, badgeCounts: badges }: any = await getUserById({
    userId: params.id,
  });
  const userQuestions = user.questions;
  const { createdAtValue, dateFormat } = getTimeStamp(user.joinedAt);
  return (
    <>
      <div className="flex w-full flex-col items-start justify-start gap-3 sm:flex-row sm:flex-wrap">
        <Image
          src={user?.avatar}
          alt="user"
          width={140}
          height={140}
          className="size-[140px] rounded-full object-cover"
        />
        <div className="flex w-full flex-col-reverse justify-between sm:flex-row">
          <div className="text-dark500_light700 flex flex-col items-start justify-start">
            <h2 className="h2-bold">{user?.name}</h2>
            <p className="text-dark-200_light800 text-sm">@{user?.username}</p>
            {user.bio && (
              <p className="text-dark300_light900 mt-3">{user?.bio}</p>
            )}
            <div className="mt-5 flex flex-wrap gap-6">
              {user.portfolioWebsite && (
                <Metric
                  imgUrl="/assets/icons/link.svg"
                  alt="portfolio"
                  value="Portfolio"
                  href={user?.portfolioWebsite}
                  textStyles="text-blue-600"
                />
              )}

              {user.location && (
                <Metric
                  imgUrl="/assets/icons/location.svg"
                  alt="location"
                  value={user?.location}
                />
              )}

              <Metric
                imgUrl="/assets/icons/calendar.svg"
                alt="joined at date"
                value={`joined ${createdAtValue} ${dateFormat}${createdAtValue > 1 ? "s" : ""} ago`}
                textStyles="ml-1"
              />
            </div>
          </div>
          <div className="mt-1 flex self-end justify-self-end max-sm:mb-5 max-sm:w-full sm:mt-3 sm:justify-end">
            <SignedIn>
              {userId === user?.clerkID && (
                <Link href="/profile/edit" passHref>
                  <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4">
                    Edit Profile
                  </Button>
                </Link>
              )}
            </SignedIn>
          </div>
        </div>
      </div>
      <h2 className="text-dark300_light900 h2-bold mb-3 mt-7">
        Stats - {user?.reputation}
      </h2>
      <div className="mt-5 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
        <section className="background-light900_dark200  flex flex-col items-center justify-center gap-4 rounded-lg px-8 py-5 sm:flex-row sm:flex-wrap">
          <p className="text-dark300_light900 text-xs sm:text-sm">
            {user?.questions?.length}{" "}
            {user?.questions?.length > 1 || user?.questions?.length === 0
              ? "Questions"
              : "Question"}
          </p>
          <p className="text-dark300_light900 text-xs sm:text-sm">
            {user?.answers?.length}{" "}
            {user?.answers?.length > 1 || user?.answers?.length === 0
              ? "Answers"
              : "Answer"}
          </p>
        </section>
        <section className="background-light900_dark200  flex flex-col items-center justify-center gap-4 rounded-lg px-8 py-5 sm:flex-row">
          <Image
            src="/assets/icons/gold-medal.svg"
            alt="gold badge"
            width={37}
            height={50}
          />
          <div className="text-dark300_light900 flex gap-3 text-xs sm:flex-col sm:gap-0 sm:text-sm">
            <p>{badges.GOLD}</p> <p>Gold Badges</p>
          </div>
        </section>
        <section className="background-light900_dark200  flex flex-col items-center justify-center gap-4 rounded-lg px-8 py-5 sm:flex-row">
          <Image
            src="/assets/icons/silver-medal.svg"
            alt="silver badge"
            width={37}
            height={50}
          />
          <div className="text-dark300_light900 flex gap-3 text-xs sm:flex-col sm:gap-0 sm:text-sm">
            <p>{badges.SILVER}</p> <p>Silver Badges</p>
          </div>
        </section>
        <section className="background-light900_dark200  flex flex-col items-center justify-center gap-4 rounded-lg px-8 py-5 sm:flex-row">
          <Image
            src="/assets/icons/bronze-medal.svg"
            alt="bronze badge"
            width={37}
            height={50}
          />
          <div className="text-dark300_light900 flex gap-3 text-xs sm:flex-col sm:gap-0 sm:text-sm">
            <p>{badges.BRONZE}</p>
            <p>Bronze Badges</p>
          </div>
        </section>
      </div>

      <div className="flex justify-between gap-6">
        <Tabs
          defaultValue="Posts"
          className="mt-5 min-w-full lg:min-w-[600px] "
        >
          <TabsList className="background-light800_dark400 text-light400_light500 mb-4 min-h-[42px] gap-4 rounded-lg p-6">
            <TabsTrigger value="Posts" className="tab">
              Posts
            </TabsTrigger>
            <TabsTrigger value="Answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="Posts"
            className="flex w-full flex-col justify-center gap-6"
          >
            {userQuestions.length > 0 ? (
              <QuestionTab
                searchParams={searchParams}
                userId={user._id}
                clerkID={userId}
              />
            ) : (
              {
                ...(userId === user.clerkID ? (
                  <NoResult
                    description="You haven't posted any questions yet."
                    title="No posts yet"
                    buttonHref="/ask-question"
                    buttonTitle="Ask a question"
                  />
                ) : (
                  <NoResult
                    description="This user hasn't posted any questions yet."
                    title="No posts yet"
                  />
                )),
              }
            )}
          </TabsContent>
          <TabsContent
            value="Answers"
            className="flex w-full flex-col items-center justify-center gap-6"
          >
            {user.answers.length > 0 ? (
              <AnswerTab
                searchParams={searchParams}
                userId={user._id}
                clerkID={JSON.stringify(user.clerkID)}
              />
            ) : (
              {
                ...(userId === user.clerkID ? (
                  <NoResult
                    description="You haven't answered any questions yet."
                    title="No answers yet"
                    buttonHref="/"
                    buttonTitle="Explore questions"
                  />
                ) : (
                  <NoResult
                    description="This user hasn't answered any questions yet."
                    title="No answers yet"
                  />
                )),
              }
            )}
          </TabsContent>
        </Tabs>

        <div className=" hidden w-full max-w-[300px] lg:flex lg:flex-col">
          <h2 className="text-dark300_light900 h2-bold mb-3 mt-7">Top Tags</h2>
          <div className="mt-5 flex flex-col gap-[15px]">
            {popularTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
