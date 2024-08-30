import mongoose, { models, Document } from "mongoose";

export interface IInteraction extends Document {
  user: mongoose.Schema.Types.ObjectId;
  action: string;
  question: mongoose.Schema.Types.ObjectId;
  answer: mongoose.Schema.Types.ObjectId;
  tags: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const InteractionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },

  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },

  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interaction =
  models.Interaction ||
  mongoose.model<IInteraction>("Interaction", InteractionSchema);
export default Interaction;
