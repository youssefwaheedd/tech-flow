import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: 1,
      title: "How to create a custom hook in React?",
      tags: ["Hooks", "Custom Hooks"],
      votes: 10,
      answers: 5,
      views: 100,
    },
    {
      _id: 2,
      title: "How to use Redux in React?",
      tags: ["React", "Redux"],
      votes: 10,
      answers: 5,
      views: 100,
    },
    {
      _id: 3,
      title: "How to use Context API in React?",
      tags: ["Context API"],
      votes: 10,
      answers: 5,
      views: 100,
    },
    {
      _id: 4,
      title: "How to create a custom hook in React?",
      tags: ["Custom Hooks"],
      votes: 10,
      answers: 5,
      views: 100,
    },
    {
      _id: 5,
      title: "How to use Redux in React?",
      tags: ["Redux"],
      votes: 10,
      answers: 5,
      views: 100,
    },
    {
      _id: 6,
      title: "How to use Context API in React?",
      tags: ["React", "Context API"],
      votes: 10,
      answers: 5,
      views: 100,
    },
  ];

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

  return (
    <section className="background-light900_dark200 light-border-2 text-dark300_light900 shadow-light-300 custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] min-w-32 flex-col overflow-y-auto border-l px-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold">Popular Tags</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
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
    </section>
  );
};

export default RightSidebar;
