import jwt from "jsonwebtoken";

/**
 * @DESC Verify JWT from authentication header Middleware
 */
export const checkAuth = (req, res, next) => {
  req.user = null;
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.apiError("missing authorization token", 400);
  }
  // Bearer token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    // console.log("verifying");
    if (err) return res.apiError("Invalid token", 403); //invalid token
    req.user = decoded; //for correct token
    next();
  });
};
