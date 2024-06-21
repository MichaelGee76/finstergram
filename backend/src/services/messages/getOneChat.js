import { Message } from "../../models/message.js";
import { User } from "../../models/user.js";

export async function getOneChat(userId, messagedId) {
  // sucht in beide Richtungen zwischen 2 benutzern

  const chat = await Message.find({
    $or: [
      { userId, messagedId },
      { userId: messagedId, messagedId: userId },
    ], // wie rum sortieren? auf oder ab?
  }).sort({ createdAt: -1 });

  const user = await User.findById(messagedId);

  const chatPartner = {
    userName: user.userName,
    profilePicture: user.profilePicture,
    userId: user._id,
  };

  if (!chat) {
    throw new Error("Could not load chat");
  }
  return { chat, chatPartner };
}
