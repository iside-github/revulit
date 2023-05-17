import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
    {
        file_name: {
            type: String,
            required: true,
        },
        file_src: {
            type: String,
            required: true,
        },
        html: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            ref: 'users',
        },
        company: {
            type: String,
            ref: 'companies',
        },
        categories: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Reports =
    mongoose.models.reports || mongoose.model('reports', reportSchema);
export default Reports;
