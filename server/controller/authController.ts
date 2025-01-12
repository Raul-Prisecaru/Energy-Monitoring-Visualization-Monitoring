import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../model/userAccount"

export const loginUser = async (req: any, res: any ) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const foundUser = await User.findOne({ username })

        if (!foundUser) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const validatePassword = await bcrypt.compare(password, foundUser.password)

        if (!validatePassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(foundUser.username, "test");

        res.json(token);

    } catch (err) {
        res.status(500).json({err: "An Error occurred during login"})
    }
};

export const signUser = async (req: any, res: any)=> {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const email: string = req.body.password;
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
