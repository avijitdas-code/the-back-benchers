import { connectDB } from "@/lib/dbConnect";
import Material from "@/models/Material";
import { NextResponse } from "next/server";

// GET /api/materials?semester=3&type=pyq&department=CSE&subject=DSA
export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const filter = {};

  if (searchParams.get("semester"))   filter.semester   = searchParams.get("semester");
  if (searchParams.get("type"))       filter.type       = searchParams.get("type");
  if (searchParams.get("department")) filter.department = searchParams.get("department");
  
  // Added subject filter
  if (searchParams.get("subject"))    filter.subject    = searchParams.get("subject");

  const materials = await Material.find(filter).sort({ uploadedAt: -1 });
  return NextResponse.json(materials);
}

// POST /api/materials (for adding new materials later)
export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const material = await Material.create(body);
  return NextResponse.json(material, { status: 201 });
}