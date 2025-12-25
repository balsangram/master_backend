import { ApiResponse } from "../../../utils/common/ApiResponse.js";
import { asyncHandler } from "../../../utils/common/asyncHandler.js";
import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js";
import { userMessage_services } from "../services/message.services.js";

 const getUserMessages = asyncHandler(async(req, res) => {
    const id = req.user._id;
    const conversationId = req.params.conversationId;
    console.log("🚀 ~ getUserMessages ~ conversationId:", conversationId)
    console.log("🚀 ~ getUserMessages ~ id:", id)
    const messages = await userMessage_services.getUserMessages(conversationId, id);
    return res.status(200).json(new ApiResponse(200, messages, "messages displayb sucessafully"));
});
 const sendMessages = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const receiverId = req.params.receiverId;
    // console.log("🚀 ~ sendMessages ~ id:", id)
    const { message } = req.body;
    // console.log("🚀 ~ sendMessages ~ receiverId , message:", receiverId, message)
    await userMessage_services.sendMessages(id, receiverId, message)
    return res.status(201).json(new ApiResponse("Message send sucessafully", 201))
})
const editMessages = asyncHandler(async(req, res) => {
    const messageId = req.params.messageId;
    const message = req.body.message;
    const senderId = req.user._id;
    await userMessage_services.editMessages(messageId, message, senderId);
    return res.status(200).json(new ApiResponse(200, null, "Message edited successfully"));
})
const deleteMessages = asyncHandler(async(req, res)=> {
    const messageId = req.params.messageId;
    const senderId = req.user._id;
    // console.log("🚀 ~ deleteMessages ~ messageId:", messageId)
    await userMessage_services.deleteMessages(messageId, senderId);
    return res.status(200).json(new ApiResponse(200, null, "Message deleted successfully"));
})

const displayAllMessages = asyncHandler(async(req,res) => {
    const userID = req.user._id;
    console.log(userID,"userID");
    const allMessages = await userMessage_services.displayAllMessages(userID);
    return res.status(200).json(new ApiResponse(200,allMessages ,"All User Display Sucessafully"))
})

export const userMessage_controller ={
    getUserMessages,
    sendMessages,
    editMessages,
    deleteMessages,
    displayAllMessages
}