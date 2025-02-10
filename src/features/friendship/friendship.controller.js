import friendshipRepository from "./friendship.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js";

class FriendshipController{
    async getFriends(req, res, next){
        try {
            const userId = req.params;
            const userFriends = await friendshipRepository.getUserFriends(userId);

            res.status(200).json({ success: true, data: userFriends });

        } catch (error) {
            next(new ApplicationError("Failed to get friends", 500));
        }
    }

    async getPendingRequests(req, res, next){
        try {
            
        } catch (error) {
            next(new ApplicationError("Failed to get pending requests", 500));
        }
    }

    async toggleFriendship(req, res, next){
        try {
            
        } catch (error) {
            next(new ApplicationError("Failed to get toggle friendship", 500));
        }
    }

    async responseToRequest(req, res, next){
        try {
            
        } catch (error) {
            next(new ApplicationError("Failed to get resposne to request", 500));
        }
    }
}

export default FriendshipController;