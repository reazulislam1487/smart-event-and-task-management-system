import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedUser || !decodedUser.email) {
      return res.status(401).send({ error: "Unauthorized access" });
    }
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(403).send({ error: "Forbidden access" });
  }
};
export default verifyToken;
