import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Certification from '@/models/Certification';

export async function GET() {
  await dbConnect();
  try {
    const certs = await Certification.find({}).sort({ order: 1 });
    return NextResponse.json(certs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const cert = await Certification.create(body);
    return NextResponse.json(cert, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 400 });
  }
}
