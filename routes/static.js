import Express from "express";
import { staticContoller } from "../controllers/static.js";
import { shortnerController } from "../controllers/shortner.js";
import { verifyUserBySessionID as verifyUser } from "../middlewares/auth.js";

export const Router = Express.Router();

Router.get("/", staticContoller.home);
Router.get("/login", staticContoller.login);
Router.get("/signup", staticContoller.signup);
Router.get("/dashboard", verifyUser, staticContoller.dashboard);
Router.get("/:shortURL", shortnerController.redirectToRealURL);