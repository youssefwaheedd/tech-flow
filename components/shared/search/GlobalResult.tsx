/* eslint-disable no-unused-vars */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import React, { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { title } from "process";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = React.useState(false);

  const [result, setResult] = React.useState([
    {
      type: "question",
      id: 1,
      title: "What is the best way to learn programming?",
    },
    {
      type: "user",
      id: 1,
      title: "Youssef Waheed",
    },
    {
      type: "tag",
      id: 1,
      title: "Next.Js",
    },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        // TODO: get result
      } catch (err: any) {
        throw new Error(err);
      } finally {
        setIsLoading(false);
      }
    };
  }, [global, type]);

  const renderLink = (type: string, item: any) => {
    return "/";
  };

  return (
    <div className="bg-light-800 dark:bg-dark-400 absolute top-full z-10 mt-3 w-full rounded-xl py-5 shadow-sm ">
      <p className="text-dark400_light900 paragraph-semibold px-5">
        <GlobalFilters />
      </p>
      <div className="bg-light-700/50 dark:bg-dark-500/50 my-5 h-px" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center flex-col px-5 ">
            <ReloadIcon className="text-primary-500 my-2 size-10 animate-spin" />
            <p className="text-dark200_light800 body-regular">Searching ...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result?.map((item: any, index: number) => (
                <Link
                  key={item.type + item.id + index}
                  href={renderLink("type", "id")}
                  className="hover:bg-light-700/50 dark:hover:bg-dark-500/50 flex w-full cursor-pointer items-start gap-3 px-5 py-2.5"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tag"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5 ">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops! No results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
