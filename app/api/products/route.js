import connectMongoDb from "@/libs/mongodb";
import Product from "@/models/price";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {size, name, amount, quality} = await request.json()
    await connectMongoDb()
    await Product.create({size, name, amount, quality})
    return NextResponse.json({message: "Product Created"}, {status: 201})
}

export async function GET() {
    await connectMongoDb()
    const product = await Product.find()
    return NextResponse.json(product)
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id')
    await connectMongoDb();
    const searchedProduct = await Product.findByIdAndDelete(id)
    if (!searchedProduct) {
        return NextResponse.json({message: "Product is not found"}, {status: 201})
    } else {
        return NextResponse.json({message: "Product Deleted"}, {status: 201})
    }
}