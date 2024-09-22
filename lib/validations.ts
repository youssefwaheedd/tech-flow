import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(2).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(50),
});

export const EditQuestionSchema = z.object({
  title: z.string().min(5).max(130),
  content: z.string().min(20),
});

export const EditAnswerSchema = z.object({
  content: z.string().min(50),
});

export const ProfileSchema = z.object({
  bio: z.string().max(150).optional(),
  portfolioWebsite: z.string().url().or(z.literal("")).optional(), // Allows URL or empty string
  location: z.string().max(50).optional(),
});
