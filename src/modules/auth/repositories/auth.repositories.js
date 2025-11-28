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

async function userLogin() {

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

export const userAuth_repositories = wrapAllAsync({
    userRegister,
    userLogin,
    changePassword,
    userProfile,
    editProfile,
    logout,
    deleteUser
})