import { AppError } from "../../../utils/common/AppError.js";
import { generateToken } from "../../../utils/common/token.js";
import { userAuth_repositories } from "../repositories/auth.repositories.js"
import crypto from "crypto";

async function userRegister(data) {
    // console.log(data, "body 2");
    const exists = await userAuth_repositories.isExist(data);
    // console.log("🚀 ~ userRegister ~ isExist:", exists)
    if (exists) {
        // ❌ do NOT use res
        // just THROW error
        throw new AppError("User already exists", 400);
    }
    const result = await userAuth_repositories.userRegister(data);
}

async function userLogin(data) {
    // console.log("🚀 ~ userLogin ~ data:", data)
    const { email, phone, userName, password } = data;
    // console.log("🚀 ~ userLogin ~ phone:", phone)
    const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
    // console.log("🚀 ~ userLogin ~ hashPassword:", hashPassword)

    const user = await userAuth_repositories.userLogin(email, phone, userName, hashPassword);
    const token = generateToken(user);

    return {
        user, token
    }

}

async function changePassword(id, data) {
    const newPassword = data.newPassword;
    // console.log("🚀 ~ changePassword ~ newPassword:", newPassword)
    const oldPassword = data.oldPassword;
    // console.log("🚀 ~ changePassword ~ oldPassword:", oldPassword)

    const hashNewPassword = crypto.createHash("sha256").update(newPassword).digest("hex");
    // console.log("🚀 ~ changePassword ~ hashNewPassword:", hashNewPassword)
    const hashOldPassword = crypto.createHash("sha256").update(oldPassword).digest("hex");
    // console.log("🚀 ~ changePassword ~ hashOldPassword:", hashOldPassword)

    // 1. Same password check
    if (oldPassword === newPassword) {
        throw new AppError("old and new password should not be same", 400);
    }

    // 2. Check old password
    const matchPassword = await userAuth_repositories.isSamePassword(id, hashOldPassword);

    if (!matchPassword) {
        throw new AppError("Old password is incorrect", 400);
    }

    // 3. Update password
    await userAuth_repositories.changePassword(id, hashNewPassword);

    // 4. Return success
    return "Password changed successfully";
}


async function userProfile(data) {
    console.log("DATA :", data)
    const id = data;
    const userDetails = await userAuth_repositories.userProfile(id);
    // console.log("🚀 ~ userProfile ~ userDetails:", userDetails);
    return userDetails;
}

async function editProfile(id, data) {
    // console.log("data :", data);
    const isExist = await userAuth_repositories.isUserExist(id);
    if (!isExist) {
        throw new AppError("User not exst", 404);
    }
    await userAuth_repositories.editProfile(id, data);
}

async function logout() {

}

async function deleteUser(data) {
    // console.log("data : ", data);
    const id = data;
    if (id) {
        throw new AppError("User not found.", 400)
    }
    const userExitst = await userAuth_repositories.isUserExist(id);
    await userAuth_repositories.deleteUser(id);
}

export const userAuth_services = {
    userRegister,
    userLogin,
    changePassword,
    userProfile,
    editProfile,
    logout,
    deleteUser
}