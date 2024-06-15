import { User } from "../models/user.js";

export async function refreshAccessToken(authenticatedUserId) {
    const user = await User.findById(authenticatedUserId);
    if (!user) throw new Error("User doesn't exist !");

    if (!user.isEmailVerified)
        throw new Error("User is not verified, check ur mails");

    const getToken = createToken(user, "access");
    return getToken;
}
