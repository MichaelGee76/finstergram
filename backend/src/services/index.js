import { registerUser } from "./registerUser.js";
import { verifyEmailUser } from "./verifyEmailUser.js";
import { showAllUsers } from "./showAllUsers.js";
import { showOneUser } from "./showOneUser.js";
import { refreshAccessToken } from "./refreshAccessToken.js";

export const UserService = {
    registerUser,
    verifyEmailUser,
    showAllUsers,
    showOneUser,
    refreshAccessToken,
};
