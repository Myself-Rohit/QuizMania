import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }

    const isUser = await User.findOne({ userName });
    if (isUser) {
      return res.status(400).json({ message: "Username already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      password: hashedPassword,
    });
    await newUser.save();
    const token = generateToken(res, newUser._id);
    res
      .cookie("access_token", token, { secure: true, httpOnly: true })
      .status(201)
      .json({ data: newUser, message: "Signup Successful!" });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password || "");
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(res, user._id);
    res
      .cookie("access_token", token, { secure: true, httpOnly: true })
      .status(200)
      .json({ data: user, message: "Signin Successful!" });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const logout = async () => {
  try {
    res.cookie("access_token", null, { expiresIn: Date.now() });
    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};
