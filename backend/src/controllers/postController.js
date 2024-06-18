import { PostServices } from "../services/index.js";
import { sendResponse } from "../helpers/userToView.js";

import asyncHandler from "express-async-handler";

const getUserPostsCtrl = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const result = await PostServices.getUserPosts(userId);
    if (!result) {
        res.status(500).json("Could not get all posts");
    }
    sendResponse(res, result);
});

const getUserFeedCtrl = asyncHandler(async (req, res) => {
    const authenticatedUserId = req.authenticatedUserId;
    const result = await PostServices.getUserFeed(authenticatedUserId);
    if (!result) {
        res.status(500).json("Could not get userFeed");
    }
    sendResponse(res, result);
});

const postNewPostCtrl = asyncHandler(async (req, res) => {
    const authenticatedUserId = req.authenticatedUserId;
    const { location, picture, description, hashtags } = req.body;

    const result = await PostServices.postNewPost(
        authenticatedUserId,
        location,
        picture,
        description,
        hashtags
    );
    if (!result) {
        res.status(500).json({ message: "Could not create post" });
    }
    sendResponse(res, result);
});

const updatePostCtrl = asyncHandler(async (req, res) => {
    const authenticatedUserId = req.authenticatedUserId;
    const contentToUpdate = req.body;
    const postId = req.params.postId;
    const result = await PostServices.updatePost(
        authenticatedUserId,
        contentToUpdate,
        postId
    );
    if (!result) {
        res.status(500).json({ message: "Could not update post" });
    }
    sendResponse(res, result);
});

const deletePostCtrl = asyncHandler(async (req, res) => {
    const authenticatedUserId = req.authenticatedUserId;
    const postId = req.params.postId;

    const result = await PostServices.deletePost(authenticatedUserId, postId);

    if (!result) {
        res.status(500).json("Could not delete post ");
    }
    sendResponse(res, result);
});

const getAllPostsWithHashtagsCtrl = asyncHandler(async (req, res) => {
    // brauchen wir eigentlich nicht schützen, oder?
    // const authenticatedUserId = req.authenticatedUserId;
    const hashtag = req.params.hashtag;

    const result = await PostServices.getAllPostsWithHashtags(
        // authenticatedUserId
        hashtag
    );

    if (!result) {
        res.status(500).json("Could find what you are looking for");
    }
    sendResponse(res, result);
});

const getAllHashtagsCtrl = asyncHandler(async (req, res) => {
    const result = await PostServices.getHashtag();

    if (!result) {
        res.status(500).json("Could not get hashtag ");
    }
    sendResponse(res, result);
});

export const PostController = {
    getUserPostsCtrl,
    getUserFeedCtrl,
    postNewPostCtrl,
    updatePostCtrl,
    deletePostCtrl,
    getAllPostsWithHashtagsCtrl,
    getAllHashtagsCtrl,
};
