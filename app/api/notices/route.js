import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import Notice from '@/models/Notice';

export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find().sort({ pinned: -1, createdAt: -1 });
    return NextResponse.json(notices);
  } catch (error) {
    console.error('GET /api/notices error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const notice = await Notice.create(body);
    return NextResponse.json(notice);
  } catch (error) {
    console.error('POST /api/notices error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Notice.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/notices error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
