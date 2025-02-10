import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User" 
    },
    caption: { 
        type: String, 
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: false 
    },
}, { timestamps: true });

const PostModel = mongoose.model("Post", postSchema);

export default class PostRepository {
    static async addPost(postData) {
        try {
            const newPost = new PostModel(postData);
            return await newPost.save();
        } catch (error) {
            throw new Error("Error creating post: " + error.message);
        }
    }

    static async getAllPosts() {
        try {
            return await PostModel.find();
        } catch (error) {
            throw new Error("Error fetching posts: " + error.message);
        }
    }

    static async getUserPosts(userId) {
        try {
            return await PostModel.find({ userId });
        } catch (error) {
            throw new Error("Error fetching user posts: " + error.message);
        }
    }

    static async getPostById(id) {
        try {
            return await PostModel.findById(id);
        } catch (error) {
            throw new Error("Error fetching post: " + error.message);
        }
    }

    static async updatePost(id, updateData) {
        try {
            return await PostModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error("Error updating post: " + error.message);
        }
    }

    static async deletePost(id) {
        try {
            return await PostModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error deleting post: " + error.message);
        }
    }

    static async filterByCaption(caption) {
        try {
            return await PostModel.find({ caption: { $regex: caption, $options: "i" } });
        } catch (error) {
            throw new Error("Error filtering posts: " + error.message);
        }
    }
}
