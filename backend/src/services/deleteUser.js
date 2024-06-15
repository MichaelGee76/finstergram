import { User } from "../models/user.js";

export async function deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error("User with this id not found");

    return deletedUser;
}
