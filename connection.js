import { connect } from "mongoose";

export async function makeConnection() {
    return connect("mongodb://127.0.0.1:27017/url_shortner_api").then(
        () => console.log("MongoDB Connected Successfully")
    ).catch(
        (err) => {
            console.log("MONGO ERROR:::::", err);
        });
}
