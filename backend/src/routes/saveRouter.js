import express from "express";
import { SaveController } from "../controllers/saveController.js";

export const saveRouter = express.Router();

saveRouter.post("/save", SaveController.savePostCtrl);
saveRouter.delete("/save", SaveController.deleteSaveCtrl);
saveRouter.get("/savedPosts", SaveController.getSavedPostsCtrl);
