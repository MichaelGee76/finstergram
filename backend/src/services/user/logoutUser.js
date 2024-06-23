import { User } from "../../models/user.js";

export async function logoutUser(userId, req) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("No user found");
  }
  // zerstört die session komplett, nicht nur refreshtoken auf null
  // sondern auch die aktive sitzung beenden
  // req.session.destroy((err) => {
  //   if (err) {
  //     throw new Error("Failed to destroy session");
  //   }
  // });

  // req.session.refreshToken = null;
  user.isOnline = false;

  await user.save();

  return { message: "You are logged out" };
}
