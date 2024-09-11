/* eslint-disable no-unused-vars */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState<string>(
    searchParams.get("filter") || ""
  );

  const handleActiveFilter = (filter: string) => {
    const isActive = active === filter; // Check if the filter is active
    const updatedFilter = isActive ? "" : filter; // Toggle the filter: if active, remove it, otherwise set it

    // Update the active state
    setActive(updatedFilter);

    // Update the URL with the new filter value
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: updatedFilter || null, // If empty, remove the filter from the URL
    });

    // Navigate to the new URL
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden w-full flex-wrap justify-start gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleActiveFilter(filter.value)}
          className={`body-medium none rounded-lg px-6 py-3 capitalize shadow-none ${active === filter.value ? "bg-primary-500 text-white " : "bg-light-800 text-light-500 dark:bg-dark-300"}`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
