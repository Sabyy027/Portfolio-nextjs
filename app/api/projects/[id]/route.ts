import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

type Params = Promise<{ id: string }>;

export async function PUT(
  request: Request,
  context: { params: Params }
) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const body = await request.json();
    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Params }
) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 400 });
  }
}
