import Express from "express";
import { staticContoller } from "../controllers/static.js";

export const Router = Express.Router();

Router.get("/", staticContoller.home);
Router.get("/login", staticContoller.login);
Router.get("/signup", staticContoller.signup);
Router.get("/dashboard", staticContoller.dashboard);