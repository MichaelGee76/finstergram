import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        followedId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { collection: "followment", timestamps: true }
);

export const Follow = mongoose.model("Follow", followSchema);
