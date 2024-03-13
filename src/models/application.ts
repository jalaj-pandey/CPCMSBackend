import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    jobInfo: [{
      name: String,
      title: String,
      salary: Number,
      location: String,
      jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
      }
    }],
    userInfo: [
      {
        name: String,
        email: String,
        photo: String,
        gender: String,
        dob: Date,
        userId: {
          type: String,
          ref: "User",
        },
      }
    ]
  },
  {
    timestamps: true,
  }
);

// instead of Product I used Jobs
export const Apply = mongoose.model("Apply", schema);
