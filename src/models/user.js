import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
        },
        company: {
            type: Number,
            ref: 'companies',
        },
        roles: {
            type: Array,
            default: ['user'],
        },
        isBlock: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
