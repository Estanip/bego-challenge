import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


async function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.access_token;       

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
                if (error) return res.status(400).send({ success: false, message: "Expired Token" });
                next();
            });
        } else {
            return res.status(400).send({ success: false, message: "Token validation error" });
        }
    } catch (error) {
        return res.status(500).send(error)
    }
};

export { validateToken };