import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        messagedId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: { type: String, required: true, trim: true },
    },
    { collection: "message", timestamps: true }
);
export const Message = mongoose.model("Message", messageSchema);
