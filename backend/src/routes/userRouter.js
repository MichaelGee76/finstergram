import { UserController } from "../controllers/userController.js";
import { validateRefreshToken } from "../middlewares/doJwtAuth.js";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";
import express from "express";

export const userRouter = express
  .Router()
  .get("/", UserController.getAllUsersCtrl)
  .get("/:userId", UserController.getOneUserCtrl)
  .post("/login", UserController.postLoginUserCtrl)
  .post("/register", UserController.postRegisterUserCtrl)
  .get("/verifyEmail/:id", UserController.postVerifyEmailUserCtrl)
  .patch("/:userId", doJWTAuth, UserController.updateUserCtrl)
  .delete("/:userId", doJWTAuth, UserController.deleteUserCtrl)
  .post(
    "/refresh-token",
    validateRefreshToken,
    UserController.postRefreshAccessTokenCtrl
  )
  .post("/logout", doJWTAuth, UserController.postLogoutUserCtrl);
