import { ApiResponse } from "../../../utils/common/ApiResponse.js";
import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js"
import { userAuth_services } from "../services/auth.services.js";

async function userRegister(req, res, next) {
    // console.log(req.body, "body -1");
    const result = await userAuth_services.userRegister(req.body);
    return res.status(201).json(new ApiResponse(201, result, "User Registered Sucessafully"));
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