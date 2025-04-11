import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        quality: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product;