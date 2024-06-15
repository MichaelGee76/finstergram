import { UserController } from "../controllers/userController.js";
import express from "express";

export const userRouter = express
    .Router()
    .post("/register", UserController.postRegisterUserCtrl)
    .get("/verifyEmail/:id", UserController.postVerifyEmailUserCtrl);
