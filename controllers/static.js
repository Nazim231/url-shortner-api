import { shortner } from "../models/shortner.js";

class StaticController {

    home(req, res) {
        res.render("home");
    }

    login(req, res) {
        res.render("login");
    }

    signup(req, res) {
        res.render("signup");
    }

    async dashboard(req, res) {
        const userId = req.user._id;
        const urls = await shortner.find({ createdBy: userId });
        res.render("dashboard", {urls: urls});
    }
}

export const staticContoller = new StaticController();