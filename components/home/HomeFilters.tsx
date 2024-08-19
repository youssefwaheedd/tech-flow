"use client";

import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const [active, setActive] = React.useState("");

  return (
    <div className="mt-10 hidden w-full flex-wrap justify-start gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => setActive(filter.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none none ${active === filter.value ? "bg-primary-500 text-white " : "bg-light-800 text-light-500  dark:bg-dark-300 "}`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
