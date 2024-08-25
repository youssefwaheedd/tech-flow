import mongoose, { models, Document } from "mongoose";

export interface IUser extends Document {
  clerkID: String;
  name: String;
  username: String;
  email: String;
  avatar: String;
  bio?: String;
  location?: String;
  portfolioWebsite?: String;
  reputation?: Number;
  savedQuestions?: mongoose.Schema.Types.ObjectId[];
  joinedAt: Date;
  questions: mongoose.Schema.Types.ObjectId[];
  answers: mongoose.Schema.Types.ObjectId[];
  upvotes: mongoose.Schema.Types.ObjectId[];
  downvotes: mongoose.Schema.Types.ObjectId[];
  upvotedAnswers: mongoose.Schema.Types.ObjectId[];
  downvotedAnswers: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema({
  clerkID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  portfolioWebsite: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  savedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  downvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  upvotedAnswers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  downvotedAnswers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

const User = models.User || mongoose.model("User", UserSchema);

export default User;
