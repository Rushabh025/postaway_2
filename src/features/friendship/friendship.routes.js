import express from "express";
import FriendshipController from "./friendship.controller.js";

const friendshipRoutes = express.Router();
const friendshipController = new FriendshipController();

friendshipRoutes.get('/get-friends/:userId', friendshipController.getFriends);
friendshipRoutes.get('/get-pending-requests', friendshipController.getPendingRequests);
friendshipRoutes.post('/toggle-friendship/:friendId', friendshipController.toggleFriendship);
friendshipRoutes.post('/response-to-request/:friendId', friendshipController.responseToRequest);

export default friendshipRoutes;