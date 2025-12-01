import { AppError } from "../../../utils/common/AppError.js";
import { generateToken } from "../../../utils/common/token.js";
import { userAuth_repositories } from "../repositories/auth.repositories.js"
import crypto from "crypto";

async function userRegister(data) {
    console.log(data, "body 2");
    const exists = await userAuth_repositories.isExist(data);
    console.log("🚀 ~ userRegister ~ isExist:", exists)
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
    // console.log("🚀 ~ userLogin ~ phone:", phone);
    const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
    // console.log("🚀 ~ userLogin ~ hashPassword:", hashPassword)

    const user = await userAuth_repositories.userLogin(email, phone, userName, hashPassword);
    const token = generateToken(user);

    return {
        user, token
    }

}

async function changePassword(id, data) {
    console.log("🚀 ~ changePassword ~ id:", id)
    console.log("🚀 ~ changePassword ~ data: -1", data)
    
}

async function userProfile() {

}

async function editProfile() {

}

async function logout() {

}

async function deleteUser() {

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