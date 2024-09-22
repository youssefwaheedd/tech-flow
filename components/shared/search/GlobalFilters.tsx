/* eslint-disable no-unused-vars */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Button } from "@/components/ui/button";
import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = React.useState(typeParams || "");

  const handleActiveFilter = (filter: string) => {
    const isActive = active === filter; // Check if the filter is active
    const updatedFilter = isActive ? "" : filter; // Toggle the filter: if active, remove it, otherwise set it

    // Update the active state
    setActive(updatedFilter);

    // Update the URL with the new filter value
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "type",
      value: updatedFilter || null, // If empty, remove the filter from the URL
    });

    // Navigate to the new URL
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-5 px-5 sm:flex-row sm:items-center">
      <p className="text-dark400_light900 sm:body-medium text-xs">Type: </p>
      <div className=" flex flex-wrap gap-2 sm:flex sm:gap-3">
        {GlobalSearchFilters.map((filter) => (
          <Button
            type="button"
            key={filter.value}
            className={`light-border-2 sm:small-medium dark:text-light-800 rounded-2xl px-2 py-1 text-xs capitalize sm:px-5 sm:py-2 ${active === filter.value ? "bg-primary-500 text-light-900 hover:text-light-900" : "bg-light-700 text-dark-400 hover:text-primary-500 dark:hover:text-primary-500 dark:bg-dark-500"}`}
            onClick={() => handleActiveFilter(filter.value)}
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
