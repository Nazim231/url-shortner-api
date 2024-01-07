class Auth {
    
    #userMap = new Map();

    createUser(id, user) {
        this.#userMap.set(id, user);
        console.log(this.getUser(id));
    }

    getUser(id) {
        const user = this.#userMap.get(id);
        console.log("User: ", user);
        return user;
    }
}

export const auth = new Auth();