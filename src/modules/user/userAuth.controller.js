import { wrapAllAsync } from "../../utils/wrapAllAsync.js"

async function userRegister(req, res) {

}

async function userLogin(req, res) {

}

async function changePassword(req, res) {

}

async function userProfile(req, res) {

}

async function editProfile(req, res) {

}

async function logout(req, res) {

}

async function deleteUser(req, res) {

}

// applay asyncHandler in all function 

export const userAuth_controller = wrapAllAsync({
    userRegister,
    userLogin,
    changePassword,
    userProfile,
    editProfile,
    logout,
    deleteUser
})