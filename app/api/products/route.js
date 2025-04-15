import { connectToDatabase } from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

// Add CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
    try {
        const { size, name, amount, quality, image } = await request.json();
        console.log('Received product data:', { size, name, amount, quality, image });
        
        const { db } = await connectToDatabase();
        
        if (!db) {
            return NextResponse.json(
                { message: "Database connection not available" },
                { status: 503 }
            );
        }
        
        // Ensure image is a valid URL or use default
        const productData = { 
            size, 
            name, 
            amount: parseFloat(amount), 
            quality,
            image: image && typeof image === 'string' && image.trim() !== '' 
                ? image.trim() 
                : "https://picsum.photos/300/200"
        };
        
        console.log('Creating product with data:', productData);
        
        const product = await Product.create(productData);
        console.log('Created product:', product);
        
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
        console.log('Checking MongoDB connection...');
        
        if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI is missing');
            return NextResponse.json(
                { 
                    message: "Database configuration error",
                    error: "MONGODB_URI environment variable is missing"
                },
                { 
                    status: 500,
                    headers: corsHeaders
                }
            );
        }

        // Check if we're already connected
        if (mongoose.connection.readyState === 1) {
            console.log('Already connected to MongoDB');
        } else {
            console.log('Connecting to MongoDB...');
            const { db, client } = await connectToDatabase();
            if (!db || !client) {
                throw new Error('Failed to establish database connection');
            }
        }

        console.log('Fetching products...');
        const products = await Product.find().lean().maxTimeMS(5000);
        console.log('Raw products from database:', JSON.stringify(products, null, 2));
        
        // Ensure each product has an image
        const productsWithImages = products.map(product => ({
            ...product,
            image: product.image || "https://picsum.photos/300/200"
        }));
        
        console.log('Processed products with images:', JSON.stringify(productsWithImages, null, 2));
        
        return NextResponse.json(productsWithImages, { headers: corsHeaders });
    } catch (error) {
        console.error('Error in GET /api/products:', error);
        console.error('Error stack:', error.stack);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            code: error.code
        });
        
        // Handle specific MongoDB errors
        let status = 500;
        let errorMessage = error.message;
        
        if (error.name === 'MongooseError') {
            if (error.message.includes('timed out')) {
                status = 504; // Gateway Timeout
                errorMessage = 'Database operation timed out';
            } else if (error.message.includes('connection')) {
                status = 503; // Service Unavailable
                errorMessage = 'Database connection error';
            }
        }
        
        return NextResponse.json(
            { 
                message: "Error fetching products", 
                error: errorMessage,
                details: {
                    name: error.name,
                    code: error.code,
                    type: error.name === 'MongooseError' ? 'Database Error' : 'Server Error'
                }
            },
            { 
                status,
                headers: corsHeaders
            }
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
