import express from "express";
import { userAuth } from "./userAuth.controller.js"

const router = express.Router();

router.post("/register", userAuth.userRegister_controller);
router.post("/login", userAuth.userLogin_controller);
router.post("/change-password", userAuth.changePassword_controller);

router.get("/profile", userAuth.userProfile_controller);
router.patch("/edit-profile", userAuth.editProfile_controller);
router.get("/logout", userAuth.logout_controller);
router.delete("/delete-user", userAuth.deleteUser_controller);

export default router;