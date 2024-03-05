import mongoose, { Schema, models } from "mongoose";

const skillSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
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
    skills: [skillSchema],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
