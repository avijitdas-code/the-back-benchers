import { connectDB } from "@/lib/dbConnect";
import Material from "@/models/Material";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const semester   = searchParams.get("semester");
    const type       = searchParams.get("type");

    const filter = {};
    if (department) filter.department = department;
    if (semester)   filter.semester   = Number(semester);
    if (type)        filter.type      = type;

    const materials = await Material.find(filter).sort({ uploadedAt: -1 });
    return NextResponse.json(materials);
  } catch (error) {
    console.error("GET /api/materials error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();

    const material = await Material.findById(id);
    if (!material) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    try {
      await deleteFromCloudinary(material.driveFileId);
    } catch (cloudErr) {
      // Don't let a Cloudinary hiccup block cleaning up the database record.
      console.error("Cloudinary delete failed:", cloudErr);
    }

    await Material.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/materials error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
