import { auth } from "../services/auth.js"

export async function verifyUserBySessionID(req, res, next) {
    const sessionId = req.cookies?.uid;

    if (!sessionId) return res.redirect("/login");

    const user = auth.getUser(sessionId);
    if (!user) return res.redirect("/login");
    
    req.user = user;
    next();
}