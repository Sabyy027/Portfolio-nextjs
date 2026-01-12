'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Contact } from '@/components/Contact';
import { api } from '@/lib/storage';
import { UserProfile, INITIAL_PROFILE } from '@/types';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile();
        setProfile(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <Navbar toggleTheme={() => {}} isDark={true} />
      
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Details */}
          <div className="space-y-8 order-2 lg:order-1">
            {isLoading ? (
              <div className="space-y-6 animate-pulse">
                <div className="h-12 w-3/4 bg-zinc-900 rounded-lg"></div>
                <div className="h-2 w-20 bg-zinc-900 rounded-lg"></div>
                <div className="space-y-3">
                   <div className="h-4 w-full bg-zinc-900 rounded"></div>
                   <div className="h-4 w-full bg-zinc-900 rounded"></div>
                   <div className="h-4 w-2/3 bg-zinc-900 rounded"></div>
                </div>
                <div className="pt-4 flex gap-4">
                  <div className="h-10 w-40 bg-zinc-900 rounded-lg"></div>
                  <div className="h-10 w-32 bg-zinc-900 rounded-lg"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                    About Me
                  </h1>
                  <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                </div>

                <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                  <p>
                    Hello! I'm <span className="text-white font-semibold">{profile.name}</span>, a passionate 
                    <span className="text-indigo-400"> {profile.role}</span> based in India.
                  </p>
                  
                  <p>
                    {profile.about}
                  </p>

                  <p>
                    I thrive on turning complex problems into simple, beautiful, and intuitive designs. 
                    When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                    or gaming.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button onClick={() => window.open(profile.resumeLink, '_blank')}>
                    <Download size={18} className="mr-2" /> Download Resume
                  </Button>
                  <div className="flex gap-4 items-center px-4">
                    {profile.githubLink && (
                      <a href={profile.githubLink} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors hover:scale-110 transform duration-200">
                        <Github size={24} />
                      </a>
                    )}
                    {profile.linkedinLink && (
                      <a href={profile.linkedinLink} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors hover:scale-110 transform duration-200">
                        <Linkedin size={24} />
                      </a>
                    )}
                    <a href={`mailto:${profile.email}`} className="text-zinc-500 hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200">
                      <Mail size={24} />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {isLoading ? (
               <div className="w-72 h-72 md:w-96 md:h-96 rounded-2xl bg-zinc-900 animate-pulse border-2 border-zinc-800"></div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-900 shadow-2xl">
                   <img 
                     src={profile.profileImage || '/logo.jpeg'} 
                     alt={profile.name} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                </div>
              </div>
            )}
          </div>
          
        </div>
      </main>

      <Contact profile={profile} />
      
      <footer className="py-12 text-center text-zinc-600 text-sm border-t border-zinc-900 bg-zinc-950">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
