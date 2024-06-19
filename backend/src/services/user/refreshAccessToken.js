import { userToView } from "../../helpers/userToView.js";
import { User } from "../../models/user.js";
import { createToken } from "../../utils/createToken.js";

export async function refreshAccessToken(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User doesn't exist !");

  if (!user.isEmailVerified)
    throw new Error("User is not verified, check ur mails");

  const newAccessToken = createToken(user, "access");
  const currentUser = userToView(user);
  return {
    newAccessToken,
    user: currentUser,
  };
}
