import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <h1 className="text-dark300_light900 h1-bold self-start">All Users</h1>
      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>
      <div className="mt-11 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            key={item}
            className="h-60 w-full rounded-xl sm:max-w-[320px]"
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
