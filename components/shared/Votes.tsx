/* eslint-disable no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import {
  toggleSaveQuestion,
  voteQuestion,
} from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";
import { voteAnswer } from "@/lib/actions/answer.actions";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  isUpvoted: boolean;
  isDownvoted: boolean;
  isSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  isUpvoted,
  isDownvoted,
  isSaved,
}: Props) => {
  const pathname = usePathname();

  // Local state to manage UI updates
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes);
  const [localIsUpvoted, setLocalIsUpvoted] = useState(isUpvoted);
  const [localIsDownvoted, setLocalIsDownvoted] = useState(isDownvoted);

  const [localIsSaved, setLocalIsSaved] = useState(isSaved);

  const [loading, setLoading] = useState(false);

  const handleVote = async (voteType: string) => {
    if (loading) return; // Prevent multiple requests while one is in progress
    setLoading(true);

    // Optimistic UI update
    if (voteType === "upvote" && !localIsUpvoted) {
      setLocalUpvotes(localUpvotes + 1);
      if (localIsDownvoted) setLocalDownvotes(localDownvotes - 1);
      setLocalIsUpvoted(true);
      setLocalIsDownvoted(false);
    } else if (voteType === "upvote" && localIsUpvoted) {
      setLocalUpvotes(localUpvotes - 1);
      setLocalIsUpvoted(false);
    } else if (voteType === "downvote" && localIsDownvoted) {
      setLocalDownvotes(localDownvotes - 1);
      setLocalIsDownvoted(false);
    } else if (voteType === "downvote" && !localIsDownvoted) {
      setLocalDownvotes(localDownvotes + 1);
      if (localIsUpvoted) setLocalUpvotes(localUpvotes - 1);
      setLocalIsUpvoted(false);
      setLocalIsDownvoted(true);
    }

    if (type === "question") {
      try {
        await voteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: voteType === "upvote",
          hasdownVoted: voteType === "downvote",
          path: pathname,
        });
      } catch (error) {
        console.error(error);
        // Rollback on error
        setLocalUpvotes(upvotes);
        setLocalDownvotes(downvotes);
        setLocalIsUpvoted(isUpvoted);
        setLocalIsDownvoted(isDownvoted);
      } finally {
        setLoading(false);
      }
    }
    if (type === "answer") {
      try {
        await voteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: voteType === "upvote",
          hasdownVoted: voteType === "downvote",
          path: pathname,
        });
      } catch (error) {
        console.error(error);
        // Rollback on error
        setLocalUpvotes(upvotes);
        setLocalDownvotes(downvotes);
        setLocalIsUpvoted(isUpvoted);
        setLocalIsDownvoted(isDownvoted);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSave = async () => {
    if (loading) return; // Prevent multiple requests while one is in progress
    setLoading(true);

    // Optimistic UI update
    if (localIsSaved) {
      setLocalIsSaved(false);
    } else {
      setLocalIsSaved(true);
    }

    try {
      await toggleSaveQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        path: pathname,
      });
    } catch (error) {
      console.error(error);
      // Rollback on error
      setLocalIsSaved(isSaved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={`${localIsUpvoted ? "/assets/icons/upvoted.svg" : "/assets/icons/upvote.svg"}`}
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(localUpvotes)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={`${localIsDownvoted ? "/assets/icons/downvoted.svg" : "/assets/icons/downvote.svg"}`}
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(localDownvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "question" && (
        <Image
          src={`${localIsSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}`}
          alt="star"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
