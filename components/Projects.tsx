'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { api } from '@/lib/storage';
import { Button, SectionHeader } from './ui/Button';
import { ArrowUpRight, Github, X, CheckCircle2 } from 'lucide-react';

// --- Projects with Modal ---

const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  // Lock body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative my-8"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors z-10"><X size={20} /></button>
        
        <div className="relative h-64 md:h-96 w-full">
           <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
           <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <span className="text-green-400 font-mono text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">{project.category}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{project.title}</h2>
           </div>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">About the Project</h3>
              <p className="text-zinc-400 leading-relaxed text-justify">
                {project.longDescription || project.description}
              </p>
            </div>
            
            {project.features && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-400">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-1" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-8">
             <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800">
               <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Tech Stack</h4>
               <div className="flex flex-wrap gap-2">
                 {project.techStack.map(t => (
                   <span key={t} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-300">
                     {t}
                   </span>
                 ))}
               </div>
             </div>

             <div className="flex flex-col gap-3">
               {project.demoLink && (
                 <a href={project.demoLink} target="_blank" rel="noreferrer" className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                   Live Demo <ArrowUpRight size={18} />
                 </a>
               )}
               {/* Repo Links */}
               {project.backendRepo ? (
                 <div className="flex gap-3">
                   {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-zinc-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors">
                      Frontend <Github size={18} />
                    </a>
                   )}
                   <a href={project.backendRepo} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-zinc-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors">
                      Backend <Github size={18} />
                   </a>
                 </div>
               ) : (
                 project.repoLink && (
                   <a href={project.repoLink} target="_blank" rel="noreferrer" className="w-full py-3 bg-zinc-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors">
                     View Code <Github size={18} />
                   </a>
                 )
               )}
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects = ({ featuredOnly = false }: { featuredOnly?: boolean }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const fetchProjects = async () => {
      try {
        const allProjects = await api.getProjects();
        let filtered = allProjects.filter(p => p.isPublished);
        if (featuredOnly) {
           filtered = filtered.filter(p => p.isFeatured);
        }
        filtered.sort((a, b) => {
          const orderA = a.order ?? 999;
          const orderB = b.order ?? 999;
          return orderA - orderB;
        });
        setProjects(filtered); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [featuredOnly]);

  return (
    <section id="projects" className="py-24 md:py-32 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader title="Projects" subtitle="A collection of projects that I've built, ranging from web applications to experimental tools." />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden h-96 flex flex-col animate-pulse">
                <div className="p-8 pb-0 flex-1 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-6 w-20 bg-zinc-800 rounded-full"></div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
                      <div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-8 w-3/4 bg-zinc-800 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-zinc-800 rounded"></div>
                    <div className="h-4 w-5/6 bg-zinc-800 rounded"></div>
                  </div>
                </div>
                <div className="h-32 bg-zinc-800 w-full mt-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, featuredOnly ? 3 : undefined).map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col justify-between bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm transition-colors duration-300 hover:bg-zinc-900/80 hover:border-green-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] cursor-pointer"
              >
                <div className="p-8 pb-0 flex flex-col h-full z-20 relative">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full">
                      {project.projectType || project.category}
                    </span>
                    <div className="flex gap-2">
                      {project.isOngoing && (
                        <div className="relative">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping absolute"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            Ongoing
                          </span>
                        </div>
                      )}
                      {project.repoLink && (
                         <a href={project.repoLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2.5 bg-zinc-800/50 hover:bg-white hover:text-black rounded-full transition-colors text-zinc-400 z-30">
                           <Github size={18} />
                         </a>
                      )}
                      <div className="p-2.5 bg-zinc-800/50 group-hover:bg-white group-hover:text-black rounded-full transition-colors text-zinc-400">
                         <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-3 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-lg group-hover:text-zinc-300 transition-colors line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pb-8">
                    {project.techStack.slice(0, 4).map(tech => (
                      <span key={tech} className="text-xs font-medium text-zinc-500 bg-zinc-800/30 px-2 py-1 rounded border border-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors">#{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="relative w-full overflow-hidden h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-60" />
                  <motion.img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover origin-bottom"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
            <Button variant="outline" onClick={() => window.location.href = '/projects'}>
              View All Projects <ArrowUpRight size={16} />
            </Button>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
};
