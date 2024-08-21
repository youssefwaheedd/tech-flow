import mongoose, { models, Document } from "mongoose";

export interface IQuestion extends Document {
  title: String;
  content: String;
  author: { type: mongoose.Schema.Types.ObjectId; ref: "User" };
  createdAt: Date;
  answers: mongoose.Schema.Types.ObjectId[];
  tags: mongoose.Schema.Types.ObjectId[];
  upvotes: mongoose.Schema.Types.ObjectId[];
  downvotes: mongoose.Schema.Types.ObjectId[];
  views: Number;
}

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
});

const Question =
  models.Question || mongoose.model<IQuestion>("Question", QuestionSchema);

export default Question;
