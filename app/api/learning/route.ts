import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import LearningNode from '@/models/LearningNode';

export async function GET() {
  await dbConnect();
  try {
    const nodes = await LearningNode.find({}).sort({ startDate: -1 });
    return NextResponse.json(nodes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch learning nodes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const node = await LearningNode.create(body);
    return NextResponse.json(node, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create learning node' }, { status: 400 });
  }
}
