'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, BrainCircuit, Link, Bot } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "Java", icon: "devicon-java-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
    ]
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "Tailwind", icon: "devicon-tailwindcss-original" },
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: "devicon-mysql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
    ]
  },
  {
    title: "Tools & Deployment",
    skills: [
      { name: "Vite", icon: "devicon-vitejs-plain" },
      { name: "Git", icon: "devicon-git-plain" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "VS Code", icon: "devicon-vscode-plain" },
      { name: "Figma", icon: "devicon-figma-plain" },
      { name: "Vercel", icon: "devicon-vercel-original" },
      { name: "Netlify", icon: "devicon-netlify-plain" },
      { name: "Render", icon: "devicon-googlecloud-plain" },
      { name: "Postman", icon: "devicon-postman-plain" },
    ]
  },
  {
    title: "Currently Exploring",
    skills: [
      { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "n8n", icon: Workflow, isComponent: true },
      { name: "RAG Arch.", icon: BrainCircuit, isComponent: true },
      { name: "LangChain", icon: Link, isComponent: true },
      { name: "Agentic AI", icon: Bot, isComponent: true },
    ]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 border-y border-white/5 bg-zinc-900/20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 text-zinc-100 text-center">Tech Stack</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <div 
              key={category.title} 
              className={`bg-zinc-950/30 border border-zinc-800/50 rounded-xl p-8 hover:border-zinc-700 transition-colors ${catIndex === 4 ? 'md:col-span-2' : ''}`}
            >
              <h3 className="text-xl font-semibold text-zinc-300 mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                  {category.skills.map((skill, i) => (
                    <motion.div 
                      key={skill.name + i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="flex flex-col items-center gap-3 group"
                    >
                      {/* Render Icon based on type */}
                      {/* @ts-ignore - Dynamic check handling */}
                      {skill.isComponent ? (
                        // @ts-ignore
                        <skill.icon size={36} className="text-zinc-500 group-hover:text-white transition-all duration-300" />
                      ) : (
                        <i className={`${skill.icon} text-4xl text-zinc-500 group-hover:text-white transition-all duration-300`} />
                      )}
                      
                      <span className="text-xs font-medium text-zinc-600 group-hover:text-zinc-300 transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
