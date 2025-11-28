import { wrapAllAsync } from "../../../utils/common/wrapAllAsync.js";

function adminLogin() {

}
function adminRegister() {

}
function adminChangePassword() {

}

function adminProfile() {

}

function editProfile() {

}

function logout() {

}

function deleteAdmin() {

}

function ActiveInactiveToggle() {

}

export const adminAuth = wrapAllAsync({
    adminLogin,
    adminRegister,
    adminChangePassword,
    adminProfile,
    editProfile,
    logout,
    deleteAdmin,
    ActiveInactiveToggle,
});
