import { AppError } from "../../../utils/common/AppError.js";
import { userMessage_repositories } from "../repositories/message.repositories.js"

async function getUserMessages(conversationId, id) {
    await userMessage_repositories.isConversation(conversationId);
    const conversationDetails = await userMessage_repositories.getUserMessages(conversationId, id);
    return conversationDetails;
}
async function sendMessages(id, receiverId, message) {

    // console.log("🚀 ~ sendMessages ~ id, receiverId, message:", id, receiverId, message);

    // 1️⃣ Check if conversation exists
    let conversationId = await userMessage_repositories.checkConversation(id, receiverId);
    console.log("🚀 ~ sendMessages ~ existingConversation:", conversationId);
    // 2️⃣ If no conversation → create one
    if (!conversationId) {
        conversationId = await userMessage_repositories.createConversation(id, receiverId);
        // console.log("🚀 ~ sendMessages ~ newConversationId:", conversationId);
    }
    // 3️⃣ Now send message to the correct conversation
    await userMessage_repositories.sendMessages(id, receiverId, message, conversationId);

    return conversationId; // optional
}

async function editMessages(messageId, message, senderId) {
console.log("🚀 ~ editMessages ~ messageId, message:", messageId, message)
await userMessage_repositories.isMessageIdExist(messageId);
    await userMessage_repositories.editMessages(messageId, message, senderId);
}
async function deleteMessages(messageId, senderId) {

    // console.log("📌 Received messageId:", messageId);

    await userMessage_repositories.isMessageIdExist(messageId);
    await userMessage_repositories.deleteMessages(messageId, senderId);
}



export const userMessage_services = {
    getUserMessages,
    sendMessages,
    editMessages,
    deleteMessages
}