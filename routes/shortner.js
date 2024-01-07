import Express from "express";
import { shortnerController } from "../controllers/shortner.js";

export const Router = Express.Router();

Router.get("/", shortnerController.home);

Router.route("/api/:url")
    .get(shortnerController.getURLAnalytics);

Router.post("/", shortnerController.generateShortURL);