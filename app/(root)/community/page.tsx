/* eslint-disable no-unused-vars */
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUsers } from "@/lib/actions/user.actions";
import NoResult from "@/components/shared/NoResult";
import UserCard from "@/components/cards/UserCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Filters } from "@/components/shared/Filters";
import { UserFilters } from "@/constants/filters";

const Page = async () => {
  const result = await getUsers({});
  const plainUsers = result?.users.map((user) => ({
    _id: user._id.toString(), // Convert _id if needed
    clerkID: user.clerkID,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    joinedAt: user.joinedAt,
    // Add other necessary fields
  }));

  return (
    <>
      <h1 className="text-dark300_light900 h1-bold self-start">All Users</h1>
      <div className="max-xs:flex-col mt-11 flex items-center justify-between gap-5 max-md:flex-row">
        <LocalSearch
          route="/community"
          placeholder="Search for amazing minds here..."
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="flex max-xs:w-full"
        />
      </div>

      {plainUsers?.length ? (
        <section className="mt-11 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          {plainUsers.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </section>
      ) : (
        <div className="mt-11 w-full items-center justify-center">
          <NoResult
            title="No users found"
            description="No users found, be the first to join our community!"
            buttonHref="/sign-up"
            buttonTitle="Join now!"
          />
        </div>
      )}
    </>
  );
};

export default Page;
