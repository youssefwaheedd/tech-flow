"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Props {
  route: string;
  placeholder: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  placeholder,
  iconPosition,
  imgSrc,
  otherClasses,
}: Props) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] w-full grow items-center gap-2 rounded-xl px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        onChange={() => {}}
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
