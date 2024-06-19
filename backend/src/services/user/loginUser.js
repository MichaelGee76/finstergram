import { User } from "../../models/user.js";
import { createToken } from "../../utils/createToken.js";
import { userToView } from "../../helpers/userToView.js";
import bcrypt from "bcryptjs";

export async function loginUser({ email, password }, res) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid login");
  if (!user.isEmailVerified)
    throw new Error("Email not verified,login aborted");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    res.status(401).json({ message: "Invalid userData" });
    return;
  }

  const accessToken = createToken(user, "access");
  const refreshToken = createToken(user, "refresh");
  return {
    user: userToView(user),
    tokens: { accessToken, refreshToken },
  };
}
