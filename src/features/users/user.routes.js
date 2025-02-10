import express from "express";
import UserController from "./user.controller.js";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post('/signup', userController.signUp);
userRoutes.post('/signin', userController.signIn);
userRoutes.post('/logout', userController.logout);
userRoutes.post('/logout-all-devices', userController.logoutAllDevices);

userRoutes.get('/get-details/:userId', userController.getUserDetails);
userRoutes.get('/get-all-details', userController.getAllUserDetails);
userRoutes.put('/update-details/:userId', userController.updateUserDetails);

export default userRoutes;
