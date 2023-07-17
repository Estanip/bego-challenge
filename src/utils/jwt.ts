import * as jwt from 'jsonwebtoken';

async function generateToken(userId) {
    try {
        return jwt.sign({ user_id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    } catch (error) {
        console.log(error);
    }
};

export { generateToken };