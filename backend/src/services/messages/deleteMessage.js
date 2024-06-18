import { Message } from "../../models/message.js";

export async function deleteMessage(userId, messageId) {
    const messageToDelete = await Message.findOneAndDelete({
        _id: messageId,
        userId,
    });
    if (!messageToDelete) {
        throw new Error("Message not found or no permission");
    }
    return messageToDelete;
}
