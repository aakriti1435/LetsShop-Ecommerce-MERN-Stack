import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        categoryImage: {
            type: String,
        },
        parentId: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
