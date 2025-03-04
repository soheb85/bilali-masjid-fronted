import mongoose, { Schema} from "mongoose";

const SubscriberSchema = new Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  }
});

const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);
export default Subscriber;
