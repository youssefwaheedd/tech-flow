import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const NoResult = ({
  title,
  description,
  buttonHref,
  buttonTitle,
}: {
  title: string;
  description: string;
  buttonHref: string;
  buttonTitle: string;
}) => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-2">
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result"
        width={269}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result"
        width={260}
        height={200}
        className="block object-contain dark:hidden"
      />
      <h2 className="h2-bold text-dark500_light700 mt-8 text-center">
        {title}
      </h2>
      <h3
        className="text-dark500_light700
      body-regular mt-2 max-w-md text-center"
      >
        {description}
      </h3>
      <Link href={buttonHref} className="mt-2 flex justify-start">
        <Button className="bg-primary-500 !text-light-900 min-h-[46px] rounded-md px-4 py-3 text-center">
          {buttonTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
