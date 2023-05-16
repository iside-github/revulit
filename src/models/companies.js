import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        uid: { type: Number },
    },
    {
        timestamps: true,
    }
);

const Company =
    mongoose.models.companies || mongoose.model('companies', companySchema);
export default Company;
