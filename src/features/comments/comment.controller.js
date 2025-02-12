import CommentRepository from "./comment.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js";

class CommentController {
    async newComment(req, res, next) {
        try {
            const userId = req.session.userId;
            const postId = req.params.postId; // MongoDB ObjectId
            const content = req.body.content;

            if (!userId || !postId || !content) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const commentData = {userId, postId, content};
            const newComment = await CommentRepository.createComment(commentData);

            res.status(201).json({ success: true, data: newComment });
        } catch (error) {
            next(new ApplicationError("Failed to add a new comment", 500));
        }
    }

    async getCommentsByPost(req, res, next) {
        try {
            const postId = req.params.postId;

            if (!postId) {
                return res.status(400).json({ success: false, message: "Post ID is required" });
            }

            const postComments = await CommentRepository.getPostComments(postId);

            res.status(200).json({ success: true, data: postComments });
        } catch (error) {
            next(new ApplicationError("Failed to fetch comments for the post", 500));
        }
    }

    async updateComment(req, res, next) {
        try {
            const commentId = req.params.commentId;
            const { content } = req.body;

            if (!commentId || !content) {
                return res.status(400).json({ success: false, message: "Comment ID and Content are required" });
            }

            const updatedComment = await CommentRepository.updateComment(commentId, content);

            if (!updatedComment) {
                return res.status(404).json({ success: false, message: "Comment not found" });
            }

            res.status(200).json({ success: true, data: updatedComment });
        } catch (error) {
            next(new ApplicationError("Failed to update the comment", 500));
        }
    }

    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId;

            if (!commentId) {
                return res.status(400).json({ success: false, message: "Comment ID is required" });
            }

            const isDeleted = await CommentRepository.deleteComment(commentId);

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