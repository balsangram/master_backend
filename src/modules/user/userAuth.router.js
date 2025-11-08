import express from "express";
import { userAuth } from "./userAuth.controller.js"

const router = express.Router();

router.post("/register", userAuth.userRegister);
router.post("/login", userAuth.userLogin);
router.post("/change-password", userAuth.changePassword);

router.get("/profile", userAuth.userProfile);
router.patch("/edit-profile", userAuth.editProfile);
router.get("/logout", userAuth.logout);
router.delete("/delete-user", userAuth.deleteUser);

export default router;