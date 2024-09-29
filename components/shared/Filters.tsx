/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";

// import { Button } from "./Button";
interface Props {
  filters: { name: string; value: string }[];
  otherClasses?: string;
  containerClasses?: string;
}

export const Filters: React.FC<Props> = ({
  filters,
  otherClasses,
  containerClasses,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState<string>(
    () => searchParams.get("filter") || ""
  );
  const [currentFilter, setCurrentFilter] =
    React.useState<string>("Select a filter...");

  const handleActiveFilter = (filter: string, name: string) => {
    setCurrentFilter(name);
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
    <>
      <div className={`relative ${containerClasses}`}>
        <Select>
          <SelectTrigger
            className={`body-regular light-border background-light800_dark300 text-dark500_light700 border ${otherClasses}`}
          >
            <div className="line-clamp-1 flex-1 text-left">
              <SelectValue
                placeholder={`${active !== "" ? currentFilter : "Select a filter..."}`}
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="flex flex-col">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  onClick={() => handleActiveFilter(filter.value, filter.name)}
                  className={`body-medium none rounded-lg px-6 py-3 capitalize shadow-none ${active === filter.value ? "bg-primary-500 text-white " : "bg-light-800 text-light-500 dark:bg-dark-300"}`}
                >
                  {filter.name}
                </Button>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
