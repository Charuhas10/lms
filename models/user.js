import mongoose, { Schema, models } from "mongoose";
import isEmail from "validator/lib/isEmail";

const educationSchema = new Schema({
  level: { type: String, required: true },
  country: { type: String, required: true },
  school: { type: String, required: true },
  year: { type: String, required: true },
  aggregate: { type: String, required: true },
  aggregateType: { type: String, required: true },
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    name: { type: String, required: true },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be at least 8 characters long"],
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ],
    },
    trialUsed: { type: Boolean, default: false },
    credits: { type: Number, default: 0 },
    trialActivated: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    about: { type: String },
    dob: { type: Date },
    gender: { type: String },
    skillsName: { type: [String] },
    skillsRating: { type: [String] },
    educationLevel: { type: [String] },
    country: { type: [String] },
    institution: { type: [String] },
    year: { type: [String] },
    grade: { type: [String] },
    gradeType: { type: [String] },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
