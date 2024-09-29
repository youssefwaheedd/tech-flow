/* eslint-disable tailwindcss/no-custom-classname */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
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

      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      <div className="my-10 hidden flex-wrap gap-6 md:flex">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
