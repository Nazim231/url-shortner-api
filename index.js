import Express from "express";
import { makeConnection } from "./connection.js";
import { Router } from "./routes/shortner.js";
import { Router as staticRouter } from "./routes/static.js";
import { Router as userRouter } from "./routes/user.js";
import { verifyUserBySessionID as verifyUser } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
// Initialising Express
const app = Express();

// configuring html rendering engine
app.set('view engine', 'ejs')
app.set('views', 'views'); // informing the express about views path

// middlewares
app.use(Express.urlencoded({ extended: false }))
app.use(cookieParser());

// connecting to DB
makeConnection();

// routes
app.use("/url", verifyUser, Router); // verifyUser Middleware is only used from /url routes
app.use("/", staticRouter);
app.use("/user", userRouter);

// starting server
app.listen(8000, () => console.log("Server Started Successfully"));