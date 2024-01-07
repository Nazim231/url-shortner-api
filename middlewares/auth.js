import { auth } from "../services/auth.js"

export async function verifyUserBySessionID(req, res, next) {
    const sessionId = req.cookies?.uid;
    console.log(sessionId);

    if (!sessionId) return res.redirect("/login");

    const user = auth.getUser(sessionId);
    console.log(user);
    if (!user) return res.redirect("/login");
    
    next();
}