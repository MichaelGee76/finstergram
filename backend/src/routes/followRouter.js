import { FollowController } from "../controllers/followController.js";
import express from "express";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";

export const followRouter = express
    .Router()
    .get("/",doJWTAuth,FollowController.getFollowInfoCtrl)
    .post("/newfollow/:id", doJWTAuth, FollowController.postFollowCtrl)
    .delete("/follow/:id", doJWTAuth, FollowController.deleteFollowCtrl);
