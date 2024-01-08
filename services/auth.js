import JWT from "jsonwebtoken";

const { sign, verify } = JWT;
const secretKey = "*c<o6#[/&(9wK=eCk<3a_sGpjWvBbg3<I6;=#RZ8)9a}cE6IC9crgJd&QZB4[!";

class Auth {

    createUser(user) {

        const userData = {
            _id: user._id,
            email: user.email,
            password: user.password
        }
        
        return sign(userData, secretKey);
    }

    getUser(token) {
        let user;
        try {
            user = verify(token, secretKey);
        } catch {
            user = null;
        }
        return user;
    }
}

export const auth = new Auth();