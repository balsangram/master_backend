import mongoose from "mongoose";
import { AppError } from "../../../utils/common/AppError.js";
import { userMessage_repositories } from "../repositories/message.repositories.js"
import { getIO } from "../../../socket/index.js";
// import { getIO } from "../../../socket/index.js";

const getUserMessages = async (conversationId, id) => {
    await userMessage_repositories.isConversation(conversationId);
    const conversationDetails = await userMessage_repositories.getUserMessages(conversationId, id);
    return conversationDetails;
}

const sendMessages = async (id, receiverId, message) => {

    let conversationId =
        await userMessage_repositories.checkConversation(id, receiverId);

    if (!conversationId) {
        conversationId =
            await userMessage_repositories.createConversation(id, receiverId);
    }

    const newMessage =
        await userMessage_repositories.sendMessages(
            id,
            receiverId,
            message,
            conversationId
        );

    const io = getIO();

    const payload = {
        _id: newMessage._id,
        conversationId,
        senderId: id,
        receiverId,
        message: newMessage.message,
        createdAt: newMessage.createdAt,
    };

    io.to(receiverId.toString()).emit("newMessage", payload);
    io.to(id.toString()).emit("newMessage", payload); // sender

    return conversationId;
};


const editMessages = async (messageId, message, senderId) => {
    // console.log("🚀 ~ editMessages ~ messageId, message:", messageId, message)
    await userMessage_repositories.isMessageIdExist(messageId);
  const updatedMessage =  await userMessage_repositories.editMessages(messageId, message, senderId);
const io = getIO();
const payload = {
    id : updatedMessage._id,
    conversationId : updatedMessage.conversationId,
      senderId: updatedMessage.sender,
        message: updatedMessage.message,
        updatedAt: updatedMessage.updatedAt,
}
    // send to both users
    io.to(updatedMessage.sender.toString())
      .emit("messageEdited", payload);

    io.to(updatedMessage.receiver.toString())
      .emit("messageEdited", payload);

    return updatedMessage;
}
const deleteMessages = async (messageId, senderId) => {

    // console.log("📌 Received messageId:", messageId);

    await userMessage_repositories.isMessageIdExist(messageId);
  const deletedMessage =  await userMessage_repositories.deleteMessages(messageId, senderId);

   const io = getIO();
     const payload = {
        _id: deletedMessage._id,
        conversationId: deletedMessage.conversationId,
    };
     // notify both users
    io.to(senderId.toString())
      .emit("messageDeleted", payload);

    io.to(deletedMessage.receiver.toString())
      .emit("messageDeleted", payload);

    return deletedMessage;
}


const displayAllMessages = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    return await userMessage_repositories.displayAllMessages(userId);
}


export const userMessage_services = {
    getUserMessages,
    sendMessages,
    editMessages,
    deleteMessages,
    displayAllMessages
}