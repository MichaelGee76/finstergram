import { FollowController } from "../controllers/followController.js";
import express from "express";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";
export const followRouter = express
  .Router()
  .post("/newfollow", doJWTAuth, FollowController.postFollowCtrl)
  .delete("/like", doJWTAuth, FollowController.deleteFollowCtrl);
