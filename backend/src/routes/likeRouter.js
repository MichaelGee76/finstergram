import { LikeController } from "../controllers/likeController.js";
import express from "express";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";
export const likeRouter = express
    .Router()
    .post("/newLike", doJWTAuth, LikeController.postLikeCtrl)
    .delete("/like", doJWTAuth, LikeController.deleteLikeCtrl)
    .get("/likes", doJWTAuth, LikeController.getLikesCtrl);
