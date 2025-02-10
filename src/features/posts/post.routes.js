import express from "express";
import PostController from "./post.controller.js";

const postRoutes = express.Router();
const postController = new PostController();

postRoutes.get('/all', postController.getAllPosts);
postRoutes.get('/:postId', postController.getPostById);
postRoutes.get('/', postController.getUserPosts);
postRoutes.post('/', postController.createPost);
postRoutes.delete('/:postId', postController.deletePost);
postRoutes.put('/:postId', postController.updatePost);

export default postRoutes;
