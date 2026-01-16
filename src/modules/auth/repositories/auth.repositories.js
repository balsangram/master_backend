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


const userLogin = async (email, phone, userName) => {
console.log(email, phone, userName,"email, phone, userName")
    const query = [];

    if (userName) query.push({ userName: userName.trim() });
    if (email) query.push({ email: email.trim().toLowerCase() });
    if (phone) query.push({ phone: phone.trim() });

    if (query.length === 0) {
        throw new AppError("Login identifier required", 400);
    }
console.log(query ,"query")
    const user = await BaseAuth.findOne({ $or: query });
console.log(user,"user")
    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};


const userLoginId = async (id) => {

    const user = await BaseAuth.findById(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};




const isUserExist = async (id) => {
    // console.log("id : ", id);
    const userIdExist = await BaseAuth.findById(id);
    if (!userIdExist) {
        throw new AppError("User not exist");
    }
    return true;
}

const changePassword = async (id, newPassword) => {
    // console.log("🚀 ~ changePassword ~ id, hashNewPassword:", id, hashNewPassword)
    const userDetails = await BaseAuth.findById(id);
    // console.log("🚀 ~ changePassword ~ userDetails:", userDetails)
    const chagePassword = await BaseAuth.findByIdAndUpdate(id, { password: newPassword })
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
    userLoginId,
    isUserExist,
    changePassword,
    userProfile,
    editProfile,
    logout,
    deleteUser
}