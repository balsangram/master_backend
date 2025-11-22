import { AppError } from "../../utils/common/AppError.js";
import { wrapAllAsync } from "../../utils/wrapAllAsync.js";
import { BaseUser } from "./BaseUser.model.js";

async function userRegister() {
    const User = await BaseUser.findById(id);
    if (!User) {
        throw new AppError()
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