import { User } from "../../models/user.js";

export const changeDarkMode = async (selected, authenticatedUserId) => {
  try {
    const user = await User.findById(authenticatedUserId);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: authenticatedUserId },
      { dark: selected },
      { new: true }
    );

    return { dark: updatedUser.dark };
  } catch (error) {
    console.error("Error changing dark mode:", error);
    throw new Error("Failed to change dark mode");
  }
};
