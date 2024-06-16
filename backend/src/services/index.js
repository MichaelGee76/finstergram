import { registerUser } from "./registerUser.js";
import { verifyEmailUser } from "./verifyEmailUser.js";
import { showAllUsers } from "./showAllUsers.js";
import { showOneUser } from "./showOneUser.js";
import { refreshAccessToken } from "./refreshAccessToken.js";
import { updateUser } from "./updateUser.js";
import { loginUser } from "./loginUser.js";
import { deleteUser } from "./deleteUser.js";

export const UserService = {
    registerUser,
    verifyEmailUser,
    showAllUsers,
    showOneUser,
    refreshAccessToken,
    updateUser,
    loginUser,
    deleteUser,
};

export const PostServices = {};
