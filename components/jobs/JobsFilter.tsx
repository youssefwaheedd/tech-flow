/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable no-unused-vars */
"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LocalSearchbar from "../shared/search/LocalSearch";

import { Country } from "@/types";
import { formUrlQuery } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

interface JobsFilterProps {
  countriesList: Country[];
}

const JobsFilter = ({ countriesList }: JobsFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState<string>(
    () => searchParams.get("location") || ""
  );
  const [currentLocation, setCurrentLocation] = React.useState<string>(
    "Select a location..."
  );

  const handleUpdateParams = (filter: string, name: string) => {
    setCurrentLocation(name);
    const isActive = active === filter; // Check if the filter is active
    const updatedFilter = isActive ? "" : filter;
    setActive(updatedFilter);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "location",
      value: updatedFilter || null,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <section className="relative mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center">
      <LocalSearchbar
        route={pathname}
        iconPosition="left"
        imgSrc="/assets/icons/job-search.svg"
        placeholder="Job Title, Company, or Keywords"
        otherClasses="flex-1 max-sm:w-full"
      />
      <div className="relative">
        <Select>
          <SelectTrigger
            className={`body-regular light-border background-light800_dark300 text-dark500_light700 border `}
          >
            <div className="line-clamp-1 flex-1 text-left">
              <SelectValue
                placeholder={`${active !== "" ? currentLocation : "Select a location..."}`}
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="flex flex-col">
              {countriesList.map((filter) => (
                <Button
                  key={filter.name.common}
                  onClick={() =>
                    handleUpdateParams(filter.name.common, filter.name.common)
                  }
                  className={`body-medium none rounded-lg px-6 py-3 capitalize shadow-none ${active === filter.name.common ? "bg-primary-500 text-white " : "bg-light-800 text-light-500 dark:bg-dark-300"}`}
                >
                  {filter.name.common}
                </Button>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default JobsFilter;
