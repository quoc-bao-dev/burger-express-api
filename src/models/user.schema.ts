import { model, Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    phone: string;
    address: string;
    avatar?: string;
    email: string;
    hashPassword: string;
    oauthProvider?: string;
    rewardPoints?: number;
    role: 'user' | 'staff' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
    {
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        avatar: { type: String },
        email: { type: String, required: true, unique: true },
        hashPassword: { type: String, required: true },
        oauthProvider: { type: String },
        rewardPoints: { type: Number, default: 0 },
        role: {
            type: String,
            enum: ['user', 'staff', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true }
);

export default model('User', userSchema);
