import Express from "express";
import { userController } from "../controllers/user.js";

export const Router = Express.Router();

Router.post("/login", userController.login);
Router.post("/signup", userController.signup);
