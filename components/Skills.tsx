'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "Java", icon: "devicon-java-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "SQL", icon: "devicon-mysql-plain" }, // Using MySQL icon for SQL context
    ]
  },
  {
    title: "Frameworks & Database",
    skills: [
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "Tailwind", icon: "devicon-tailwindcss-original" },
      { name: "MySQL", icon: "devicon-mysql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
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
      { name: "Vercel", icon: "devicon-vercel-original" }, // Fallback if missing
      { name: "Netlify", icon: "devicon-netlify-plain" },
      { name: "Render", icon: "devicon-googlecloud-plain" }, // Render specific icon might be missing, using Cloud fallback or generic
      { name: "Postman", icon: "devicon-postman-plain" },
    ]
  },
  {
    title: "Currently Exploring",
    skills: [
      { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
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
            <div key={category.title} className="bg-zinc-950/30 border border-zinc-800/50 rounded-xl p-8 hover:border-zinc-700 transition-colors">
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
                      <i className={`${skill.icon} text-4xl text-zinc-500 group-hover:text-white transition-all duration-300`} />
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
