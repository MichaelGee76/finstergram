import mongoose from "mongoose";
import { Message } from "../../models/message.js";
import { User } from "../../models/user.js";

export async function getAllChats(userId) {
  // Nachrichten abrufen und gruppieren
  const messages = await Message.aggregate([
    {
      $match: {
        $or: [
          { userId: new mongoose.Types.ObjectId(userId) }, // Nachrichten, die der Benutzer gesendet hat
          { messagedId: new mongoose.Types.ObjectId(userId) }, // Nachrichten, die der Benutzer empfangen hat
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
            if: { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
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
      const chatPartnerId = chat._id;
      const user = await User.findById(chatPartnerId).select(
        "profilePicture userName _id"
      );

      const wasRead = chat.lastMessage.userId.equals(userId)
        ? true
        : chat.lastMessage.wasRead;

      return {
        profilePicture: user.profilePicture,
        userName: user.userName,
        userId: user._id,
        lastMessage: chat.lastMessage.text,
        lastMessageDate: chat.lastMessage.createdAt,
        wasRead: wasRead,
      };
    })
  );

  chatOverview.sort(
    (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
  );
  return chatOverview;
}
