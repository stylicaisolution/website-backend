import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 180 }, // Auto-delete after 3 min
});

export default mongoose.model('otp',otpSchema)
