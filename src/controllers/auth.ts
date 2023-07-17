import { Request, Response } from 'express';
import { IUser } from '../interfaces/User';
import User from '../models/user';


export class AuthController {
    
    public async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user: IUser = await User.findOne({ email }).exec();

            if (user) return res.status(404).send({ success: false, message: 'User already exists' });

            const newUser: IUser = new User({
                email,
                password
            });

            await newUser.save();

            return res.status(200).send({
                success: true,
                message: 'User register successfully'
            })

        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) return res.status(404).send({ success: false, message: 'Invalid data' });

            const user: IUser = await User.findOne({ email }).exec();

            if (!user) return res.status(404).send({ success: false, message: 'User does not exists' });

            if (user) {
                const validatePassword: boolean = await user.validatePassword(password);

                if (!validatePassword) return res.status(404).send({ success: false, message: 'Incorrect password' });
                else if (validatePassword) {
                    const token = await user.generateToken();

                    return res.status(200).send({ success: true, message: 'Login successfully', token })
                }
            }

        } catch (error) {
            return res.status(500).send({ success: false, message: error?.message });
        }
    };

};