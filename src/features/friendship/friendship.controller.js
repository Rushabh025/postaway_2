import friendshipRepository from "./friendship.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js";

class FriendshipController {
    
    async getFriends(req, res, next) {
        try {
            const { userId } = req.params;
            const userFriends = await friendshipRepository.getUserFriends(userId);
            res.status(200).json({ success: true, data: userFriends });
        } catch (error) {
            next(new ApplicationError(error.message || "Failed to get friends", 500));
        }
    }

    async getPendingRequests(req, res, next) {
        try {
            const userId = req.session.userId;
            const pendingRequests = await friendshipRepository.getPendingFriendRequests(userId);
            res.status(200).json({ success: true, data: pendingRequests });
        } catch (error) {
            next(new ApplicationError(error.message || "Failed to get pending requests", 500));
        }
    }

    async toggleFriendship(req, res, next) {
        try {
            const requesterId = req.params.friendId;
            const recipientId = req.session.userId;
            console.log(requesterId);
            console.log(recipientId);
            if (!requesterId || !recipientId) {
                return next(new ApplicationError("Requester ID and Recipient ID are required", 400));
            }

            const result = await friendshipRepository.toggleFriendship(requesterId, recipientId);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(new ApplicationError(error.message || "Failed to toggle friendship", 500));
        }
    }

    async responseToRequest(req, res, next) {
        try {
            const { friendId } = req.params; // Extract friendId from URL
            const { status } = req.body; // Extract status from request body
    
            // Validate inputs
            if (!friendId || !["Accepted", "Rejected"].includes(status)) {
                return next(new ApplicationError("Invalid request parameters", 400));
            }
    
            // Call the repository method to update the friendship status
            const updatedFriendship = await friendshipRepository.responseToFriendRequest(friendId, status);
    
            if (!updatedFriendship) {
                return next(new ApplicationError("Friendship request not found", 404));
            }
    
            res.status(200).json({ success: true, data: updatedFriendship });
        } catch (error) {
            next(new ApplicationError(error.message || "Failed to respond to request", 500));
        }
    }
    
}

export default FriendshipController;