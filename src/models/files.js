import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
    {
        src: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        user: {
            type: Number,
            ref: 'users',
        },
    },
    {
        timestamps: true,
    }
);

const Files = mongoose.models.users || mongoose.model('files', fileSchema);
export default Files;
