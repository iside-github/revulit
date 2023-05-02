import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: [true, 'Email already in use'],
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
        },
        company: {
            type: String,
            ref: 'companies',
            required: [true, 'Company is required'],
        },
        roles: {
            type: Array,
            default: ['user'],
        },
        isBlock: {
            type: Boolean,
            default: false,
        },
        security_update: {
            type: Boolean,
            default: true,
        },
        news_message: {
            type: Boolean,
            default: true,
        },
        avatar: {
            type: String,
            default: 'https://picsum.photos/200',
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
