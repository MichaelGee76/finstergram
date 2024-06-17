import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connect2DB } from "./utils/connect2DB.js";
import { userRouter } from "./routes/userRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { google } from "googleapis";
import dotenv from "dotenv";
import { commentRouter } from "./routes/commentRouter.js";

const PORT = process.env.PORT || 4420;

connect2DB();

const app = express();

app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
/////////// add parser for cookies
app.set("trust proxy", 1); // trust first proxy
const cookieSessionOptions = {
    name: "session",
    secret: cookieSessionSecret, // frei wählbar
    httpOnly: true,
    expires: new Date(Date.now() + twoWeeksInMs),
    sameSite: isFrontendLocalhost ? "lax" : "none",
    secure: isFrontendLocalhost ? false : true,
};
app.use(cookieSession(cookieSessionOptions));
app.use(morgan("dev"));
app.use(express.json());
//Wenn Express.js-Anwendung Formulardaten analysieren werden, die mit dem application/x-www-form-urlencoded MIME-Typ gesendet werden, dann ist diese Zeile notwendig. Andernfalls ist sie nicht erforderlich.
app.use(express.urlencoded({ extended: false }));
// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});
