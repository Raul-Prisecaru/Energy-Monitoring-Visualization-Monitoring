import express from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import * as userController from "../controller/userController";

const router = express.Router();

// Router to get all users
router.get("/", userController.getAllUsers)

// Router to get one user
router.get("/:id", userController.getOneUser)

// Router to create user
router.post("/", userController.createUser)

// Router to update User, Takes ID Param
router.put("/:id", userController.updateUser)

router.patch("/",authMiddleware , userController.patchUser)

// Router to delete User, Takes ID Param
router.delete("/:id", userController.deleteUser)

// Export Router
export default router