import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new Error("Unauthorized user...Please signin!");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;
    const user = await User.findOne({ _id });
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
export default verifyToken;
