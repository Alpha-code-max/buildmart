import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    size: {
        type: String,
        required: true,
        enum: ['Small', 'Medium', 'Large'],
        trim: true
    },
    quality: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: "https://picsum.photos/300/200", // Using picsum.photos as a reliable placeholder service
        validate: {
            validator: function(v) {
                return !v || v.trim().length > 0;
            },
            message: 'If provided, the image URL must not be empty.'
        }
    }
}, {
    timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;