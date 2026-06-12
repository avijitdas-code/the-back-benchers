import { connectDB } from "@/lib/dbConnect";
import Material from "@/models/Material";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request) {
  try {
    await connectDB();

    const formData   = await request.formData();
    const file       = formData.get("file");
    const title      = formData.get("title");
    const subject    = formData.get("subject");
    const semester   = formData.get("semester");
    const department = formData.get("department");
    const type       = formData.get("type");
    const year       = formData.get("year");

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { fileId, viewLink, downloadLink } = await uploadToCloudinary(
      buffer,
      file.name
    );

    const material = await Material.create({
      title, subject,
      semester: Number(semester),
      department, type, year,
      driveFileId:       fileId,
      driveViewLink:     viewLink,
      driveDownloadLink: downloadLink,
    });

    return NextResponse.json({ success: true, material }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}