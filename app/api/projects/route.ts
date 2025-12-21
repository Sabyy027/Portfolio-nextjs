import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
  await dbConnect();
  try {
    let projects = await Project.find({}).sort({ createdAt: -1 });
    
    // if (projects.length === 0) { ... } Removed auto-seeding

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create Project Error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 400 });
  }
}
