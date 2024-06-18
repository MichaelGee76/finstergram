import express from "express";
import { SaveController } from "../controllers/saveController.js";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";

export const saveRouter = express
  .Router()

  .post("/:postId", doJWTAuth, SaveController.savePostCtrl)
  .delete("/:postId", doJWTAuth, SaveController.deleteSaveCtrl)
  .get("/savedPosts", doJWTAuth, SaveController.getSavedPostsCtrl);
