import { NextResponse } from "next/server";
import { db } from "@/db";
import { v2 as cloudinary } from "cloudinary";
import { ImageFile } from "@/app/types/images";

cloudinary.config({
  api_key: process.env.CLOUD_API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const POST = async (request: Request) => {
  const data = await request.formData();

  const image = data.get("file") as File;

  if (!image)
    return NextResponse.json("No se ha subido ninguna image", { status: 400 });

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const res = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
      .end(buffer);
  });

  const { url, width, height, asset_id }: ImageFile = res as ImageFile;

  if (asset_id) {
    const res = await db.imagesConfiguration.create({
      data: {
        id: asset_id,
        width: width || 500,
        heigth: height || 500,
        imageUrl: url,
      },
    });
    return NextResponse.json({ configId: res.id });
  } /* else {
    const res = await db.imagesConfiguration.update({
      where: {
        id: asset_id,
      },
      data: {
        croppedImageUrl: url,
      },
    });
    return NextResponse.json({ configId: res.id });
  } */

  return NextResponse.json({ configId: asset_id });
};
