import { user as users } from "../models/user.js";
import { v4 as createToken } from "uuid";
import { auth } from "../services/auth.js";

class User {

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render("login", { error: 'All fields are required' });
        }

        const user = await users.findOne({ email, password });
        if (!user) {
            return res.render("login", { error: "Invalid Email or Password" });
        }
        // generating and assigning token to the current user
        const sessionId = createToken();
        auth.createUser(sessionId, user);
        // sending the token in cookie to the client
        res.cookie("uid", sessionId);
        // redirecting user to the home page
        return res.redirect("/dashboard")
    }

    async signup(req, res) {

        // Verifying Data
        const { name, email, password, cpassword } = req.body;
        if (!name || !email || !password) {
            return res.render("signup", { error: 'All fields are required' })
        } else if (password !== cpassword) {
            return res.render("signup", { error: `Password & Confirm Password doesn't match` })
        }

        // Preparing User Data
        const userData = {
            name: name,
            email: email,
            password: password,
        };

        const newUser = await users.create(userData);
        if (newUser) {
            // User Created
            //// generate token and allow user to create links
            const sessionId = createToken();
            auth.createUser(sessionId, newUser);
            res.cookie("uid", sessionId);
            return res.redirect("/dashboard");
        } else {
            // Failed to create user
            return res.render("signup", { error: "Failed to create user, please try again" });
        }
    }

}

export const userController = new User();