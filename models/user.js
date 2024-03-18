import mongoose, { Schema, models } from "mongoose";

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
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
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
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
