import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js"
import { userAuth_repositories } from "../repositories/auth.repositories.js"

async function userRegister(data) {
    // console.log(data, "body 2");
    const result = await userAuth_repositories.userRegister(data);
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