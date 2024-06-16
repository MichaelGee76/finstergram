import { User } from "../../models/user.js";

export async function updateUser(authenticatedUserId, updatedData) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("user not found");

  if (user.userName !== updatedData.userName) {
    const user = await User.find(updatedData.userName);
    if (user) throw new Error("userName already exist");
  }
  await user.save(updatedData);

  return user;
}
