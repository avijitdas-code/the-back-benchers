import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import Notice from '@/models/Notice';

export async function GET() {
  await connectDB();
  const notices = await Notice.find().sort({ pinned: -1, createdAt: -1 });
  return NextResponse.json(notices);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const notice = await Notice.create(body);
  return NextResponse.json(notice);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Notice.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}