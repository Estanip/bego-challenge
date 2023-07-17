import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/User';
import { comparePassword, encrytp } from '../utils/bycript';
import { generateToken } from '../utils/jwt';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Cannot be empty"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please insert a valid email format'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Cannot be empty"],
        minlength: [8, 'Password must be have at least 8 characters'],
    }
});

UserSchema.pre<IUser>("save", async function (next: any) {
    if (!this.isModified('password')) next();

    const encrytpedPassword = await encrytp(this.password);
    this.password = encrytpedPassword;
    next();
});

UserSchema.methods.validatePassword = async function (password: string) { return await comparePassword(password, this.password) };

UserSchema.methods.generateToken = async function () { return await generateToken(this._id) };

export default model<IUser>("User", UserSchema);