/* eslint-disable no-unused-vars */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";

interface Props {
  user: {
    _id: string;
    clerkID: string;
    joinedAt: string;
    name: string;
    username: string;
    avatar: string;
  };
}
interface Tag {
  _id: number;
  name: string;
}

const UserCard = ({ user }: Props) => {
  // const [userTopInteractedTags, setUserTopInteractedTags] = useState<Tag[]>([]);

  // useEffect(() => {
  //   // Simulate fetching data
  //   const fetchTags = async () => {
  //     // Replace this with actual data fetching logic
  //     const result: Tag[] | undefined = await getTopInteractedTags({
  //       userId: user._id,
  //     });

  //     // Safely set the state, falling back to an empty array if undefined
  //     // setUserTopInteractedTags(result || []);
  //   };

  //   fetchTags();
  // }, []);

  return (
    <Link
      href={`/profile/${user.clerkID}`}
      className="background-light900_dark200 light-border-2 shadow-light100_dark100 text-dark300_light900 flex w-full flex-col items-center gap-3 rounded-lg p-5  sm:max-w-[320px]"
    >
      <Image
        src={user.avatar}
        alt={user.username}
        width={100}
        height={100}
        className="size-[100px] rounded-full object-cover"
      />
      <p className="h3-bold line-clamp-1">{user.name}</p>
      <p>@{user.username}</p>
      {/* <div className="flex w-full items-center justify-center gap-3">
        {userTopInteractedTags.length ? (
          userTopInteractedTags.map((tag: any) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              showCount={false}
            />
          ))
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div> */}
    </Link>
  );
};

export default UserCard;
