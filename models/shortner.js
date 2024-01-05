import { Schema, model } from "mongoose";

const schema = new Schema({
    shortURL: {
        type: String,
        required: true,
        // unique: true,
    },
    realURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }]
}, { timestamps: true });

export const shortner = model("url_shortner", schema);