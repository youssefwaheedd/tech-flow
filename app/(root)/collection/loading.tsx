/* eslint-disable tailwindcss/no-custom-classname */

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="text-dark300_light900 h1-bold self-start">
        Saved Questions
      </h1>

      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />

        <Skeleton className="h-14 w-28" />
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
