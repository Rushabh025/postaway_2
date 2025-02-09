import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import { checkAuth } from "./middleware/auth.middleware.js";
import { loggerMiddleware } from './middleware/logger.middleware.js';
import { fileUploadMiddleware } from './middleware/fileUpload.middleware.js';
import userRoutes from "./features/users/user.routes.js";
import postRoutes from "./features/posts/post.routes.js";
import commentRoutes from "./features/comments/comment.routes.js";
import likeRoutes from "./features/likes/like.routes.js";

const app = express();

app.use(express.json());
app.use(session({
    secret: "12345",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60,
    },
}));

// Logger middleware for all routes (except /users)
app.use('/api', loggerMiddleware); // This will log every request made to any route starting with /api

// Public routes that don't require authentication (sign-up, sign-in)
app.use('/api/users', userRoutes);

// Protected routes that require authentication
app.use('/api/posts', checkAuth, fileUploadMiddleware, postRoutes);
app.use('/api/comments', checkAuth, commentRoutes);
app.use('/api/likes', checkAuth, likeRoutes);

export default app;