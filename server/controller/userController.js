import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";
import crypto from "crypto";
import multer from "multer";
import Post from "../model/Post.js";
import Comment from "../model/Comment.js";

function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}
const __filename = fileURLToPath(import.meta.url);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath =
      "D:/Desktop/artcrit-alpha/artcrit-early/server/public/userpf";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const randomString = generateRandomString(5);
    cb(null, `${randomString}${file.originalname}`);
  },
});

const upload = multer({ storage });

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { editUserName, editBio } = req.body;
  const selectedFile = req.file;
  let user_name = editUserName;
  let user_bio = editBio;
  try {
    if (selectedFile === null || selectedFile === undefined) {
      const user = await User.update(
        { user_name: user_name, user_bio: user_bio },
        {
          where: {
            id_user: userId,
          },
        }
      );
    } else {
      const user = await User.update(
        {
          user_name: user_name,
          user_bio: user_bio,
          user_avatar: `http://localhost:3030/static/userpf/${selectedFile.filename}`,
        },
        {
          where: {
            id_user: userId,
          },
        }
      );
    }
    const userData = await User.findOne({
      where: { id_user: userId },
      attributes: ["user_avatar"],
    });
    return res
      .status(200)
      .json({ message: "update done", user_avatar: userData });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const updateUserAvatar = upload.single("selectedFile");

export const allUser = async (req, res) => {
  try {
    const data = await User.findAll();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const findUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({
      where: {
        id_user: id,
      },
    });
    res.json(data);
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

    let userCheck = await User.findOne({where:{user_email}})
    if(userCheck)return res.status(401).json({error:true})
    
    const newUser = await User.create({
      user_name,
      user_password,
      user_email,
      user_avatar,
    });

    res.status(201).json({newUser,error:false});
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const loginUser = async (req, res) => {
  const { email, pwd } = req.body;
  const user_email = email;
  const user_password = pwd;
  try {
    const user = await User.findOne({ where: { user_email } });

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
    res.json({ token, userId, userName, userPic });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const calculateUserPoint = async (userId) => {
  try {
    console.log(userId)
    const postPoint = await Post.sum("total_like", {
      where: { user_id: userId },
    });
    const commentPoints = await Comment.sum("vote_points", {
      where: {
        user_id: userId,
      },
    });
    const total = postPoint + commentPoints;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.user_points = total;
    await user.save();
    return total;
  } catch (error) {
    throw new Error("Failed to calculate user points: " + error.message);
  }
};
export const deleteUser = async (req,res)=>{
  try {
    const id = req.params.id
    const user = await User.findByPk(id)
    await user.destroy();
    return res.status(200)
  } catch (error) {
    return res.json(error)
  }
}