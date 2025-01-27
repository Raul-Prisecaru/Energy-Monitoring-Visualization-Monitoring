import express from 'express';
import {loginUser, signUser, profileUser, changePassword} from '../controller/authController';
import {authMiddleware} from "../middleware/authMiddleware";
const router = express.Router();

router.post('/loginUser', loginUser);
router.post('/signUser', signUser);
router.post("/changePassword", authMiddleware, changePassword)

router.get("/profile", authMiddleware, profileUser)


export default router