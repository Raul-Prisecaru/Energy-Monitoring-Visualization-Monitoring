import express from 'express';
import { loginUser, signUser, profileUser } from '../controller/authController';
import {authMiddleware} from "../middleware/authMiddleware";
const router = express.Router();

router.post('/loginUser', loginUser);
router.post('/signUser', signUser);

router.get("/profile", authMiddleware, profileUser)


export default router