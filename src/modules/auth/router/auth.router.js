import express from "express";
import { userAuth_controller } from "../controller/auth.controller.js";
import { userAuthValidation } from "../validation/auth.validation.js";
import { validateMultiple } from "../../../middleware/validateMultiple.js";
import { authenticate } from "../../../middleware/authMiddleware.js";
import { googleLoginController } from "../controller/google.auth.controller.js";

const router = express.Router();

// ================= PUBLIC ROUTES =================
router.post(
  "/register",
  validateMultiple(userAuthValidation.validationRegister),
  userAuth_controller.userRegister
);

router.post(
  "/login",
  validateMultiple(userAuthValidation.validationLogin),
  userAuth_controller.userLogin
);
router.post('/google-login',googleLoginController)

// ================= AUTHENTICATED USER ROUTES =================
router.use(authenticate(["user"])); // any logged-in user

router.post(
  "/change-password",
  validateMultiple(userAuthValidation.validationChangrPassword),
  userAuth_controller.changePassword
);

router.get("/profile", userAuth_controller.userProfile);

router.patch(
  "/edit-profile",
  validateMultiple(userAuthValidation.validationEditProfile),
  userAuth_controller.editProfile
);

router.get("/logout", userAuth_controller.logout);

// ❗ Usually admin-only (keep only if really required)
router.delete("/delete-user", userAuth_controller.deleteUser);

export default router;
