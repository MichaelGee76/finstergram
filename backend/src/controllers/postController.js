import { PostServices } from "../services";
import { getAllpostsCtrl } from "../controllers/postController.js";
import asyncHandler from "express-async-handler";

const getAllpostsCtrl = asyncHandler(async (req, res) => {
    const result = await PostServices.getAllPosts();
    if (!result) {
        res.status(500).json("Could not get all posts");
    }
    res.status(200).json({ result });
});

export const PostController = {
    getAllpostsCtrl,
};
