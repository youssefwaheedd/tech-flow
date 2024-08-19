"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

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
  return (
    <>
      <div className={`relative ${containerClasses}`}>
        <Select>
          <SelectTrigger
            className={`body-regular light-border background-light800_dark300 text-dark500_light700 border   ${otherClasses}`}
          >
            <div className="line-clamp-1 flex-1 text-left">
              <SelectValue placeholder="Select a filter..." />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filters.map((filter) => (
                <SelectItem
                  key={filter.value}
                  value={filter.value}
                  className="bg-light-800 text-light-500 dark:bg-dark-300 body-medium   py-3 capitalize shadow-none"
                >
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
