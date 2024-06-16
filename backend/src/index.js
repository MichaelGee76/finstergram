import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connect2DB } from "./utils/connect2DB.js";
import { userRouter } from "./routes/userRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { google } from "googleapis";
import dotenv from "dotenv";

const PORT = process.env.PORT || 4420;

connect2DB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//Wenn Express.js-Anwendung Formulardaten analysieren werden, die mit dem application/x-www-form-urlencoded MIME-Typ gesendet werden, dann ist diese Zeile notwendig. Andernfalls ist sie nicht erforderlich.
app.use(express.urlencoded({ extended: false }));
// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
