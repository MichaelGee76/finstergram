import express from "express";
import { SaveController } from "../controllers/saveController.js";

export const saveRouter = express
    .Router()

    .post("/save", SaveController.savePostCtrl)
    .delete("/:id", SaveController.deleteSaveCtrl)
    .get("/savedPosts", SaveController.getSavedPostsCtrl);
