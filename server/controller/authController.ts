import dotenv from "dotenv";
dotenv.config();
import * as jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../model/userAccount"

export const loginUser = async (req: any, res: any) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const foundUser: any = await User.findOne({ username });

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

        const token = jwt.sign({ id: foundUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: "10h" });

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

export const changePassword = async (req: any, res: any) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const findUser: any = await User.findById(req.user.id);

        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!currentPassword) {
            return res.status(400).json({ error: "Please Provide Your Password" });
        }

        if (!newPassword) {
            return res.status(400).json({ error: "Please Provide a New Password" });
        }

        const validatedPassword: boolean = await bcrypt.compare(currentPassword, findUser.password);

        if (!validatedPassword) {
            return res.status(401).json({ error: "Incorrect current password" });
        }

        await findUser.changePassword(newPassword);

        res.status(200).json({ success: "Successfully Changed Password" });
    } catch (err: any) {
        res.status(500).json({ error: "Failed to Reset Password: " + err.message });
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
