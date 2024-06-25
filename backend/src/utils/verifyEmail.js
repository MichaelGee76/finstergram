import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();

const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URL = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

// oAuthClient erstellen mit credentials
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendEmail = asyncHandler(async ({ to, subject, text }) => {
    const accessToken = await oAuth2Client.getAccessToken();
    console.log("test333");
    console.log(accessToken);

    if (!accessToken) {
        throw new Error("Could not get access token");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: GMAIL_ADDRESS,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            accessToken: accessToken.token,
        },
    });

    const sentMessageInfo = await transporter.sendMail({
        from: `"Finstagram Team" <${GMAIL_ADDRESS}>`,
        to,
        subject,
        text,
        html: text.replace(/\n/g, "<br/>"),
    });

    return sentMessageInfo.accepted.includes(to);
});
