import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        company: {
            type: Number,
            ref: 'companies',
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model('users', userSchema);
