import { UserController } from "../controllers/userController.js";
import express from "express";

export const userRouter = express
    .Router()
    .get("/", UserController.getAllUsersCtrl)
    .get("/:userId", UserController.getOneUserCtrl)
    .post("/register", UserController.postRegisterUserCtrl)
    .get("/verifyEmail/:id", UserController.postVerifyEmailUserCtrl)
    .post(
        "/refresh-token",
        validateRefreshToken,
        UserController.postRefreshAccessTokenCtrl
    );
