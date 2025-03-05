import mongoose, { Schema } from "mongoose";

const MarqueeSchema = new Schema({
  message: { type: String, required: true },
});

export const Marquee = mongoose.models.Marquee || mongoose.model("Marquee", MarqueeSchema);
