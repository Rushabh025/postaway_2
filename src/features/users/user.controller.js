import bcrypt from "bcrypt";
import UserModel from "./user.model.js";
import ApplicationError from "../../common/errors/ApplicationError.js";

class UserController{

    async getAllUserDeatils(req, res, next){
        try {
            const users = UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(new ApplicationError("Failed to fetch users", 500));
        }
    }

    async signUp(req, res, next){
        try {
            const { name, email, password } = req.body;

            if(UserModel.getUser(email)){
                return res.status(409).json({ message: "Email already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Add the user
            const newUser = UserModel.addUser({ name, email, password: hashedPassword });
            res.status(201).json(newUser);

        } catch (error) {
            next(new ApplicationError("Registration Failed", 500));
        }
    }

    async signIn(req, res, next){
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = UserModel.getUser(email);
            if (!user) {
                return res.status(401).json({ message: "Wrong email or password" });
            }

            // Compare hashed password
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Wrong email or password" });
            }

            // Store the user ID in the session
            req.session.userId = user.id;
            
            res.status(200).json({ message: "Login successful" });
        } catch (error) {
            next(new ApplicationError("Login Failed", 500));
        }
    }
}

export default UserController;