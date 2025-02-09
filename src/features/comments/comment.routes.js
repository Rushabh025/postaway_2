import express from "express";
import CommentController from "./comment.controller.js";

const commentRoutes = express.Router();
const commentController = new CommentController();

commentRoutes.get('/:id', commentController.getCommentsByPost);
commentRoutes.post('/:id', commentController.newComment);
commentRoutes.delete('/:id', commentController.deleteComment);
commentRoutes.put('/:id', commentController.updateComment);

export default commentRoutes;