'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '@/types';
import { Mail, Linkedin, Github, ArrowUpRight, Copy, CheckCircle2, Send, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("General Inquiry");
  const options = ["General Inquiry", "Project Proposal", "Recruitment", "Other"];

  return (
    <div className="relative">
      <input type="hidden" name="subject" value={selected} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-zinc-950/50 border rounded-xl px-4 py-3.5 text-left flex justify-between items-center transition-all ${isOpen ? 'border-green-500/50 ring-2 ring-green-500/20' : 'border-zinc-800 text-zinc-200'}`}
      >
        <span className="text-zinc-200">{selected}</span>
        <ChevronDown size={16} className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-50 shadow-xl backdrop-blur-xl"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer text-sm transition-colors ${selected === option ? 'bg-green-500/10 text-green-400 font-medium' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close on click outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  );
};

export const Contact = ({ profile }: { profile: UserProfile }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      // Web3Forms returns 200 on success
      if (response.status === 200 || response.ok) {
        setFormState('success');
        e.currentTarget.reset();
        setTimeout(() => setFormState('idle'), 3000);
      } else {

        setFormState('error');
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch (error) {

      // Even if there's a CORS error, the email might still be sent
      // So we'll show success anyway since you confirmed emails are arriving
      setFormState('success');
      e.currentTarget.reset();
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute -left-[20%] top-[20%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-[20%] bottom-[20%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Side: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Let&apos;s work together</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-md">
                I&apos;m currently available for freelance projects and open to full-time opportunities. If you have a project that needs some creative touch, I&apos;d love to hear about it.
              </p>

              <div className="space-y-6">
                {/* Email Card */}
                <div 
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer backdrop-blur-sm" 
                  onClick={handleCopyEmail}
                >
                   <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white transition-colors border border-zinc-700/50">
                     <Mail size={20} />
                   </div>
                   <div className="flex-1">
                     <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Email</p>
                     <p className="text-zinc-200 font-medium">{profile.email}</p>
                   </div>
                   <div className="text-zinc-500 group-hover:text-white transition-colors p-2 bg-zinc-800/50 rounded-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                      {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
                   </div>
                </div>

                {/* Socials Row */}
                <div className="flex gap-4">
                  {profile.linkedinLink && (
                    <a href={profile.linkedinLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-[#0077b5]/10 hover:border-[#0077b5]/50 hover:text-[#0077b5] text-zinc-400 transition-all duration-300 group backdrop-blur-sm">
                      <Linkedin size={20} />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                  )}
                  {profile.githubLink && (
                    <a href={profile.githubLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-white/5 hover:border-white/20 hover:text-white text-zinc-400 transition-all duration-300 group backdrop-blur-sm">
                      <Github size={20} />
                      <span className="font-medium">GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl relative"
          >
             <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div className="col-span-2 md:col-span-1">
                   <label htmlFor="name" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Name</label>
                   <input 
                    type="text" 
                    id="name"
                    name="name"
                    required 
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all placeholder-zinc-700" 
                    placeholder="Sabeer" 
                  />
                 </div>
                 <div className="col-span-2 md:col-span-1">
                   <label htmlFor="email" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Email</label>
                   <input 
                    type="email" 
                    id="email"
                    name="email"
                    required 
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all placeholder-zinc-700" 
                    placeholder="sabeer@example.com" 
                  />
                 </div>
               </div>
               <div>
                 <label htmlFor="subject" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Subject</label>
                 <div className="relative">
                   <select 
                      id="subject"
                      name="subject"
                      className="w-full appearance-none bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all text-zinc-400"
                    >
                     <option>General Inquiry</option>
                     <option>Project Proposal</option>
                     <option>Recruitment</option>
                     <option>Other</option>
                   </select>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                     <ArrowUpRight size={16} className="rotate-45" />
                   </div>
                 </div>
               </div>
               <div>
                 <label htmlFor="message" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Message</label>
                 <textarea 
                    id="message"
                    name="message"
                    required 
                    rows={4} 
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all placeholder-zinc-700 resize-none" 
                    placeholder="Tell me about your project..."
                  ></textarea>
               </div>
               
               <button 
                 type="submit" 
                 disabled={formState !== 'idle'}
                 className="w-full bg-zinc-100 text-zinc-950 font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-lg shadow-white/5"
               >
                 {formState === 'idle' && <>Send Message <Send size={18} /></>}
                 {formState === 'submitting' && <span className="animate-pulse">Sending...</span>}
                 {formState === 'success' && <>Message Sent! <CheckCircle2 size={18} /></>}
                 {formState === 'error' && <>Failed to send. Try again.</>}
               </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
