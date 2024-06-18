import express from "express";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";
import { MessageController } from "../controllers/messageController.js";

export const messageRouter = express
    .Router()
    .post("/newMessage", doJWTAuth, MessageController.postMessageCtrl)
    .delete("/:id", doJWTAuth, MessageController.deleteMessageCtrl)
    .patch("/:id", doJWTAuth, MessageController.updateMessageCtrl)
    .get(
        "/chat/:userId/:messageId",
        doJWTAuth,
        MessageController.getOneChatCtrl
    )
    .get("chats/:userId", doJWTAuth, MessageController.getAllChatsCtrl);
