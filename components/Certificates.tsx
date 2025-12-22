'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/types';
import { api } from '@/lib/storage';
import { Button } from './ui/Button';
import { Award, ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Certificates = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [initialDelayComplete, setInitialDelayComplete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchCerts = async () => {
            const fetched = await api.getCertificates();
            console.log('Fetched certificates:', fetched);
            const featured = fetched.filter(c => c.isFeatured);
            if(featured.length > 0) {
                // Sort by priority (highest first), then by order
                const sorted = featured.sort((a, b) => {
                    const priorityA = a.priority || 0;
                    const priorityB = b.priority || 0;
                    console.log(`Comparing: ${a.name} (priority: ${priorityA}) vs ${b.name} (priority: ${priorityB})`);
                    if (priorityB !== priorityA) {
                        return priorityB - priorityA; // Higher priority first
                    }
                    return a.order - b.order; // Then by order
                });
                console.log('Sorted certificates:', sorted.map(c => ({ name: c.name, priority: c.priority || 0, order: c.order })));
                setCertificates(sorted);
            }
        };
        fetchCerts();
    }, []);

    // Initial 15-second delay for highest priority certificate
    useEffect(() => {
        if (certificates.length === 0) return;
        
        const timer = setTimeout(() => {
            setInitialDelayComplete(true);
        }, 15000); // 15 seconds
        
        return () => clearTimeout(timer);
    }, [certificates.length]);

    // Auto-rotation after initial delay
    useEffect(() => {
        if (!initialDelayComplete || isPaused || certificates.length < 2) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % certificates.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [initialDelayComplete, isPaused, certificates.length]);

    if (certificates.length === 0) return null;

    const getCardStyle = (index: number) => {
        const total = certificates.length;
        const leftIndex = (activeIndex - 1 + total) % total;
        const rightIndex = (activeIndex + 1) % total;

        if (index === activeIndex) {
            return {
                type: 'center',
                zIndex: 30,
                opacity: 1,
                scale: 1,
                x: '0%',
                filter: 'brightness(1) blur(0px)'
            };
        } else if (index === leftIndex) {
            return {
                type: 'left',
                zIndex: 20,
                opacity: 0.6,
                scale: 0.85,
                x: '-85%',
                filter: 'brightness(0.5) blur(2px)'
            };
        } else if (index === rightIndex) {
            return {
                type: 'right',
                zIndex: 20,
                opacity: 0.6,
                scale: 0.85,
                x: '85%',
                filter: 'brightness(0.5) blur(2px)'
            };
        } else {
            return { type: 'hidden', zIndex: 0, opacity: 0, scale: 0.5, x: '0%', filter: 'brightness(0)' };
        }
    };

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % certificates.length);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

    return (
        <section id="certificates" className="py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="text-center mb-20 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">Certifications</h2>
                <div className="h-1 w-20 bg-green-500 mx-auto rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div
                className="relative h-[500px] md:h-[600px] max-w-7xl mx-auto flex items-center justify-center perspective-1000"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <AnimatePresence mode='popLayout'>
                    {certificates.map((cert, i) => {
                        const style = getCardStyle(i);
                        if (style.type === 'hidden') return null;
                        const isCenter = style.type === 'center';
                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: style.opacity, scale: style.scale, x: style.x, zIndex: style.zIndex, filter: style.filter }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute w-[85vw] md:w-[650px] bg-zinc-900/90 backdrop-blur-xl border rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl origin-center ${isCenter ? 'border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.1)]' : 'border-zinc-800'}`}
                                onClick={() => { if (style.type === 'left') handlePrev(); if (style.type === 'right') handleNext(); }}
                            >
                                <div className="relative w-full aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 mb-6 group">
                                    <img src={cert.imageUrl} alt={cert.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60"></div>
                                    {isCenter && (
                                        <div className="absolute bottom-4 right-4">
                                            <div className="h-10 w-10 bg-zinc-900/80 backdrop-blur rounded-full flex items-center justify-center border border-white/10 text-green-400 shadow-lg"><Award size={20} /></div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div>
                                        <h3 className={`text-xl md:text-2xl font-bold mb-2 leading-tight ${isCenter ? 'text-white' : 'text-zinc-400'}`}>{cert.name}</h3>
                                        <p className="text-sm text-zinc-400 font-mono flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{cert.issuer} <span className="text-zinc-600">•</span> {cert.date}</p>
                                    </div>
                                    {isCenter && (
                                        <div className="flex-shrink-0">
                                            {cert.credentialLink ? (
                                                <a 
                                                    href={cert.credentialLink.startsWith('http') ? cert.credentialLink : `https://${cert.credentialLink}`} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 text-sm font-bold rounded-full hover:bg-green-400 hover:scale-105 transition-all shadow-lg shadow-white/5"
                                                >
                                                    View Credential <ExternalLink size={16} />
                                                </a>
                                            ) : (<span className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 text-zinc-500 text-sm font-bold rounded-full cursor-not-allowed border border-zinc-700">No Link</span>)}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            <div className="flex flex-col items-center gap-8 mt-8 relative z-40">
                <div className="flex gap-4">
                    <button onClick={handlePrev} className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-zinc-800 transition-all active:scale-95"><ChevronLeft key="prev" size={24} /></button>
                    <button onClick={handleNext} className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-zinc-800 transition-all active:scale-95"><ChevronRight key="next" size={24} /></button>
                </div>

                <div className="mt-4">
                    <Button variant="outline" className="group border-zinc-700 hover:border-green-500 hover:text-green-400 transition-all" onClick={() => router.push('/certifications')}>
                        View All Certifications
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    )
};
