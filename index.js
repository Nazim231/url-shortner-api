import Express from "express";
import { makeConnection } from "./connection.js";
import { Router } from "./routes/shortner.js";
import { Router as staticRouter } from "./routes/static.js";

// Initialising Express
const app = Express();

// configuring html rendering engine
app.set('view engine', 'ejs')
app.set('views', 'views'); // informing the express about views path

// middlewares
app.use(Express.urlencoded({extended: false}))

// connecting to DB
makeConnection();

// routes
app.use("/url", Router);
app.use("/", staticRouter);

// starting server
app.listen(8000, () => console.log("Server Started Successfully"));