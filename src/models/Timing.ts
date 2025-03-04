import mongoose, { Schema, Document, models } from "mongoose";

// Define TypeScript interface
interface ITiming extends Document {
  title: string;
  description: string;
}

// Define the schema
const TimingSchema = new Schema<ITiming>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the model
const Timing = models.Timing || mongoose.model<ITiming>("Timing", TimingSchema);
export default Timing;