import { AppError } from "../../../utils/common/AppError.js";
import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js";
import { BaseAuth } from "../model/baseAuth.model.js";

async function userRegister(data) {
    const user = await BaseAuth.create(data)
    // console.log("🚀 ~ userRegister ~ User:", user)
    if (!user) {
        throw new AppError("User registration failed. Please try again later.", 500);
    }
}

async function isExist(data) {
    // console.log("🚀 ~ isExist ~ data:", data)
    const user = await BaseAuth.findOne({
        $or: [
            { email: data.email },
            { phone: data.phone },
            { userName: data.userName }
        ]
    });
    // console.log("🚀 ~ isExist ~ user:", user)
    // console.log("🚀 ~ isExist ~ user:", !!user)
    return !!user;
}

async function userLogin(email, phone, userName, hashPassword) {

    //1. Find user
    const user = await BaseAuth.findOne({
        $or: [
            { userName: userName },
            { email: email },
            { phone: phone }
        ]
    });
    // console.log("🚀 ~ userLogin ~ user:", user)
    if (!user) {
        throw new AppError("User not found", 404)
    }

    //2 compare password with bcrypt
    const isMatch = hashPassword == user.password;

    if (!isMatch) {
        throw new AppError("Invalid password", 401)
    }

    return user;

}

async function changePassword() {

}

async function userProfile() {

}

async function editProfile() {

}

async function logout() {

}

async function deleteUser() {

}

export const userAuth_repositories = {
    userRegister,
    isExist,
    userLogin,
    changePassword,
    userProfile,
    editProfile,
    logout,
    deleteUser
}