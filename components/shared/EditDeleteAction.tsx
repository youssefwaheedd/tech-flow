/* eslint-disable no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { deleteAnswer } from "@/lib/actions/answer.actions";
import { usePathname } from "next/navigation";
import { deleteQuestion } from "@/lib/actions/question.action";
import { toast } from "@/hooks/use-toast";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const [isDeleting, setDeleting] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (type === "Question") {
        await deleteQuestion({
          questionId: JSON.parse(itemId),
          path: pathname,
        });
      } else {
        await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
      }
      setDialogOpen(false); // Close the dialog after successful deletion
      return toast({
        title: `${type === "Question" ? "Question" : "Answer"} deleted successfully`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {type === "Question" && (
        <Link href={`/question/edit/${JSON.parse(itemId)}`}>
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      )}

      <div
        onClick={(event) => {
          event.stopPropagation(); // Prevent the link's default click behavior
        }}
      >
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Image
              src="/assets/icons/trash.svg"
              alt="delete"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setDialogOpen(true)} // Open the dialog when delete icon is clicked
            />
          </DialogTrigger>
          <DialogContent className="rounded-xl bg-white px-8">
            <DialogHeader>
              <DialogTitle className="h2-bold mb-2">
                Are you sure you want to delete this {type}?
              </DialogTitle>
              <DialogDescription className="text-start">
                This action cannot be undone. This will permanently delete the{" "}
                {type} and remove data from our servers.
              </DialogDescription>
            </DialogHeader>

            <Button
              type="button"
              onClick={(event) => {
                event.stopPropagation(); // Prevent any bubbling effect
                handleDelete(); // Call the delete function
              }}
              disabled={isDeleting}
              className="w-fit bg-red-600 px-4 py-2"
            >
              {isDeleting ? "Deleting..." : `Delete ${type}`}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EditDeleteAction;
