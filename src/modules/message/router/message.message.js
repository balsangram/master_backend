import express from "express"
import { validateMultiple } from "../../../middleware/validateMultiple.js";
import { userMessage_controller } from "../controller/message.controller.js";
import { mnessageValidation } from "../validation/message.validation.js";
import { authenticate } from "../../../middleware/authMiddleware.js";

const router = express.Router();


router.use(authenticate());
// end to end message 
router.get("/display-message/:conversationId",
    userMessage_controller.getUserMessages)
router.post("/send-message/:receiverId",
    validateMultiple(mnessageValidation.validationSendMesaage),
    userMessage_controller.sendMessages)

router.patch(
    "/edit-message/:messageId",
    validateMultiple(mnessageValidation.validationEditMessage),
    userMessage_controller.editMessages
);

router.delete("/delete-message/:messageId",
    userMessage_controller.deleteMessages
)

router.get("/display-all-messages",
    userMessage_controller.displayAllMessages
)

// group message 
// router.get()

export default router;