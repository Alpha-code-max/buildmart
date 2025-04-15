import { connectToDatabase } from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { size, name, amount, quality, image } = await request.json();
        const { db } = await connectToDatabase();
        
        if (!db) {
            return NextResponse.json(
                { message: "Database connection not available" },
                { status: 503 }
            );
        }
        
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
        console.log('Attempting to connect to database...');
        const { db } = await connectToDatabase();
        
        if (!db) {
            console.error('Database connection failed');
            return NextResponse.json(
                { message: "Database connection not available" },
                { status: 503 }
            );
        }
        
        console.log('Database connected, fetching products...');
        const products = await Product.find().lean();
        console.log(`Found ${products.length} products`);
        
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error in GET /api/products:', error);
        return NextResponse.json(
            { 
                message: "Error fetching products", 
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
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

        const { db } = await connectToDatabase();
        
        if (!db) {
            return NextResponse.json(
                { message: "Database connection not available" },
                { status: 503 }
            );
        }
        
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
