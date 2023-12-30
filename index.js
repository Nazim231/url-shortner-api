import Express from "express";
import { makeConnection } from "./connection.js";
import { Router } from "./routes/shortner.js";

// Initialising Express
const app = Express();

// middlewares
app.use(Express.urlencoded({extended: false}))

// connecting to DB
makeConnection();

// routes
app.use("/", Router);

// starting server
app.listen(8000, () => console.log("Server Started Successfully"));