import connectMongoDb from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { size, name, amount, quality, image } = await request.json();
        await connectMongoDb();
        
        // Ensure image is a string URL or use default
        const productData = { 
            size, 
            name, 
            amount, 
            quality,
            image: typeof image === 'string' ? image : "https://picsum.photos/300/200"
        };
        
        const product = await Product.create(productData);
        return NextResponse.json({ message: "Product Created", product }, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { message: "Error creating product", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectMongoDb();
        const products = await Product.find().lean();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { message: "Error fetching products", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        await connectMongoDb();
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Product Deleted", product: deletedProduct },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { message: "Error deleting product", error: error.message },
            { status: 500 }
        );
    }
}
