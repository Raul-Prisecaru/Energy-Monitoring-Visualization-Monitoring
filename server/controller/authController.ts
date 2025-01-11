import jwt from "jsonwebtoken"
import User from "../model/userAccount"

export const loginUser = async (req, res) => {
    try {


    } catch (err) {
        res.status(500).json({err: "An Error occurred during login"})
    }
};
