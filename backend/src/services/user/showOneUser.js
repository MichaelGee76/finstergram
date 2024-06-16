import { User } from "../../models/user.js";

export async function showOneUser(userId) {
  const user = await User.findById(userId);
  if (!user) throw new error("user doesn't exist");
  return user;
}
