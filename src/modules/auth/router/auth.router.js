import express from "express";
import { userAuth_controller } from "../controller/auth.controller.js"
import { userAuthValidation } from "../validation/auth.validation.js";
import { validateMultiple } from "../../../middleware/validateMultiple.js";
import { authenticate } from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",
    validateMultiple(userAuthValidation.validateRegister),
    userAuth_controller.userRegister);

router.post("/login",
    validateMultiple(userAuthValidation.validationLogin),
    userAuth_controller.userLogin);

router.use(authenticate());

router.post("/change-password",
    validateMultiple({ body: userAuthValidation.validationChangrPassword }),
    userAuth_controller.changePassword);

router.get("/profile", userAuth_controller.userProfile);
router.patch("/edit-profile", userAuth_controller.editProfile);
router.get("/logout", userAuth_controller.logout);
router.delete("/delete-user", userAuth_controller.deleteUser);

export default router;