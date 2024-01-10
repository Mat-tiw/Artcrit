import express from "express";
import { allUser,addUser } from "../controller/userController.js";

const router = express.Router();

router.get("/user", allUser);
router.post('/user/create',addUser);

export default router;
