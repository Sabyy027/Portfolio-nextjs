import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import LearningNode from '@/models/LearningNode';

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, context: { params: Params }) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const body = await request.json();
    const node = await LearningNode.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!node) return NextResponse.json({ error: 'Node not found' }, { status: 404 });
    return NextResponse.json(node);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update node' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const node = await LearningNode.findByIdAndDelete(id);
    if (!node) return NextResponse.json({ error: 'Node not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete node' }, { status: 500 });
  }
}
