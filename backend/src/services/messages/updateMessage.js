// import { User } from "../../models/user.js";
// import { Message } from "../../models/message.js";

// export async function updateMessage(userId, messagedId) {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("user don't exist");
//   }

//   console.log(messagedId);
//   //   const message = await Message.findById(messagedId);
//   //   if (!message) {
//   //     throw new Error("message don't exist");
//   //   }

//   //   if (message.userId.toString() !== user.userId.toString()) {
//   //     throw new Error("No permission to update message");
//   //   }
//   const updatedMessage = await Message.findByIdAndUpdate(
//     messagedId,
//     { wasRead: true },
//     { new: true }
//   );
//   if (!updatedMessage) {
//     throw new Error("Could not update message");
//   }
//   return updatedMessage;
// }

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
    {
      $or: [
        { userId: userId, messagedId: messagedId },
        { userId: messagedId, messagedId: userId },
      ],
    },
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
