import { User } from "../models/user.js";

export function showAllUsers() {
    return User.find({});
}
