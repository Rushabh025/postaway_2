import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    // User who sent the request
    requester: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, 
    // User who received the request
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, 
    // Status of the friendship request
    status: { 
        type: String, 
        enum: ["Pending", "Accepted", "Rejected"], 
        default: "Pending" 
    }, 
}, { timestamps: true });

const friendshipModel = mongoose.model('Friendship', friendshipSchema);

export default class friendshipRepository{

    static async getUserFriends(userId){
        try {
            return await friendshipModel.find({ userId });
        } catch (error) {
            throw new Error("Error fetching user friends: " + error.message);
        }
    }

    static async getPendingFriendRequests(userId){
        try {
            return await friendshipModel.find({ recipient : userId, status: "Pending"})
                                        .populate("requester", "username email");
        } catch (error) {
            throw new Error("Error fetching pending friend requests: " + error.message);
        }
    }

    static async toggleFriendship(friendId){

    }

    static async responseToFriendRequest(friendId){

    }
}