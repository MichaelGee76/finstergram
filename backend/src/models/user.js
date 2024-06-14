import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        userName: { type: String, required: true, trim: true },
        profilePicture: {
            type: String,
            default:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png",
        },
        password: { type: String, required: true },
        userBio: {
            type: String,
            default: "Hello, I'm new on Finsta",
            trim: true,
        },
        email: { type: String, required: true, trim: true },
        isEmailVerified: { type: Boolean, default: false },
    },
    { collection: "users", timestamps: true }
);

export const User = mongoose.model("User", userSchema);
