import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User Schema
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required: true
    },
    tokenVersion: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

// hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is modified

    this.password = await bcrypt.hash(this.password, 10);
    next(); 
});

// Static method to find a user by email
userSchema.statics.getUserByEmail = async function (email) {
    return this.findOne({email});
};

// Static method to create a new user
userSchema.statics.addUser = async function (userDetails) {
    return this.create(userDetails);
};

// Static method to invalidate sessions (for logoutAllDevices)
userSchema.statics.invalidateUserSessions = async function (userId) {
    // If using a session store like MongoDB, update here
    try {
        await this.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
        return true;
    } catch (error) {
        console.error("Error invalidating user sessions:", error);
        return false;
    }
};

// Find a user by ID
userSchema.statics.getOneUser = async function (userId) {
    return this.findById(userId).select("-password"); // Exclude password from the response
};

// Get all users
userSchema.statics.getAllUsers = async function () {
    return this.find().select("-password"); // Exclude passwords
};

// Update user details
userSchema.statics.updateUser = async function (userId, updateData) {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10); // Hash new password if changed
    }

    return this.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select("-password");
};

// Create the Mongoose Model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;

