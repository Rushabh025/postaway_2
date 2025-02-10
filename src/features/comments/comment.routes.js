import express from "express";
import CommentController from "./comment.controller.js";

const commentRoutes = express.Router();
const commentController = new CommentController();

commentRoutes.get('/:postId', commentController.getCommentsByPost);
commentRoutes.post('/:postId', commentController.newComment);
commentRoutes.delete('/:commentId', commentController.deleteComment);
commentRoutes.put('/:commentId', commentController.updateComment);

export default commentRoutes;