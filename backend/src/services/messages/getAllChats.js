import { Message } from "../../models/message.js";
import { User } from "../../models/user.js";

export async function getAllChats(userId) {
  // Nachrichten abrufen und gruppieren
  const messages = await Message.aggregate([
    {
      $match: {
        $or: [
          { userId: userId }, // Nachrichten, die der Benutzer gesendet hat
          { messagedId: userId }, // Nachrichten, die der Benutzer empfangen hat
        ],
      },
    },
    {
      $sort: { createdAt: -1 }, // Sortieren nach dem Erstellungsdatum, absteigend
    },
    {
      $group: {
        _id: {
          $cond: {
            if: { $eq: ["$userId", userId] },
            then: "$messagedId",
            else: "$userId",
          },
        },
        lastMessage: { $first: "$$ROOT" },
      },
    },
  ]);

  // Benutzerinformationen abrufen und die Übersicht erstellen
  const chatOverview = await Promise.all(
    messages.map(async (chat) => {
      const userId = chat._id;
      const user = await User.findById(userId).select(
        "profilePicture userName"
      );
      return {
        profilePicture: user.profilePicture,
        userName: user.userName,
        lastMessage: chat.lastMessage.text,
        lastMessageDate: chat.lastMessage.createdAt,
        wasRead: chat.lastMessage.wasRead,
      };
    })
  );

  return chatOverview;
}
