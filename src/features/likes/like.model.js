import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
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
}, { timestamps: true });

const LikeModel = mongoose.model("Like", likeSchema);

export default class LikeRepository {
    static async getLikes(postId) {
        try {
            return await LikeModel.find({ postId }).populate("userId", "name"); // Populate user details
        } catch (error) {
            throw new Error("Error fetching likes: " + error.message);
        }
    }

    static async toggleLike(userId, postId) {
        try {
            const existingLike = await LikeModel.findOne({ userId, postId });

            if (existingLike) {
                await LikeModel.deleteOne({ _id: existingLike._id });
                return { added: false, like: existingLike };
            } else {
                const newLike = new LikeModel({ userId, postId });
                await newLike.save();
                return { added: true, like: newLike };
            }
        } catch (error) {
            throw new Error("Error toggling like: " + error.message);
        }
    }
}
