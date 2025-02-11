import bcrypt from "bcrypt";
import UserModel from "../users/user.model.js";
import OTP from "./otp.model.js";
import { sendEmail } from '../../utils/emailServices.utils.js';

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
export const sendOTP = async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    await OTP.create({ email, otp: hashedOTP, expiresAt: Date.now() + 5 * 60 * 1000 });

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent successfully" });
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
        return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

    await OTP.deleteOne({ email });

    res.json({ message: "OTP verified successfully" });
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully" });
};
