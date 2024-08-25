import mongoose, { models, Document } from "mongoose";

export interface IAnswer extends Document {
  content: String;
  upvotes: mongoose.Schema.Types.ObjectId[];
  downvotes: mongoose.Schema.Types.ObjectId[];
  author: mongoose.Schema.Types.ObjectId;
  question: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const AnswerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
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
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Answer = models.Answer || mongoose.model<IAnswer>("Answer", AnswerSchema);

export default Answer;
