import mongoose, { Schema, models } from "mongoose";

const skillSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
});

const Skill = models.Skill || mongoose.model("Skill", skillSchema);
export default Skill;