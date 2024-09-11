/* eslint-disable no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import {
  toggleSaveQuestion,
  voteQuestion,
} from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { voteAnswer } from "@/lib/actions/answer.actions";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { auth } from "@clerk/nextjs/server";
import Swal from "sweetalert2";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  isUpvoted: boolean;
  isDownvoted: boolean;
  isSaved?: boolean;
  disabled: boolean;
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
  disabled,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  // Local state to manage UI updates
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes);
  const [localIsUpvoted, setLocalIsUpvoted] = useState(isUpvoted);
  const [localIsDownvoted, setLocalIsDownvoted] = useState(isDownvoted);

  const [localIsSaved, setLocalIsSaved] = useState(isSaved);

  const [loading, setLoading] = useState(false);

  const handleVote = async (voteType: string) => {
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
      }
    }
  };
  const handleSave = async () => {
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
    }
  };

  const handleUserNotLoggedIn = (action: string) => {
    Swal.fire({
      toast: true,
      title: "Login Required",
      text: `Please log in to ${action === "vote" ? "vote" : "save"} this ${type === "question" ? "question" : "answer"}!`,
      icon: "warning", // Icons: 'warning', 'error', 'success', 'info'
      showCancelButton: true, // Adds a cancel button
      confirmButtonText: "Login", // Custom text for the confirm button
      cancelButtonText: "Cancel", // Custom text for the cancel button

      customClass: {
        popup: "bg-blue-500 text-black p-4 rounded-lg shadow-lg", // Custom styling for the popup
        title: "font-bold text-lg", // Title styling
        confirmButton: "bg-primary-500 text-white px-4 py-2 rounded-lg", // Confirm button styling
        cancelButton: "bg-red-500 text-black px-4 py-2 rounded-lg", // Cancel button styling
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Action to perform when confirmed, like redirecting to login
        window.location.href = "/sign-in";
      }
    });
  };

  useEffect(() => {
    const ViewQuestion = async () => {
      await viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined,
      });
    };
    ViewQuestion();
  }, [itemId, userId, pathname, router]);

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
            onClick={() => {
              disabled ? handleUserNotLoggedIn("vote") : handleVote("upvote");
            }}
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
            onClick={() => {
              disabled ? handleUserNotLoggedIn("vote") : handleVote("downvote");
            }}
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
          onClick={() => {
            disabled ? handleUserNotLoggedIn("save") : handleSave();
          }}
        />
      )}
    </div>
  );
};

export default Votes;
