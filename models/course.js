// models/Course.js
import mongoose, { Schema, models } from "mongoose";

const courseSchema = new Schema({
  cover: { type: String, required: true },
  courseName: { type: String, required: true },
  totalTime: { type: String, required: true },
  isFree: { type: Boolean, required: true, default: true },
  credits: { type: Number, required: true, default: 0 },
  skills: [{ type: String, required: true }],
});

const Course = models.Course || mongoose.model("Course", courseSchema);
export default Course;
