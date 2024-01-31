import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || "a-default-secret-key";
const tokenExpiry = process.env.JWT_EXPIRY || "1h";

export const allUser = async (req, res) => {
  try {
    const data = await User.findAll();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const user_avatar = "http://localhost:3030/static/def.jpg";
    const { user, pwd, email } = req.body;
    const user_name = user;
    const user_email = email;
    let user_password = await bcrypt.hash(pwd, 13);
    const newUser = await User.create({
      user_name,
      user_password,
      user_email,
      user_avatar,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { user: userName, pwd: userPassword } = req.body;
  try {
    const user = await User.findOne({ where: { user_name: userName } });

    if (!user || !(await bcrypt.compare(userPassword, user.user_password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { id_user: userId, user_name: userName, user_avatar: userPic } = user;
    const token = jwt.sign({ userId }, secretKey, { expiresIn: tokenExpiry });

    res.json({ token, userId, userName, userPic });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
