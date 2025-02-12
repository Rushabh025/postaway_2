import PostRepository from "./post.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js";

class PostController {
    // Create a new post
    async createPost(req, res, next) {
        try {
            // console.log("Received body:", req.body.caption);  // Debug request body
            // console.log("Received file:", req.file);  // Debug file upload

            const caption = req.body.caption;
            const userId = req.session.userId;

            const postData = { userId, caption };
            if (req.file) {
                postData.imageUrl = `/uploads/${req.file.filename}`;
            }

            const newPost = await PostRepository.addPost(postData);

            res.status(201).json({ success: true, data: newPost });
        } catch (error) {
            next(new ApplicationError("Failed to create post", 500));
        }
    }

    // Get all posts
    async getAllPosts(req, res, next) {
        try {
            const allPosts = await PostRepository.getAllPosts();
            res.status(200).json({ success: true, data: allPosts });
        } catch (error) {
            next(new ApplicationError("Failed to fetch all posts", 500));
        }
    }

    // Get posts for a specific user
    async getUserPosts(req, res, next) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized: Please log in." });
            }

            const userPosts = await PostRepository.getUserPosts(userId);
            res.status(200).json({ success: true, data: userPosts });
        } catch (error) {
            next(new ApplicationError("Failed to fetch user posts", 500));
        }
    }

    // Get post by ID
    async getPostById(req, res, next) {
        try {
            const postId = req.params.postId;
            const post = await PostRepository.getPostById(postId);

            if (!post) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }

            res.status(200).json({ success: true, data: post });
        } catch (error) {
            next(new ApplicationError("Failed to fetch post by ID", 500));
        }
    }

    // Update a post
    async updatePost(req, res, next) {
        try {
            const postId = req.params.postId;
            const updatedPost = await PostRepository.updatePost(postId, req.body);

            if (!updatedPost) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }

            res.status(200).json({ success: true, data: updatedPost });
        } catch (error) {
            next(new ApplicationError("Failed to update post", 500));
        }
    }

    // Delete a post
    async deletePost(req, res, next) {
        try {
            const postId = req.params.postId;
            const isDeleted = await PostRepository.deletePost(postId);

            if (!isDeleted) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }

            res.status(200).json({ success: true, message: "Post deleted successfully" });
        } catch (error) {
            next(new ApplicationError("Failed to delete post", 500));
        }
    }
}

export default PostController;