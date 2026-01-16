import { AppError } from "../../../utils/common/AppError.js";
import { generateRefreshToken, generateToken } from "../../../utils/common/token.js";
import { userAuth_repositories } from "../repositories/auth.repositories.js"
import crypto from "crypto";

const userRegister = async (data) => {
    console.log(data, "body 2");
    const exists = await userAuth_repositories.isExist(data);
    console.log("🚀 ~ userRegister ~ isExist:", exists)
    if (exists) {
        throw new AppError("User already exists", 400);
    }
    const result = await userAuth_repositories.userRegister(data);
}

const userLogin = async (data) => {
    const { email, phone, userName, password } = data;

    const user = await userAuth_repositories.userLogin(
        email,
        phone,
        userName
    );

    // 🔍 Compare using schema method
    const isMatch = user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    return { user, accessToken, refreshToken };
};


const changePassword = async (id, data) => {
    const newPassword = data.newPassword;
    console.log("🚀 ~ changePassword ~ newPassword:", data)
    const oldPassword = data.oldPassword;

    // 1. Same password check
    if (oldPassword === newPassword) {
        throw new AppError("old and new password should not be same", 400);
    }

    const user = await userAuth_repositories.userLoginId(
        id
    );
    // 2. Check old password
    const isMatch = user.comparePassword(oldPassword);
    console.log("isMatch", isMatch)
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    console.log(id, "id", "newPassword", newPassword)

    // 3. Update password
    await userAuth_repositories.changePassword(id, newPassword);

    // 4. Return success
    return "Password changed successfully";
}


const userProfile = async (data) => {
    console.log("DATA :", data)
    const id = data;
    const userDetails = await userAuth_repositories.userProfile(id);
    // console.log("🚀 ~ userProfile ~ userDetails:", userDetails);
    return userDetails;
}

const editProfile = async (id, data) => {
    // console.log("data :", data);
    const isExist = await userAuth_repositories.isUserExist(id);
    if (!isExist) {
        throw new AppError("User not exst", 404);
    }
    await userAuth_repositories.editProfile(id, data);
}

const logout = async () => {

}

const deleteUser = async (data) => {
    // console.log("data : ", data);
    const id = data;
    if (id) {
        throw new AppError("User not found.", 400)
    }
    const userExitst = await userAuth_repositories.isUserExist(id);
    await userAuth_repositories.deleteUser(id);
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