/* eslint-disable no-unused-vars */
"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswerSchema } from "@/lib/validations";
import { useTheme } from "../../context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.actions";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";

interface Props {
  authorId: string;
  questionId: string;
  questionContent: string;
  disabled: boolean;
}

const Answer = ({ authorId, questionContent, questionId, disabled }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme } = useTheme();

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        authorId: JSON.parse(authorId),
        questionId: JSON.parse(questionId),
        path: pathname,
      });

      form.reset({ answer: "" });

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (err: any) {
      throw new Error("Error creating answer", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateAIAnswer = async () => {
    setIsGenerating(true);
    try {
      // handle generate answer
    } catch (error: any) {
      throw new Error("Error generating AI answer", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleUserNotLoggedIn = () => {
    Swal.fire({
      toast: true,
      title: "Login Required",
      text: `Please log in to submit an answer!`,
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

  const editorRef = useRef(null);
  return (
    <div className="mt-10 w-full">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write you answer here
        </h4>
        <Button
          className="btn light-border-2 text-primary-500 dark:text-primary-500  w-fit gap-1.5 px-4 py-2.5  shadow-none"
          disabled={isGenerating}
          onClick={() => {
            disabled ? handleUserNotLoggedIn() : handleGenerateAIAnswer();
          }}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="AI answer button"
            width={20}
            height={20}
            className="object-contain"
          />
          {isGenerating ? "Generating..." : "Generate AI Answer"}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Prevents the form from reloading the page
            if (disabled) {
              handleUserNotLoggedIn(); // Shows the SweetAlert when the user is not logged in
            } else {
              form.handleSubmit(handleCreateAnswer)(event); // Handles form submission when not disabled
            }
          }}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormMessage className="text-red-500" />
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue=""
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "codesample",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist ",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: theme === "light" ? "oxide" : "oxide-dark",
                      content_css: theme === "light" ? "light" : "dark",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular text-light-500 mt-2.5">
                  Min 50 Characters
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
