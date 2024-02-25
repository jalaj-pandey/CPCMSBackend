import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    age: number;
}

const schema = new mongoose.Schema(
  {
    _id: {
        type: String,
        required: [true, "Please enter ID"],
    },
    fname: {
        type: String,
        required: [true, "Please enter first name"],
    },
    lname: {
        type: String,
        required: [true, "Please enter last name"],
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter email"],
        validate: validator.default.isEmail,
    },
    photo: {
        type: String,
        required: [true, "Please upload a photo"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter gender"],
    },
    dob: {
        type: Date,
        required: [true, "Please enter your date of birth"],
    }
    
  },
  {
    timestamps: true,
  }
);

schema.virtual("age").get(function (){
    const today = new Date();
    const dob = this.dob;
    let age =   today.getFullYear()-dob.getFullYear();

    if(today.getMonth()<dob.getMonth() || today.getMonth() === dob.getMonth() && today.getDate()< dob.getDate()){
        age--;  
    }
    return age;
})
export const User = mongoose.model<IUser>("User", schema);