import express from "express";
import { doJWTAuth } from "../middlewares/doJwtAuth";

export const messageRouter = express
    .Router()
    .post("newMessage", doJWTAuth, MessageController.postMessage)
    .patch("message/:id", doJWTAuth, MessageController.updateMessage);
