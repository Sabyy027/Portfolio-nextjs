import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';

export async function GET() {
  await dbConnect();
  try {
    let profile = await Profile.findOne({});
    if (!profile) {
      // Return default if none exists yet
      return NextResponse.json({
        name: "Sabeer Anwer Meeran",
        role: "Full Stack Engineer",
        about: "Passionate developer building scalable web applications with modern technologies.",
        email: "sabeeranwermeeran@gmail.com",
        resumeLink: "https://sabeer-anwer-meeran-resume.tiiny.site/",
        githubLink: "https://github.com/Sabyy027",
        linkedinLink: "https://www.linkedin.com/in/sabeeranwermeeran/",
        profileImage: "/logo.jpeg",
        maintenanceMode: false
      });
    }
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    console.log('Received profile update:', body);
    let profile = await Profile.findOne({});
    if (profile) {
      // Use findByIdAndUpdate with runValidators to ensure schema is applied
      profile = await Profile.findByIdAndUpdate(
        profile._id, 
        body, 
        { new: true, runValidators: true, strict: false, upsert: true }
      );
      console.log('Profile updated result:', profile);
    } else {
      profile = await Profile.create(body);
      console.log('Profile created:', profile);
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 400 });
  }
}
