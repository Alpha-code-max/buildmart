import { connectToDatabase } from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    try {
        const {id} = params;
        const {newName: name, newQuality: quality, newSize: size, newAmount: amount, newImage: image} = await request.json();
        const { db } = await connectToDatabase();
        
        if (!db) {
            return NextResponse.json(
                { message: "Database connection not available" },
                { status: 503 }
            );
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            amount,
            size,
            quality,
            image
        });
        
        if (!updatedProduct) {
            return NextResponse.json({message: "Product is not found"}, {status: 404});
        }
        
        return NextResponse.json({message: "Product Updated"}, {status: 200});
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { message: "Error updating product", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request, {params}) {
    try {
        const {id} = params;
        const { db } = await connectToDatabase();
        
        if (!db) {
            return NextResponse.json(
                { message: "Database connection not available" },
                { status: 503 }
            );
        }
        
        const product = await Product.findById(id);
        
        if (!product) {
            return NextResponse.json({message: "Product not found"}, {status: 404});
        }
        
        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { message: "Error fetching product", error: error.message },
            { status: 500 }
        );
    }
}