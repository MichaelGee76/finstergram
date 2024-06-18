import express from "express";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";
import { MessageController } from "../controllers/messageController.js";

export const messageRouter = express
    .Router()
    .post("/newMessage", doJWTAuth, MessageController.postMessageCtrl);
// .patch("message/:id", doJWTAuth, MessageController.updateMessage);
