import express from "express";
import { adminAuth } from "../controller/admin.controller.js";
import { adminValidation } from "../validation/admin.validation.js";

const router = express.Router()

router.post('/login',
    adminValidation.validateLogin,
    adminAuth.adminLogin);
router.post('/register',
    adminValidation.validateRegister,
    adminAuth.adminRegister);
router.post('/change-password',
    adminValidation.validateChangePassword,
    adminAuth.adminChangePassword);

router.get("/profile",
    adminAuth.adminProfile);
router.patch("/edit-profile",
    adminValidation.validateEditProfile,
    adminAuth.editProfile);
router.get("/logout",
    adminAuth.logout);
router.delete("/delete-admin",
    adminAuth.deleteAdmin);
router.post('/toggle-active-inactive',
    adminAuth.ActiveInactiveToggle);

export default router;