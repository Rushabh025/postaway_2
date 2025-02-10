import LikeRepository from "./like.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js";

class LikeController {
    async getLikes(req, res, next) {
        try {
            const postId = req.params.id;

            if (!postId) {
                return res.status(400).json({ success: false, message: "Post ID is required" });
            }

            const totalLikes = await LikeRepository.getLikes(postId);
            res.status(200).json({ success: true, data: totalLikes });
        } catch (error) {
            next(new ApplicationError("Failed to get likes", 500));
        }
    }

    async toggleLikes(req, res, next) {
        try {
            const userId = req.session.id;
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized: Please log in." });
            }

            const postId = req.params.postId;
            if (!postId) {
                return res.status(400).json({ success: false, message: "Post ID required" });
            }

            const result = await LikeRepository.toggleLike(userId, postId);

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