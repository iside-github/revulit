import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        category_title: { type: String, required: true },
        category_id: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Category =
    mongoose.models.categories || mongoose.model('categories', categorySchema);
export default Category;
