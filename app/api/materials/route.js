import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Material from "@/models/Material";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const department = searchParams.get("department");
    const semester = searchParams.get("semester");
    const subject = searchParams.get("subject");
    const resourceType = searchParams.get("resourceType");

    const query = {};

    if (department) query.department = department;
    if (semester) query.semester = semester;

    // ✅ FIX: Case-insensitive subject match
    if (subject) {
      query.subject = { $regex: `^${subject}$`, $options: "i" };
    }

    if (resourceType) query.resourceType = resourceType;

    const materials = await Material.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, materials });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}