'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { LearningCurve } from '@/components/LearningCurve';
import { Certificates } from '@/components/Certificates';
import { Contact } from '@/components/Contact';
import { MaintenanceBanner } from '@/components/MaintenanceBanner';
import { api } from '@/lib/storage';
import { UserProfile, INITIAL_PROFILE } from '@/types';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await api.getProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <MaintenanceBanner />
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <Hero profile={profile} />
      <Skills />
      <Projects featuredOnly={true} />
      <LearningCurve />
      <Certificates />
      <Contact profile={profile} />

      <footer className="py-12 text-center text-zinc-600 text-sm border-t border-zinc-900 bg-zinc-950">
        <p>© {new Date().getFullYear()} {profile.name}. Made with Next.js</p>
      </footer>
    </div>
  );
}

