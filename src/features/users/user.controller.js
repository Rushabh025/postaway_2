import bcrypt from "bcrypt";
import UserModel from "./user.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js";

class UserController{

    async signUp(req, res, next){
        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const existingUser = await UserModel.getUserByEmail(email);
            if(existingUser){
                return res.status(409).json({ message: "Email already exists" });
            }

            // Add user to MongoDB
            const newUser = await UserModel.addUser({ name, email, password });
            res.status(201).json(newUser);

        } catch (error) {
            console.error("Error during registration:", error);
            next(new ApplicationError("Registration Failed", 500));
        }
    }

    async signIn(req, res, next){
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await UserModel.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Wrong email or password" });
            }

            // Compare password
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Wrong email or password" });
            }

            // Store the user ID in the session
            req.session.userId = user._id;
            
            res.status(200).json({ message: "Login successful" });
        } catch (error) {
            next(new ApplicationError("Login Failed", 500));
        }
    }

    async logout(req, res, next){
        try {
            req.session.destroy((err) => {
                if (err) {
                    return next(new ApplicationError("Failed to Logout", 500));
                }
                res.status(200).json({ message: "Logout successful" });
            });
            
        } catch (error) {
            next(new ApplicationError("Failed to Logout", 500));
        }
    }

    async logoutAllDevices(req, res, next){
        try {
            if (!req.session.userId) {
                return res.status(401).json({ message: "Not authenticated" });
            }

            // Assuming you store session IDs in UserModel
            UserModel.invalidateUserSessions(req.session.userId);

            res.status(200).json({ message: "Logged out from all devices" });

        } catch (error) {
            next(new ApplicationError("Failed to Logout All Devices", 500));
        }
    }

    // Get a single user by ID
    async getUserDetails(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await UserModel.getOneUser(userId); // Exclude password

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            next(new ApplicationError("Failed to get user details", 500));
        }
    }

    // Get all users
    async getAllUserDetails(req, res, next) {
        try {
            const users = await UserModel.getAllUsers(); // Exclude passwords
            res.status(200).json(users);
        } catch (error) {
            next(new ApplicationError("Failed to fetch users", 500));
        }
    }

    // Update user details
    async updateUserDetails(req, res, next) {
        try {
            const userId = req.params.id;
            const updateData = req.body;
    
            const updatedUser = await UserModel.updateUser(userId, updateData);
    
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json(updatedUser);
        } catch (error) {
            next(new ApplicationError("Failed to update user", 500));
        }
    }
    
}

export default UserController;