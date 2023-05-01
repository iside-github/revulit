import mongoose from 'mongoose';

const sessionsSchema = new mongoose.Schema(
    {
        ip_address: {
            type: String,
            required: true,
        },
        device: {
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

const Session =
    mongoose.models.sessions || mongoose.model('sessions', sessionsSchema);
export default Session;
