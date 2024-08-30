/* eslint-disable no-unused-vars */
import Metric from "@/components/shared/Metric";
import { getUserById } from "@/lib/actions/user.actions";
import { getTimeStamp } from "@/lib/utils";
import { URLProps } from "@/types";
import Image from "next/image";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const mongoUser = await getUserById({ userId: params.id });
  const { createdAtValue, dateFormat } = getTimeStamp(mongoUser.joinedAt);
  return (
    <>
      <div className="flex flex-col justify-start gap-3 sm:flex-row">
        <Image
          src={mongoUser.avatar}
          alt="user"
          width={140}
          height={140}
          className="size-[140px] rounded-full object-cover"
        />
        <div className="text-dark500_light700 flex flex-col items-start justify-start">
          <h2 className="h2-bold">{mongoUser.name}</h2>
          <p className="text-sm">@{mongoUser.username}</p>
          <div className="mt-5 flex gap-6 ">
            {mongoUser.personalWebsite && (
              <Metric
                imgUrl="/assets/icons/link.svg"
                alt="portfolio"
                value="Portfolio"
                href={mongoUser.portfolioWebsite}
                textStyles="text-blue-600"
              />
            )}

            {mongoUser.location && (
              <Metric
                imgUrl="/assets/icons/location.svg"
                alt="location"
                value={mongoUser.location}
              />
            )}

            <Metric
              imgUrl="/assets/icons/calendar.svg"
              alt="joined at date"
              value={`joined ${createdAtValue} ${dateFormat}${createdAtValue > 1 ? "s" : ""} ago`}
              textStyles="ml-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
