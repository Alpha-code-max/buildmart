import connectMongoDb from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = await params;
    const {newName: name, newQuality: quality, newSize: size, newAmount: amount, newImage: image} = await request.json();
    await connectMongoDb();
    const updatedProduct = await Product.findByIdAndUpdate(id,{
        name,
        amount,
        size,
        quality,
        image
    });
    if (!updatedProduct) {
        return NextResponse.json({message: "Product is not found"}, {status: 404})
    } else {
        return NextResponse.json({message: "Product Updated"}, {status: 200})
    }
}

export async function GET(request, {params}) {
    const {id} = await params;
    await connectMongoDb();
    const product = await Product.findById(id)
    return NextResponse.json(product)
}