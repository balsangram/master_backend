import { ApiResponse } from "../../../utils/common/ApiResponse.js";
import { asyncHandler } from "../../../utils/common/asyncHandler.js";
import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js"
import { userAuth_services } from "../services/auth.services.js";

const userRegister = asyncHandler(async (req, res, next) => {
    console.log(req.body, "body -1");
    const result = await userAuth_services.userRegister(req.body);
    return res.status(201).json(new ApiResponse(201, result, "User Registered Sucessafully"));
})

const userLogin = asyncHandler(async (req, res) => {
    console.log("🚀 ~ userLogin ~ req:", req.body)
    const user = await userAuth_services.userLogin(req.body);
    console.log(user,"user");
    return res.status(201).json(new ApiResponse(201, { user }, "User Login Sucessafully"));
})

const changePassword = asyncHandler(async (req, res) => {
    const id = req.user._id;
    // console.log("🚀 ~ changePassword ~ id:", id)
    const result = await userAuth_services.changePassword(id, req.body);
    return res.status(201).json(new ApiResponse(201, null, "Password Change Sucessafully"));
})

const userProfile = asyncHandler(async (req, res) => {
    const id = req.user._id;
    // console.log("ID :", id);
    const result = await userAuth_services.userProfile(id);
    // console.log("🚀 ~ userProfile ~ result :", result)
    return res.status(200).json(new ApiResponse(200, result, "User DEtails Display sucessafully"));
})

const editProfile = asyncHandler(async (req, res) => {
    // console.log("🚀 ~ editProfile ~ req.body:", req.body)
    const id = req.user._id;
    // console.log("id: ", id);
    const result = await userAuth_services.editProfile(id, req.body);
    return res.status(200).json(new ApiResponse(200, null ,"User Details Updated Sucessafullly"));
})

const logout = asyncHandler(async (req, res) => {

})

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.user._id;
    // console.log("id : ", id);
    const result = await userAuth_services.deleteUser(id);
    return res.status(200).json(new ApiResponse(200, "User Deleted Sucessafully"));
})

// applay asyncHandler in all function 

export const userAuth_controller = {
    userRegister,
    userLogin,
    changePassword,
    userProfile,
    editProfile,
    logout,
    deleteUser
}