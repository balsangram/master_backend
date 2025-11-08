import express from "express";
import { adminAuth } from "./admin.controller.js";

const router = express.Router()

router.post('/login', adminAuth.adminLogin);
router.post('/register', adminAuth.adminRegister);
router.post('/change-password', adminAuth.adminChangePassword);

router.get("/profile", adminAuth.userProfile);
router.patch("/edit-profile", adminAuth.editProfile);
router.get("/logout", adminAuth.logout);
router.delete("/delete-admin", adminAuth.deleteAdmin);

export default router;