import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    otp: { 
        type: String, 
        required: true 
    },
    expiresAt: { 
        type: Date, 
        required: true 
    }
});

// Correct ES module export
const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
