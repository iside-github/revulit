import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
    {
        file_name: {//excel file name
            type: String,
            required: true,
        },
        file_src: {// excel file saved directory
            type: String,
            required: true,
        },
        html: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        company: {
            type: mongoose.Types.ObjectId,
            ref: 'companies',
            required: true,
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
