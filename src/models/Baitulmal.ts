import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Invalid mobile number format"],
    trim: true },
  amount: { type: Number, required: true, min: 1 },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

DonationSchema.index({ mobile: 1 });
DonationSchema.index({ date: -1 });

export default mongoose.models.Baitulmal || mongoose.model("Baitulmal", DonationSchema);
