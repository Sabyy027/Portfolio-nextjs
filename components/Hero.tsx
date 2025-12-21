'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '@/types';
import { NameAnimation } from './NameAnimation';
import { HeroHighlights } from './HeroHighlights';
import { Button } from './ui/Button';
import { Github, Linkedin, Mail, Download, MousePointer2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Hero = ({ profile }: { profile: UserProfile }) => {
  const router = useRouter();
  
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden bg-grid">
      {/* Background Gradient Spot */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10 flex flex-col items-center"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Looking for an Entry Level Developer Role!
          </div>

          {/* Name Animation */}
          <NameAnimation name={profile.name} />
          
          <h2 className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide max-w-2xl leading-relaxed">
             Aspiring <span className="text-zinc-100 font-medium">Full Stack Developer</span> turning lines of code into meaningful experiences.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4 mb-2">
            <Button 
              onClick={() => router.push('/projects')}
              className="hover:scale-105 transition-transform"
            >
              See My Projects <MousePointer2 size={16} className="animate-bounce" />
            </Button>
            <Button variant="outline" onClick={() => window.open('https://sabeer-anwer-meeran-resume.tiiny.site/', '_blank')}>
              <Download size={16} /> Resume
            </Button>
          </div>

          {/* Reduced gap here by negative margin or tight spacing */}
          <div className="-mt-6 w-full flex justify-center scale-90 md:scale-100 origin-top">
             <HeroHighlights />
          </div>

          <div className="pt-8 flex gap-8 justify-center">
            <a href="https://github.com/Sabyy027" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors transform hover:scale-110"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/sabeeranwermeeran/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors transform hover:scale-110"><Linkedin size={24} /></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sabeeranwermeeran@gmail.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-green-400 transition-colors transform hover:scale-110"><Mail size={24} /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
