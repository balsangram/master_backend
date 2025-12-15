import { Message } from "../model/message.model.js";
import { Conversation } from "../model/Conversation.model.js";
import { AppError } from "../../../utils/common/AppError.js";
import mongoose from "mongoose";


async function isConversation(conversationId) {
    console.log("🚀 ~ isConversation ~ conversationId:", conversationId)
    const isId = await Conversation.findById(conversationId);
    console.log("🚀 ~ isConversation ~ isId:", isId)
    if (!isId) {
        throw new AppError("User not found", 404)
    }
}

async function getUserMessages(conversationId, userId) {
    const messages = await Message.find({ conversationId })
        .populate("sender", "name email avatar"); // populate only required fields

    // Add isSender flag to each message
    const formatted = messages.map(msg => ({
        _id: msg._id,
        conversationId: msg.conversationId,
        message: msg.message,
        sender: msg.sender,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
        isSender: msg.sender?._id.toString() === userId.toString() // true/false
    }));

    return formatted;
}

async function checkConversation(id, receiverId) {
    // console.log("🚀 ~ checkConversation ~ id, receiverId:", id, receiverId);

    const isConversation = await Conversation.findOne({
        users: { $all: [id, receiverId] }
    });

    if (!isConversation) {
        return false;
    }

    return isConversation._id;
}

async function createConversation(id, receiverId) {
    // console.log("🚀 ~ createConversation ~ id, receiverId:", id, receiverId);

    const conversation = await Conversation.create({
        users: [id, receiverId]
    });

    // console.log("🚀 ~ Created Conversation:", conversation ? conversation._id : null);
    // console.log("🚀 ~ Conversation Exists:", !!conversation);

    if (!conversation) {
        return false;
    }

    return conversation._id;
}

async function sendMessages(id, receiverId, message, conversationId) {
    // console.log("🚀 ~ sendMessages ~ id, receiverId, message, conversationId:",
    //     id, receiverId, message, conversationId
    // );

    // 1️⃣ Create the message
    await Message.create({
        conversationId: conversationId,
        sender: id,
        message: message,
    });

    // 2️⃣ Find conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        console.log("❌ Conversation not found");
        return false;
    }

    // 3️⃣ Update conversation metadata
    conversation.lastMessage = message;
    conversation.lastMessageTime = new Date();

    await conversation.save();

    return true;
}

async function editMessages(messageId, message, senderId) {
    await Message.updateOne(
        { _id: messageId, sender: senderId },
        { $set: { message: message } }
    );
}
async function isMessageIdExist(messageId) {

    console.log("🚀 ~ isMessageIdExist ~ messageId:", messageId)
    const isMessage = await Message.findById(messageId);
    console.log("🚀 ~ isMessageIdExist ~ !!isMessage:", isMessage)
    if (!isMessage) {
        throw new AppError("Message not found", 404)
    }
    return true;
}
async function deleteMessages(messageId, senderId) {
    await Message.deleteOne({ _id: messageId, sender: senderId });
}



async function displayAllMessages(userId) {
  console.log(userId, "userId");

  // ✅ Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const chats = await Conversation.find({
    users: userId, // ✅ correct field
  })
    .populate("users", "name email phone img") // ✅ correct populate
    .sort({ lastMessageTime: -1 });

  console.log(chats, "chats");
  return chats;
}



export const userMessage_repositories = {
    isConversation,
    getUserMessages,
    checkConversation,
    createConversation,
    sendMessages,
    editMessages,
    isMessageIdExist,
    deleteMessages,
    displayAllMessages
}