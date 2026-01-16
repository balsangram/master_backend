import { AppError } from "../../../utils/common/AppError.js";
import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js";
import { BaseAuth } from "../model/baseAuth.model.js";

const userRegister = async (data) => {
    console.log("🚀 ~ userRegister ~ data:", data)
    const user = await BaseAuth.create(data)
    // console.log("🚀 ~ userRegister ~ User:", user)
    console.log("userRegister execute sucessafully");

    if (!user) {
        throw new AppError("User registration failed. Please try again later.", 500);
    }
    return user
}

const isExist = async (data) => {
    console.log("🚀 ~ isExist ~ data:", data);

    const conditions = [];

    // check email OR phone (never both)
    if (data.email) {
        conditions.push({ email: data.email });
    }

    if (data.phone) {
        conditions.push({ phone: data.phone });
    }

    // username check (always)
    if (data.username) {
        conditions.push({ username: data.username });
    }

    if (conditions.length === 0) {
        return false;
    }

    const user = await BaseAuth.findOne({
        $or: conditions,
    });

    console.log("🚀 ~ isExist ~ user:", user);
    return !!user;
};


const userLogin = async (email, phone, userName, hashPassword) => {
    console.log("🚀 ~ userLogin ~ email, phone, userName, hashPassword:", email, phone, userName, hashPassword)

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
    console.log("🚀 ~ userLogin ~ user.password and hashPassword:", user.password, hashPassword)
    if (!isMatch) {
        throw new AppError("Invalid password", 401)
    }

    return user;

}

const isSamePassword = async (id, hashOldPassword) => {
    // console.log("🚀 ~ isSamePassword ~ hashOldPassword:", id, hashOldPassword);
    const userDettalis = await BaseAuth.findById(id);
    // console.log("🚀 ~ isSamePassword ~ userDettalis:", userDettalis)
    const existPassword = userDettalis.password
    // console.log("🚀 ~ isSamePassword ~ existPassword:", existPassword)
    // console.log("🚀 ~ isSamePassword ~ existPassword === hashOldPassword:--------------------", existPassword === hashOldPassword)
    if (existPassword === hashOldPassword) {
        return true;
    }
    return false;
}

const isUserExist = async (id) => {
    // console.log("id : ", id);
    const userIdExist = await BaseAuth.findById(id);
    if (!userIdExist) {
        throw new AppError("User not exist");
    }
    return true;
}

const changePassword = async (id, hashNewPassword) => {
    // console.log("🚀 ~ changePassword ~ id, hashNewPassword:", id, hashNewPassword)
    const userDetails = await BaseAuth.findById(id);
    // console.log("🚀 ~ changePassword ~ userDetails:", userDetails)
    const chagePassword = await BaseAuth.findByIdAndUpdate(id, { password: hashNewPassword }, { new: true })
    // console.log("🚀 ~ changePassword ~ chagePassword:", chagePassword)
}

const userProfile = async (id) => {
    // console.log("🚀 ~ userProfile ~ id:", id)
    const userDetails = await BaseAuth.findById(id);
    // console.log("🚀 ~ userProfile ~ userDetails:", userDetails)
    return userDetails;
}

const editProfile = async (id, data) => {
    // console.log("data", data);
    // console.log("id", id);
    await BaseAuth.findByIdAndUpdate(id, data);
}

const logout = async () => {

}

const deleteUser = async (id) => {
    // console.log("id: ", id)
    const deleteUser = await BaseAuth.findByIdAndDelete(id);
}

export const userAuth_repositories = {
    userRegister,
    isExist,
    userLogin,
    isSamePassword,
    isUserExist,
    changePassword,
    userProfile,
    editProfile,
    logout,
    deleteUser
}