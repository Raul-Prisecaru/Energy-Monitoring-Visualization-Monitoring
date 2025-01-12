import * as jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const verified: any = jwt.verify(token, "test");
            req.user = verified;
            next();
        } catch (error) {
            console.error("Error verifying token: ", error);
            res.status(400).json({ message: 'Invalid Token' });
        }
    } else {
        res.status(401).json({ message: 'Access Denied' });
    }
};
