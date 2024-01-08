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
    visitHistory: [{
        timestamp: {
            type: Number
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

export const shortner = model("url_shortner", schema);