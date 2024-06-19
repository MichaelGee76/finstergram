import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const _invalidAuth = (res, message) =>
  res.status(401).json({ message: message || "Invalid auth" });

export const doJWTAuth = async (req, res, next) => {
  if (!req.headers.authorization) return _invalidAuth(res);

  const [authType, tokenString] = req.headers.authorization.split(" ");
  if (authType !== "Bearer" || !tokenString) return _invalidAuth(res);

  const verifyToken = createTokenVerifier(req, res, next);
  verifyToken(tokenString, "access");
};

export const validateRefreshTokenInCookieSession = (req, res, next) => {
  if (!req.session.refreshToken) return _invalidAuth(res);
  const verifyToken = createTokenVerifier(req, res, next);
  verifyToken(req.session.refreshToken, "refresh");
};

const createTokenVerifier = (req, res, next) => {
  return function (token, expectType = "access") {
    try {
      const verifiedTokenClaims = jwt.verify(token, jwtSecret);

      if (verifiedTokenClaims.type !== expectType) return _invalidAuth(res);
      req.authenticatedUserId = verifiedTokenClaims.sub;
      next();
    } catch (err) {
      console.log(err);
      return _invalidAuth(res);
    }
  };
};
