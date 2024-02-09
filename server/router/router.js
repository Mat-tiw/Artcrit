import express from "express";
import { allUser,addUser,loginUser,findUser,updateUser,updateUserAvatar } from "../controller/userController.js";
import {testFile,uploadPostImage,createPost,getAllPost,getPost,getUserPost} from "../controller/postController.js";
import { getAllUserImage } from "../controller/imageController.js";
import { addComment,uploadCommentArray } from "../controller/commentController.js";

const router = express.Router();

router.get("/user", allUser);
router.post('/user/create',addUser);
router.post('/user/login',loginUser)
router.get('/user/:id', findUser);
router.post('/user/update/:id', updateUserAvatar, updateUser);

router.post('/post/create',uploadPostImage,createPost);
router.post('/post/test',testFile);
router.get('/post',getAllPost);
router.get('/post/get/:id', getPost);
router.get('/post/user/:id',getUserPost);

router.get('/image/:id',getAllUserImage);

router.post('/comment/add/:id',uploadCommentArray,addComment);
export default router;