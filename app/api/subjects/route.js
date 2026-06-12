import { connectDB } from "@/lib/dbConnect";
import Subject from "@/models/Subject";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department");
  const semester   = searchParams.get("semester");

  const filter = {};
  if (department) filter.department = department.toUpperCase();
  if (semester)   filter.semester   = Number(semester);

  const subjects = await Subject.find(filter).sort({ name: 1 });
  return NextResponse.json(subjects);
}

export async function POST(request) {
  await connectDB();
  const body    = await request.json();
  const subject = await Subject.create(body);
  return NextResponse.json(subject, { status: 201 });
}