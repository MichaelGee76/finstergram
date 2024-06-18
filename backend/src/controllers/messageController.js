import asyncHandler from "express-async-handler";
import { sendResponse } from "../helpers/sendResponse.js";
import { MessageService } from "../services/index.js";

const postMessageCtrl = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const messageContent = req.body;
    const result = await MessageService.postMessage(
        userId,
        messageContent,
        messageId
    );
    if (!result) {
        res.status(500).json("Could not post message");
    }
    sendResponse(res, result);
});

const updateMessageCtrl = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const messageToUpdate = req.body;

    const result = await MessageService.updateMessage(userId, messageToUpdate);
    if (!result) {
        res.status(500).json({ message: "Could not update comment" });
    }

    sendResponse(res, result);
});

export const MessageController = {
    postMessageCtrl,
    updateMessageCtrl,
};
