'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LearningNode, TimelineCategory } from '@/types';
import { api } from '@/lib/storage';
import { GraduationCap, Briefcase, Code, Award, Bookmark, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const LearningCurve = () => {
  const [nodes, setNodes] = useState<LearningNode[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    const fetchNodes = async () => {
        const data = await api.getLearningCurve();
        setNodes(data.sort((a,b) => (a.order || 0) - (b.order || 0))); 
    }
    fetchNodes();
  }, []);

  const getConfig = (cat: TimelineCategory) => {
    switch(cat) {
      case 'education': return { icon: GraduationCap, color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-500/10' };
      case 'experience': return { icon: Briefcase, color: 'text-purple-400', border: 'border-purple-500/50', bg: 'bg-purple-500/10' };
      case 'internship': return { icon: Briefcase, color: 'text-pink-400', border: 'border-pink-500/50', bg: 'bg-pink-500/10' };
      case 'project': return { icon: Code, color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-500/10' };
      case 'certification': return { icon: Award, color: 'text-green-400', border: 'border-green-500/50', bg: 'bg-green-500/10' };
      default: return { icon: Bookmark, color: 'text-zinc-400', border: 'border-zinc-500', bg: 'bg-zinc-500/10' };
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const NodeCard = ({ node, index, isVertical = false }: { node: LearningNode, index: number, isVertical?: boolean }) => {
    const { icon: Icon, color, border, bg } = getConfig(node.category);
    
    // Desktop: Alternating visual (top/bottom)
    const isTop = index % 2 === 0;
    
    if (isVertical) {
      // Mobile / Vertical View
      return (
         <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-8 border-l-2 border-zinc-800 pb-12 last:pb-0"
         >
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-950 border-2 ${border} z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]`}></div>
            <div className="bg-zinc-900/40 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all backdrop-blur-sm">
                <div className={`inline-flex mb-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-950 border ${border} ${color}`}>
                   {node.category}
                </div>
                <div className="font-mono text-xs text-zinc-500 mb-2 flex items-center gap-2">
                   <Calendar size={12} /> {node.date}
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mb-1">{node.title}</h3>
                <p className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-1">
                   <Icon size={14} className={color} /> {node.institution}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{node.description}</p>
                {node.tags && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {node.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">{tag}</span>
                    ))}
                  </div>
                )}
            </div>
         </motion.div>
      );
    }

    // Desktop / Horizontal View
    return (
        <div className="min-w-[400px] snap-center px-4 relative group h-full">
            {/* Center Line Dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-700 group-hover:border-green-500 z-50 transition-colors shadow-lg">
                <div className={`w-1.5 h-1.5 rounded-full ${bg} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}></div>
            </div>

            {/* Card Container */}
            <div className={`absolute w-full px-4 ${isTop ? 'bottom-[50%] pb-16' : 'top-[50%] pt-16'}`}>
                {/* Connector Line */}
                <div className={`absolute left-1/2 w-[1px] bg-zinc-800 group-hover:bg-zinc-600 transition-colors -z-10 ${isTop ? 'bottom-0 h-16' : 'top-0 h-16'}`}></div>

                {/* Card */}
                <motion.div 
                    initial={{ opacity: 0, y: isTop ? 20 : -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:shadow-2xl transition-all backdrop-blur-sm relative group-hover:-translate-y-1 duration-300 w-full z-10"
                >
                     <div className={`absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-950 border ${border} ${color}`}>
                        {node.category}
                     </div>
                     <span className="font-mono text-xs text-zinc-500 mb-2 block flex items-center gap-2">
                        <Calendar size={12} /> {node.date}
                     </span>
                     <h3 className="text-lg font-bold text-zinc-100 mb-1 break-words">{node.title}</h3>
                     <p className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-1 break-words">
                        <Icon size={14} className={color} /> {node.institution}
                     </p>
                     <p className="text-zinc-400 text-sm leading-relaxed mb-4 break-words">{node.description}</p>
                     {node.tags && (
                       <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                         {node.tags.map(tag => (
                           <span key={tag} className="text-[10px] px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                             {tag}
                           </span>
                         ))}
                       </div>
                     )}
                </motion.div>
            </div>
        </div>
    );
  };

  return (
    <section id="journey" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-zinc-100">My Journey</h2>
              <p className="text-zinc-400 max-w-xl text-lg leading-relaxed">From hello world to deployment, here's how I got here.</p>
           </div>
           
           {/* Desktop Controls */}
           <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all active:scale-95"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll('right')} className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all active:scale-95"><ChevronRight size={20} /></button>
           </div>
        </div>
        
        {/* Mobile View: Vertical Timeline */}
        <div className="md:hidden mt-8 pl-2">
           {nodes.map((node, index) => (
              <NodeCard key={node.id} node={node} index={index} isVertical={true} />
           ))}
        </div>

        {/* Desktop View: Horizontal Scroll Timeline */}
        <div className="hidden md:block relative h-[800px]">
           {/* Central Axis Line */}
           <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-800 w-full z-0"></div>
           
           {/* Scroll Track */}
           <div 
             ref={scrollContainerRef} 
             className="flex overflow-x-auto gap-0 h-full hide-scrollbar snap-x px-8"
             style={{ scrollBehavior: 'smooth' }}
           >
              {nodes.map((node, index) => (
                 <NodeCard key={node.id} node={node} index={index} isVertical={false} />
              ))}
              {/* Padding at end */}
              <div className="min-w-[100px]"></div>
           </div>
           
           {/* Gradient Masks for Scroll Hint */}
           <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none"></div>
           <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
};
