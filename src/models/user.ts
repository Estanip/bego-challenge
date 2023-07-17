import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/User';

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

export default model<IUser>("User", UserSchema);