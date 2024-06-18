import { Message } from "../../models/message.js";
export async function getAllChats(userId) {
    // MongoDB-Aggregationspipeline, um die Chats abzurufen
    const messages = await Message.aggregate([
        //Filtere Nachrichten, die die angegebenen userId haben
        { $match: { userId: userId } },
        // Gruppiere Nachrichten nach messagedId
        {
            $group: {
                _id: "$messagedId", // Der Schlüssel für die Gruppierung ist messagedId
                messages: { $push: "$$ROOT" }, // Füge alle Nachrichten in ein Array mit dem Namen "messages" ein
            },
        }, // sortiert nur
        { $sort: { "messages.createdAt": -1 } },
    ]);

    if (!messages) {
        throw new Error("No messages found for this user");
    }

    return messages;
}
