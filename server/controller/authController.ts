import dotenv from "dotenv";
dotenv.config();
import * as jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../model/userAccount"

export const loginUser = async (req: any, res: any) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const validatePassword = await bcrypt.compare(password, foundUser.password);

        if (!validatePassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const token = jwt.sign({ id: foundUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({token});

    } catch (err) {
        res.status(500).json({ message: "An error occurred during login" });
    }
};

export const signUser = async (req: any, res: any)=> {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const email: string = req.body.email;
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;

    try {
        const findExistingUser = await User.findOne( {username} )
        if (findExistingUser) {
            return res.status(403).json({err: "User Already Exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName, lastName, username, email, password: hashedPassword})

        await newUser.save();
        res.status(201).json({success: "Created User"})

    } catch (err: any) {
        res.status(500).json({err: "Failed to create user: " + err})
    }
}


export const isAuthenticated = (req:any, res:any) => {
    if (req.user) {
        res.json({ message: 'Authenticated', user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
};


export const profileUser = async (req: any, res: any) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json(user);
    } catch (err:any) {
        res.status(500).json({ error: "Failed to retrieve user's profile: " + err.message });
    }
};
