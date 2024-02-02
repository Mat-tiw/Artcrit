import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const allUser = async (req, res) => {
  try {
    const data = await User.findAll();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const findUser = async (req, res) =>{
  try {
    const id = req.params.id;
    const data = await User.findOne({
      where :{
        id_user:id
      }
    })
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
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
  const { user, pwd} = req.body;
  const user_name = user;
  const user_password = pwd;
  try {
    const user = await User.findOne({ where: { user_name } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id_user }, "a-secret-key", {
      expiresIn: "1h",
    });
    const userId = user.id_user;
    const userName = user.user_name;
    const userPic = user.user_avatar;
    res.json({ token,userId,userName,userPic });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};