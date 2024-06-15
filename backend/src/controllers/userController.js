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

const postVerifyEmailUserCtrl = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const result = await UserService.verifyEmailUser(userId);
    if (!result) {
        res.status(500).json("Could not verify user");
    }
    res.status(200).json({ result });
});

export const UserController = {
    postRegisterUserCtrl,
    postVerifyEmailUserCtrl,
};
