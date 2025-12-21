'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { api } from '@/lib/storage';
import { Certificate } from '@/types';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCertificates();
      setCertificates(data.sort((a, b) => a.order - b.order));
    };
    fetchData();
  }, []);

  const featured = certificates.filter(c => c.isFeatured);
  const others = certificates.filter(c => !c.isFeatured);

  const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group relative bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden hover:border-green-500/50 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col h-full"
    >
        <div className="aspect-video relative overflow-hidden bg-zinc-950 px-5 pt-5 pb-0">
            <img src={cert.imageUrl} alt={cert.name} className="w-full h-full object-cover rounded-t-xl opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent"></div>
            {cert.isFeatured && (
                <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 p-2 rounded-full shadow-lg">
                    <Star size={16} fill="currentColor" />
                </div>
            )}
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
            <div className="mb-4 flex-1">
                <h3 className="text-xl font-bold text-zinc-100 leading-tight mb-2 group-hover:text-green-400 transition-colors">{cert.name}</h3>
                <p className="text-sm text-zinc-400 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {cert.issuer}
                </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <span className="text-xs font-mono text-zinc-500">{cert.date}</span>
                {cert.credentialLink ? (
                    <a 
                        href={cert.credentialLink.startsWith('http') ? cert.credentialLink : `https://${cert.credentialLink}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-2 text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full hover:bg-green-500 hover:text-black transition-all"
                    >
                        Credential <ExternalLink size={12} />
                    </a>
                ) : (
                    <span className="text-xs text-zinc-600 cursor-not-allowed">No Link</span>
                )}
            </div>
        </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar toggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
      
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Certifications</h1>
                <p className="text-zinc-400 max-w-2xl text-lg">A complete collection of my professional certifications, courses, and technical achievements.</p>
            </div>
            <div className="h-1 w-32 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] mt-6 md:mt-0"></div>
        </div>

        {featured.length > 0 && (
            <div className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Star className="text-green-500" fill="currentColor" /> Featured
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-green-500/50 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((cert, index) => (
                        <CertificateCard key={cert.id} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        )}

        {others.length > 0 && (
            <div>
                 <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-zinc-300">
                        {featured.length > 0 ? "Collection" : "All Certificates"}
                    </h2>
                    <div className="h-px flex-1 bg-zinc-800"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {others.map((cert, index) => (
                        <CertificateCard key={cert.id} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        )}
      </main>

      <footer className="py-12 text-center text-zinc-600 text-sm border-t border-zinc-900 bg-zinc-950">
        <p>© {new Date().getFullYear()} Sabeer Anwer Meeran. Made with Next.js</p>
      </footer>
    </div>
  );
}
