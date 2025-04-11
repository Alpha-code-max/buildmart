import connectMongoDb from "@/libs/mongodb";
import Product from "@/models/price";
import { NextResponse } from "next/server";


export async function PUT(request, {params}) {
    const {id} = await params;
    const {newName: name, newQuality: quality, newSize: size, newAmount: amount} = await request.json();
    await connectMongoDb();
    const updatedProduct = await Product.findByIdAndUpdate(id,{
        name,
        amount,
        size,
        quality
 
    });
    if (!updatedProduct) {
            return NextResponse.json({message: "Product is not found"}, {status: 201})
        } else {
            return NextResponse.json({message: "Product Updated"}, {status: 201})
        }
}

export async function GET(request, {params}) {
    const {id} = await params;
    await connectMongoDb();
    const product = await Product.findById(id)
    return NextResponse.json(product)
}