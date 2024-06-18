import express from "express";
import { SaveController } from "../controllers/saveController.js";

export const saveRouter = express
    .Router()

    .post("/:postId", SaveController.savePostCtrl)
    .delete("/:postId", SaveController.deleteSaveCtrl)
    .get("/savedPosts", SaveController.getSavedPostsCtrl);
