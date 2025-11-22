import { wrapAllAsync } from "../../utils/wrapAllAsync.js"

async function userRegister() {

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

export const userAuth_services = wrapAllAsync({
    userRegister,
    userLogin,
    changePassword,
    userProfile,
    editProfile,
    logout,
    deleteUser
})