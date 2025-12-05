import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BaseAuth"
            }
        ],
        lastMessage: {
            type: String
        },
        lastMessageTime: {
            type: Date
        }
    },
    { timestamps: true }
);

export const Conversation = mongoose.model(
    "Conversation",
    conversationSchema
);
