import { Message } from "../../models/message.js";
// export async function getAllChats(userId) {
//     // MongoDB-Aggregationspipeline, um die Chats abzurufen
//     const messages = await Message.aggregate([
//         //Filtere Nachrichten, die die angegebenen userId haben
//         { $match: { userId: userId } },
//         // Gruppiere Nachrichten nach messagedId
//         {
//             $group: {
//                 _id: "$messagedId", // Der Schlüssel für die Gruppierung ist messagedId
//                 messages: { $push: "$$ROOT" }, // Füge alle Nachrichten in ein Array mit dem Namen "messages" ein
//             },
//         }, // sortiert nur
//         { $sort: { "messages.createdAt": -1 } },
//     ]);

//     if (!messages) {
//         throw new Error("No messages found for this user");
//     }

//     return messages;
// }

//  ! das ist der ansatz der nachrichten von uns und an uns gehen

import mongoose from "mongoose";

export async function getAllChats(userId) {
    const messages = await Message.aggregate([
        {
            $match: {
                $or: [
                    { userId: mongoose.Types.ObjectId(userId) }, // Nachrichten, die der Benutzer gesendet hat
                    { messagedId: mongoose.Types.ObjectId(userId) }, // Nachrichten, die der Benutzer empfangen hat
                ],
            },
        },
        {
            $group: {
                _id: {
                    $cond: {
                        if: {
                            $eq: ["$userId", mongoose.Types.ObjectId(userId)],
                        },
                        then: "$messagedId",
                        else: "$userId",
                    },
                },
                messages: { $push: "$$ROOT" },
            },
        },
        { $sort: { "messages.createdAt": -1 } },
    ]);

    if (!messages || messages.length === 0) {
        throw new Error("No messages found for this user");
    }

    return messages;
}
