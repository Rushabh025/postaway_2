import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema(
    {
        requester: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        recipient: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        status: { 
            type: String, 
            enum: ["Pending", "Accepted", "Rejected"], 
            default: "Pending" 
        }
    },
    { timestamps: true }
);

const friendshipModel = mongoose.model("Friendship", friendshipSchema);

export default class friendshipRepository {
    
    static async getUserFriends(userId) {
        try {
            return await friendshipModel.find({
                $or: [{ requester: userId, status: "Accepted" }, { recipient: userId, status: "Accepted" }]
            })
            .populate("requester recipient", "username email")
            .sort({ updatedAt: -1 });
        } catch (error) {
            throw new Error("Error fetching user friends: " + error.message);
        }
    }

    static async getPendingFriendRequests(userId) {
        try {
            return await friendshipModel.find({ recipient: userId, status: "Pending" })
                                        .populate("requester", "username email")
                                        .sort({ createdAt: -1 });
        } catch (error) {
            throw new Error("Error fetching pending friend requests: " + error.message);
        }
    }

    static async toggleFriendship(requesterId, recipientId) {
        try {
            const existingFriendship = await friendshipModel.findOne({
                $or: [
                    { requester: requesterId, recipient: recipientId },
                    { requester: recipientId, recipient: requesterId }
                ]
            });

            if (existingFriendship) {
                if (existingFriendship.status === "Rejected") {
                    existingFriendship.status = "Pending";
                    await existingFriendship.save();
                    return { added: true, friendship: existingFriendship };
                }
                await friendshipModel.deleteOne({ _id: existingFriendship._id });
                return { added: false, friendship: existingFriendship };
            } else {
                const newFriendship = await friendshipModel.create({
                    requester: requesterId,
                    recipient: recipientId,
                    status: "Pending"
                });
                return { added: true, friendship: newFriendship };
            }
        } catch (error) {
            throw new Error("Error toggling friendship: " + error.message);
        }
    }

    static async responseToFriendRequest(friendshipId, status) {
        try {
            if (!["Accepted", "Rejected"].includes(status)) {
                throw new Error("Invalid status");
            }

            const friendship = await friendshipModel.findByIdAndUpdate(
                friendshipId,
                { status },
                { new: true }
            );

            if (!friendship) {
                throw new Error("Friendship request not found");
            }

            return friendship;
        } catch (error) {
            throw new Error("Error responding to friend request: " + error.message);
        }
    }
}
