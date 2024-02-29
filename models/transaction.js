import mongoose, { Schema, models } from "mongoose";

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: false }, // Optional, only for course-related transactions
  date: { type: Date, default: Date.now },
});

const Transaction =
  models.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;