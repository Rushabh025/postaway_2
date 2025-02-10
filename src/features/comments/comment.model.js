import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User" 
    },
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "Post" 
    },
    content: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

const CommentModel = mongoose.model("Comment", commentSchema);

export default class CommentRepository {
    static async createComment(commentData) {
        try {
            const newComment = new CommentModel(commentData);
            return await newComment.save();
        } catch (error) {
            throw new Error("Error creating comment: " + error.message);
        }
    }

    static async getPostComments(postId) {
        try {
            return await CommentModel.find({ postId }).populate("userId", "name"); // Populate user details
        } catch (error) {
            throw new Error("Error fetching comments: " + error.message);
        }
    }

    static async updateComment(commentId, content) {
        try {
            return await CommentModel.findByIdAndUpdate(commentId, { content }, { new: true });
        } catch (error) {
            throw new Error("Error updating comment: " + error.message);
        }
    }

    static async deleteComment(commentId) {
        try {
            return await CommentModel.findByIdAndDelete(commentId);
        } catch (error) {
            throw new Error("Error deleting comment: " + error.message);
        }
    }
}
