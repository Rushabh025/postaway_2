import express from "express";
import OTPController from "./otp.controller.js";

const otpRoutes = express.Router();
const otpController = new OTPController();

otpRoutes.post('/send', otpController.sendOTP);
otpRoutes.post('/verify', otpController.verifyOTP);
otpRoutes.post('/reset-password', otpController.resetPassword);

export default otpRoutes;