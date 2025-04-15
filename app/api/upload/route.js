import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert the file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Upload to Cloudinary using fetch
        const uploadData = new FormData();
        uploadData.append('file', dataUrl);
        uploadData.append('upload_preset', 'shopcrud'); // You'll need to create this in your Cloudinary account

        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: uploadData,
            }
        );

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload to Cloudinary');
        }

        const { secure_url } = await uploadResponse.json();
        return NextResponse.json({ url: secure_url });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
} 