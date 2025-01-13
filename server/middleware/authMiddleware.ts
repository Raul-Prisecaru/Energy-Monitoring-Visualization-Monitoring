import dotenv from "dotenv";
dotenv.config();
import * as jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader: string = req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token: string = authHeader.split(' ')[1];

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'Server configuration error' });
        }

        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid Token | ' + error });
        }
    } else {
        res.status(401).json({ message: 'Access Denied' });
    }
};
