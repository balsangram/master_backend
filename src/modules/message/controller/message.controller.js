import { ApiResponse } from "../../../utils/common/ApiResponse.js";
import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js";
import { userMessage_services } from "../services/message.services.js";

async function getUserMessages(req, res) {
    const id = req.user._id;
    const conversationId = req.params.conversationId;
    console.log("🚀 ~ getUserMessages ~ conversationId:", conversationId)
    console.log("🚀 ~ getUserMessages ~ id:", id)
    const messages = await userMessage_services.getUserMessages(conversationId, id);
    return res.status(200).json(new ApiResponse(200, messages, "messages displayb sucessafully"));
}
async function sendMessages(req, res) {
    const id = req.user._id;
    const receiverId = req.params.receiverId;
    // console.log("🚀 ~ sendMessages ~ id:", id)
    const { message } = req.body;
    // console.log("🚀 ~ sendMessages ~ receiverId , message:", receiverId, message)
    await userMessage_services.sendMessages(id, receiverId, message)
    return res.status(201).json(new ApiResponse("Message send sucessafully", 201))
}
async function editMessages(req, res) {
    const messageId = req.params.messageId;
    const message = req.body.message;
    const senderId = req.user._id;
    await userMessage_services.editMessages(messageId, message, senderId);
    return res.status(200).json(new ApiResponse(200, null, "Message edited successfully"));
}
async function deleteMessages(req, res) {
    const messageId = req.params.messageId;
    const senderId = req.user._id;
    // console.log("🚀 ~ deleteMessages ~ messageId:", messageId)
    await userMessage_services.deleteMessages(messageId, senderId);
    return res.status(200).json(new ApiResponse(200, null, "Message deleted successfully"));
}

export const userMessage_controller = wrapAllAsync({
    getUserMessages,
    sendMessages,
    editMessages,
    deleteMessages
})