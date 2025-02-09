import express from "express";
import UserController from "./user.controller.js";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post('/signup', userController.signUp);
userRoutes.post('/signin', userController.signIn);

export default userRoutes;
