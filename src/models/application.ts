import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    jobs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// instead of Product I used Jobs
export const Apply = mongoose.model("Apply", schema);
