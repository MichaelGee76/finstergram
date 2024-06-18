import { Message } from "../../models/message.js";
import { User } from "../../models/user.js";

export async function postMessage(userId, messageContent, messageId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const receiver = await User.findById(messageId);
    if (!receiver) throw new Error("Receiver not found");
    if (!messageContent) throw new Error("No content. Cannot send message");

    const newMessage = await Message.create({
        userId,
        messageId,
        messageContent,
    });
    return newMessage;
}
