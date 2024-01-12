import User from "../model/User.js";
import bcrypt from "bcrypt";
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
    const user_avatar = "/upload/avatar/defAvatar.jpg"
    const { user, pwd, email } = req.body;
    const user_name = user
    const user_email = email
    let user_password = await bcrypt.hash(pwd,13)
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
