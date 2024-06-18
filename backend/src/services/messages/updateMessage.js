import { User } from "../../models/user.js";
import { Message } from "../../models/message.js";

export async function updateMessage(userId, messageToUpdate, messageId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("user don't exist");
    }

    const message = await Message.findById(messageId);
    if (!message) {
        throw new Error("message don't exist");
    }

    if (message.userId.toString() !== user.userId.toString()) {
        throw new Error("No permission to update message");
    }
    const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        messageToUpdate,
        {
            new: true,
        }
    );
    if (!updatedMessage) {
        throw new Error("Could not update message");
    }
    return updatedMessage;
}
