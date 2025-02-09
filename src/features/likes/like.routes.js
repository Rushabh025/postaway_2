import express from "express";
import LikeController from "./like.controller.js";

const likeRoutes = express.Router();
const likeController = new LikeController();

likeRoutes.get('/:postId', likeController.getLikes);
likeRoutes.get('/toggle/:postId', likeController.toggleLikes);

export default likeRoutes;