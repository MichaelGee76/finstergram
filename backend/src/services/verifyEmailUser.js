import { User } from "../models/user.js";

export async function verifyEmailUser(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");

    if (user.isEmailVerified) {
        return { message: "your account is already verified" };
    }
    user.isEmailVerified = true;
    await user.save();

    return { message: "your account is successfully verified" };
}
