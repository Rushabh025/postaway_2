import LikeModel from "./like.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js"

class LikeController{

    // Get all likes for a post
    getLikes(req, res, next){
        try {
            const postId = parseInt(req.params.postId, 10);

            if (!postId) {
                return res.status(400).json({ success: false, message: "Post ID is required" });
            }

            const totalLikes = LikeModel.getLikes(postId);
            res.status(200).json({ success: true, data: totalLikes });
        } catch (error) {
            next(new ApplicationError("Failed to get likes", 500));
        }
    }

    toggleLikes(req, res, next){
        try {
            const userId = parseInt(req.session.userId, 10);
            if (!userId) {
                return res.status(401).send({ message: "Unauthorized: Please log in." });
            }
            
            const postId = parseInt(req.params.postId, 10);
            if (!postId) {
                return res.status(400).json({ success: false, message: "Post ID required" });
            }
            const result = LikeModel.toggleLike(userId, postId);

            res.status(200).json({
                success: true,
                message: result.added ? "Like added" : "Like removed",
                data: result.like,
            });
        } catch (error) {
            next(new ApplicationError("Failed to toggle like", 500));
        }
    }
}

export default LikeController;