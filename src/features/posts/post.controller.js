import PostModel from "./post.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js"

class PostController{

    // Create a new post
    createPost(req, res, next){
        try {
            const postData = req.body;
            const uploadedFile = req.file; // The uploaded file will be available here

            if (uploadedFile) {
                postData.imageUrl = '/uploads/' + uploadedFile.filename; // Save the uploaded file URL
            }
            
            const newPost = PostModel.addPost(postData);

            if (!newPost) {
                return res.status(400).json({ success: false, message: "Post not created" });
            }
            
            res.status(201).json({ success: true, data: newPost });
            
        } catch (error) {
            next(new ApplicationError("Failed to create post", 500));
        }
    }

    // Get all posts
    getAllPosts(req, res, next){
        try {
            const allPosts = PostModel.getAllPosts();
            res.status(200).json({ success: true, data: allPosts });
        } catch (error) {
            next(new ApplicationError("Failed to fetch all posts", 500));;
        }
    }

    // Get posts for a specific user
    getUserPosts(req, res, next){
        try {
            const userId = parseInt(req.session.userId, 10);
            if (!userId) {
                return res.status(401).send({ message: "Unauthorized: Please log in." });
            }

            const userPosts = PostModel.getUserPosts(userId);
            res.status(200).json({ success: true, data: userPosts });
        } catch (error) {
            next(new ApplicationError("Failed to fetch user posts", 500));
        }
    }

    // Get post by ID
    getPostById(req, res, next){
        try {
            const id = parseInt(req.params.id, 10);
            const post = PostModel.getPostById(id);

            if (!post) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }

            res.status(200).json({ success: true, data: post });
        } catch (error) {
            next(new ApplicationError("Failed to fetch post by ID", 500));
        }
    }

    // Update a post
    updatePost(req, res, next){
        try {
            const data = req.body;
            const id = parseInt(req.params.id, 10);
            const updatedPost = PostModel.updatePost({id, data});

            if (!updatedPost) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }
    
            res.status(200).json({ success: true, data: updatedPost });
        } catch (error) {
            next(new ApplicationError("Failed to update post", 500));
        }
    }

    // Delete a post
    deletePost(req, res, next){
        try {
            const id = parseInt(req.params.id, 10);
            const isDeleted = PostModel.deletePost(id);

            if (!isDeleted) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }

            res.status(200).json({ success: true, message: "Post deleted successfully" });
        } catch (error) {
            next(new ApplicationError("Failed to delete post", 500));
        }
    }

    filterPostsByCaption(req, res, next) {
        try {
            const { caption } = req.query; // Get the caption filter from query parameters
            if (!caption) {
                return res.status(400).send("Caption query parameter is required");
            }

            const filteredPosts = PostModel.filterByCaption(caption);
            res.status(200).send(filteredPosts);
        } catch (error) {
            next(new ApplicationError("Failed to filter posts by caption", 500));
        }
    }
}

export default PostController;