import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const createToken = (user, tokenType = "access") => {
  const issuedAtSeconds = Math.ceil(Date.now() / 1000);
  const tokenPayload = {
    sub: user._id,
    type: tokenType,
    iat: issuedAtSeconds,
  };

  // const expiresIn = tokenType === "refresh" ? "2w" : "10min";
  const expiresIn =
    {
      access: "8h",
      refresh: "2w",
    }[tokenType] || "10min";
  // Die eckigen Klammern sind die dynamische Schreibweise um auf einen bestimmten Key des Objektes zuzugreifen
  const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn });
  return token;
};
