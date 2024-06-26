import { User } from "../../models/user.js";
import { Message } from "../../models/message.js";

export async function updateMessage(userId, messagedId) {
  // Überprüfe, ob der Benutzer existiert
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User does not exist");
  }

  // Überprüfe, ob der Chat-Partner existiert
  const chatPartner = await User.findById(messagedId);
  if (!chatPartner) {
    throw new Error("Chat partner does not exist");
  }

  // Aktualisiere alle Nachrichten zwischen den beiden Benutzern, um `wasRead` auf `true` zu setzen
  const updatedMessages = await Message.updateMany(
    { userId: messagedId, messagedId: userId },

    { wasRead: true }
  );

  if (updatedMessages.modifiedCount === 0) {
    throw new Error("No messages were updated");
  }

  return {
    message: "All messages between the users have been marked as read",
    updatedMessages,
  };
}
