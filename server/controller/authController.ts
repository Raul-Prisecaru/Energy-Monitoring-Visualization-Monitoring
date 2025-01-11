import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../model/userAccount"

export const loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const foundUser = await User.findOne({ username })

        const validatePassword = await bcry

    } catch (err) {
        res.status(500).json({err: "An Error occurred during login"})
    }
};
