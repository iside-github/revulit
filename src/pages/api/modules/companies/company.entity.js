import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const companySchema = new mongoose.Schema()(
    {
        name: { type: String, required: true },
        uid: { type: Number },
    },
    {
        timestamps: true,
    }
);

companySchema.plugin(AutoIncrement, {
    id: 'company_counter',
    inc_field: 'uid',
});

export const CompanyModel = mongoose.model('companies', companySchema);
