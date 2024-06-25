import { User } from "../../models/user.js";
import { userToView } from "../../helpers/userToView.js";

// export async function updateUser(authenticatedUserId, updatedData) {
//   console.log(updatedData);
//   const user = await User.findById(authenticatedUserId);
//   if (!user) throw new Error("user not found");

//   if (user.userName !== updatedData.userName) {
//     const user = await User.findOne({ userName: updatedData.userName });
//     console.log(updatedData.userName);
//     if (user) throw new Error("userName already exist");
//   }

//   await user.save(updatedData);

//   return user;
// }

export async function updateUser(authenticatedUserId, updatedData) {
    const user = await User.findById(authenticatedUserId);
    if (!user) throw new Error("user not found");

    if (user.userName !== updatedData.userName) {
        const user2 = await User.findOne({ userName: updatedData.userName });

        if (user2 && authenticatedUserId !== user2._id) {
            throw new Error("userName already exist");
        }
    }
    Object.assign(user, updatedData);
    await user.save();
    const newUser = userToView(user);

    return newUser;
}
