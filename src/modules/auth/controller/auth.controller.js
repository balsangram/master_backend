import { ApiResponse } from "../../../utils/common/ApiResponse.js";
import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js"
import { userAuth_services } from "../services/auth.services.js";

async function userRegister(req, res, next) {
    console.log(req.body, "body -1");
    const result = await userAuth_services.userRegister(req.body);
    return res.status(201).json(new ApiResponse(201, result, "User Registered Sucessafully"));
}

async function userLogin(req, res) {
    console.log("🚀 ~ userLogin ~ req:", req.body)
    const { user, token } = await userAuth_services.userLogin(req.body);
    // Set cookie
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(201).json(new ApiResponse(201, { user, token }, "User Login Sucessafully"));
}

async function changePassword(req, res) {
    const id = req.user._id;
    // console.log("🚀 ~ changePassword ~ id:", id)
    const result = await userAuth_services.changePassword(id, req.body);
    return res.status(201).json(new ApiResponse(201, result, "Password Change Sucessafully"));
}

async function userProfile(req, res) {
    const id = req.user._id;
    // console.log("ID :", id);
    const result = await userAuth_services.userProfile(id);
    // console.log("🚀 ~ userProfile ~ result :", result)
    return res.status(200).json(new ApiResponse(200, result, "User DEtails Display sucessafully"));
}

async function editProfile(req, res) {
    // console.log("🚀 ~ editProfile ~ req.body:", req.body)
    const id = req.user._id;
    // console.log("id: ", id);
    const result = await userAuth_services.editProfile(id, req.body);
    return res.status(200).json(new ApiResponse(200, "User Details Updated Sucessafullly"));
}

async function logout(req, res) {

}

async function deleteUser(req, res) {
    const id = req.user._id;
    // console.log("id : ", id);
    const result = await userAuth_services.deleteUser(id);
    return res.status(200).json(new ApiResponse(200, "User Deleted Sucessafully"));
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