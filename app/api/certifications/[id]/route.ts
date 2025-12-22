import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Certification from '@/models/Certification';

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, context: { params: Params }) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const body = await request.json();
    console.log('Updating certification with data:', body);
    const cert = await Certification.findByIdAndUpdate(
      id, 
      body, 
      { new: true, runValidators: true, strict: false }
    );
    console.log('Updated certification:', cert);
    if (!cert) return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    return NextResponse.json(cert);
  } catch (error) {
    console.error('Certification update error:', error);
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const cert = await Certification.findByIdAndDelete(id);
    if (!cert) return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 });
  }
}
