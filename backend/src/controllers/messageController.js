import asyncHandler from "express-async-handler";
import { sendResponse } from "../helpers/sendResponse.js";
import { MessageService } from "../services/index.js";

const postMessageCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const messagedId = req.params.id;
  const messageContent = req.body;
  const result = await MessageService.postMessage(
    userId,
    messageContent,
    messagedId
  );
  if (!result) {
    res.status(500).json("Could not post message");
  }
  sendResponse(res, result);
});

const updateMessageCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const messagedId = req.params.id;

  const result = await MessageService.updateMessage(userId, messagedId);
  if (!result) {
    res.status(500).json({ message: "Could not update comment" });
  }

  sendResponse(res, result);
});

const deleteMessageCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const messagedId = req.params.id;
  const result = await MessageService.deleteMessage(userId, messageId);
  if (!result) {
    res.status(500).json("Could not delete message");
  }

  sendResponse(res, result);
});

const getOneChatCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const messagedId = req.params.id;
  const result = await MessageService.getOneChat(userId, messagedId);
  if (!result) {
    res.status(500).json("Could not get chat");
  }
  sendResponse(res, result);
});

const getAllChatsCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const result = await MessageService.getAllChats(userId);
  if (!result) {
    res.status(500).json("Could not load chats");
  }
  sendResponse(res, result);
});

export const MessageController = {
  postMessageCtrl,
  updateMessageCtrl,
  deleteMessageCtrl,
  getOneChatCtrl,
  getAllChatsCtrl,
};
