import express from "express";
import { allUser,addUser,loginUser } from "../controller/userController.js";
import {testFile,uploadPostImage,createPost,getAllPost} from "../controller/postController.js";

const router = express.Router();

router.get("/user", allUser);
router.post('/user/create',addUser);
router.post('/user/login',loginUser)
router.post('/post/create',uploadPostImage,createPost)
router.post('/post/test',testFile)
router.get('/post',getAllPost)

export default router;