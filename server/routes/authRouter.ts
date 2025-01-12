import express from 'express';
import { loginUser, signUser , isAuthenticated } from '../controller/authController';

const router = express.Router();

router.post('/loginUser', loginUser);
router.post('/signUser', signUser);
