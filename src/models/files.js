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
            type: String,
            ref: 'users',
        },
    },
    {
        timestamps: true,
    }
);

const Files = mongoose.models.files || mongoose.model('files', fileSchema);
export default Files;
