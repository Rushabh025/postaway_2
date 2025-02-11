import express from "express";
import { sendOTP, verifyOTP, resetPassword } from "./otp.controller.js";

const otpRoutes = express.Router();

otpRoutes.post('/send', sendOTP);
otpRoutes.post('/verify', verifyOTP);
otpRoutes.post('/reset-password', resetPassword);

export default otpRoutes;