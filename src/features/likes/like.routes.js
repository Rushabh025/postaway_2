import express from "express";
import LikeController from "./like.controller.js";

const likeRoutes = express.Router();
const likeController = new LikeController();

likeRoutes.get('/:id', likeController.getLikes);
likeRoutes.post('/toggle/:id', likeController.toggleLikes);

export default likeRoutes;