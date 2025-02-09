import CommentModel from "./comment.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js";

class CommentController{

    // Create a new comment
    newComment(req, res, next){
        try {
            const { userId, content } = req.body;
            const postId = parseInt(req.params.id, 10);

            if (!userId || !postId || !content) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const newComment = CommentModel.createComment({ userId, postId, content });

            res.status(201).json({ success: true, data: newComment });
        } catch (error) {
            next(new ApplicationError("Failed to add a new comment", 500));
        }  
    }

    // Get all comments for a post
    getCommentsByPost(req, res, next){
        try {
            const postId = parseInt(req.params.id, 10);

            if (!postId) {
                return res.status(400).json({ success: false, message: "Post ID is required" });
            }

            const postComments = CommentModel.getPostComments(postId);

            res.status(200).json({ success: true, data: postComments });
        } catch (error) {
            next(new ApplicationError("Failed to fetch comments for the post", 500));
        }
    }

    // Update a comment
    updateComment(req, res, next){
        try {
            const { id, content } = req.body;

            if (!id || !content) {
                return res.status(400).json({ success: false, message: "Comment ID and Content are required" });
            }

            const updatedComment = CommentModel.updateComment({ id, content });

            if (!updatedComment) {
                return res.status(404).json({ success: false, message: "Comment not found" });
            }

            res.status(200).json({ success: true, data: updatedComment });
        } catch (error) {
            next(new ApplicationError("Failed to update the comment", 500));
        }
    }

    // Delete a comment
    deleteComment(req, res, next){
        try {
            const id = parseInt(req.params.id, 10);

            if (!id) {
                return res.status(400).json({ success: false, message: "Comment ID is required" });
            }

            const isDeleted = CommentModel.deleteComment(id);

            if (!isDeleted) {
                return res.status(404).json({ success: false, message: "Comment not found" });
            }

            res.status(200).json({ success: true, message: "Comment deleted successfully" });
        } catch (error) {
            next(new ApplicationError("Failed to delete the comment", 500));
        }
    }
}

export default CommentController;