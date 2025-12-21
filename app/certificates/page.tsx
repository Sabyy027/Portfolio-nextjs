'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Certificates } from '@/components/Certificates';
import { Contact } from '@/components/Contact';
import { api } from '@/lib/storage';
import { UserProfile, INITIAL_PROFILE } from '@/types';

export default function CertificatesPage() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  useEffect(() => {
    const fetchProfile = async () => {
      setProfile(await api.getProfile());
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar toggleTheme={() => {}} isDark={true} />
      <div className="pt-32">
        <Certificates />
      </div>
      <Contact profile={profile} />
      
      <footer className="py-12 text-center text-zinc-600 text-sm border-t border-zinc-900 bg-zinc-950">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
