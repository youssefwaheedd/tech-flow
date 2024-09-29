/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { QuestionsSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { useTheme } from "@/context/ThemeProvider";
import { toast } from "@/hooks/use-toast";

interface Props {
  mongoUserId: string;
  formType: string;
  question?: string;
}

const Question = ({ mongoUserId, formType, question }: Props) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const type = formType;
  const editorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const parsedQuestion = question && JSON.parse(question || "");

  const groupedTags = parsedQuestion?.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: parsedQuestion?.title || "",
      explanation: parsedQuestion?.content || "",
      tags: groupedTags || [],
    },
  });

  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);
    try {
      if (type === "create") {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        router.push("/");
      } else {
        await editQuestion({
          questionId: parsedQuestion._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });
        router.push(`/question/${parsedQuestion._id}`);
      }
      return toast({
        title: `Question ${type === "create" ? "created" : "edited"} successfully`,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  const handleAddTag = (tagInputValue: string, field: any) => {
    const tagValue = tagInputValue.trim();

    if (tagValue !== "") {
      if (tagValue.length > 15) {
        return form.setError("tags", {
          type: "required",
          message: "Tag should not be more than 15 characters",
        });
      }

      if (!field.value.includes(tagValue as never)) {
        form.setValue("tags", [...field.value, tagValue]);
        form.clearErrors("tags");
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag should not be more than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormMessage className="text-red-500" />
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Be specific and imagine you&apos;re asking a question to another
                person
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
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
                  initialValue={parsedQuestion?.content || ""}
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
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: theme === "light" ? "oxide" : "oxide-dark",
                    content_css: theme === "light" ? "light" : "dark",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Introduce your problem in detail. Include all the information.
                Min 20 Characters
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormMessage className="text-red-500" />
              <FormControl className="mt-3.5">
                <div className="flex flex-col">
                  {type === "create" && (
                    <div className="flex gap-1">
                      <Input
                        ref={inputRef}
                        placeholder="Add tags..."
                        className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        onKeyDown={(e) => handleKeyDown(e, field)}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          if (inputRef.current) {
                            handleAddTag(inputRef.current.value, field);
                            inputRef.current.value = ""; // Clear the input after adding the tag
                          }
                        }}
                        className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      >
                        Add
                      </Button>
                    </div>
                  )}
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          onClick={() =>
                            type === "create"
                              ? handleTagRemove(tag, field)
                              : () => {}
                          }
                          className="background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 text-xs capitalize"
                        >
                          {tag}
                          {type === "create" && (
                            <Image
                              src="/assets/icons/close.svg"
                              alt="close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              {type === "create" && (
                <FormDescription className="body-regular text-light-500 mt-2.5">
                  Add up to 3 tags to describe what your question is about. You
                  can just press Enter to add a tag.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient !text-light-900 w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
