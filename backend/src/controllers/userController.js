import { sendResponse } from "../helpers/sendResponse.js";
import { UserService } from "../services/index.js";
import asyncHandler from "express-async-handler";

const postRegisterUserCtrl = asyncHandler(async (req, res) => {
  const userInfo = req.body;
  // console.log("request body", req.body);

  const result = await UserService.registerUser(userInfo);
  if (!result) {
    res.status(500).json("Could not register user");
  }
  res.status(201).json({ result });
});

const postLoginUserCtrl = asyncHandler(async (req, res) => {
  const userInfo = {
    email: req.body.email,
    password: req.body.password,
  };

  const result = await UserService.loginUser(userInfo);
  if (result.tokens.refreshToken) {
    req.session.refreshToken = result.tokens.refreshToken; // refresh token in http only cookie session speichern
  }
  if (!result) {
    res.status(500).json("Could not login user");
  }
  res.status(200).json({ result });
});

const postVerifyEmailUserCtrl = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const result = await UserService.verifyEmailUser(userId);
  if (!result) {
    res.status(500).json("Could not verify user");
  }
  res.status(200).json({ result });
});

const getAllUsersCtrl = asyncHandler(async (req, res) => {
  const authenticatedUserId = req.authenticatedUserId;
  const result = await UserService.showAllUsers(authenticatedUserId);
  if (!result) {
    res.status(500).json("Could not get all user");
  }
  res.status(200).json({ result });
});

const getOneUserCtrl = asyncHandler(async (req, res) => {
  const authenticatedUserId = req.authenticatedUserId;
  const userId = req.params.userId;
  const result = await UserService.showOneUser(userId, authenticatedUserId);
  if (!result) {
    res.status(500).json("Could not get all user");
  }
  res.status(200).json({ result });
});

const postRefreshAccessTokenCtrl = asyncHandler(async (req, res) => {
  const authenticatedUserId = req.authenticatedUserId;
  const result = await UserService.refreshAccessToken(authenticatedUserId);
  if (!result) {
    res.status(500).json("Could not get refreshAccessToken");
  }
  res.status(200).json({ result });
});

const updateUserCtrl = asyncHandler(async (req, res) => {
  const authenticatedUserId = req.authenticatedUserId;
  const updatedData = req.body;

  const result = await UserService.updateUser(authenticatedUserId, updatedData);
  if (!result) {
    res.status(500).json("Could not update user ");
  }
  res.status(200).json({ result });
});

const deleteUserCtrl = asyncHandler(async (req, res) => {
  // const authenticatedUserId = req.authenticatedUserId;
  const userId = req.params.userId;
  const result = await UserService.deleteUser(userId);

  if (!result) {
    res.status(500).json("Could not delete user ");
  }
  res.status(200).json({ result });
});

//*brauchen hier unten keinen service extra schreiben, du seckel!!!!!!

const postLogoutUserCtrl = asyncHandler(async (req, res) => {
  req.session.refreshToken = null;
  const result = "You are now logged out";
  sendResponse(res, result);
});

const getResendVerifyEmailCtrl = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const result = await UserService.resendVerifyEmail(userId);
  if (!result) {
    res.status(500).json("Could not send email");
  }
  res.status(200).json({ result });
});

export const UserController = {
  postRegisterUserCtrl,
  postVerifyEmailUserCtrl,
  getAllUsersCtrl,
  getOneUserCtrl,
  postRefreshAccessTokenCtrl,
  updateUserCtrl,
  postLoginUserCtrl,
  deleteUserCtrl,
  postLogoutUserCtrl,
  getResendVerifyEmailCtrl,
};
