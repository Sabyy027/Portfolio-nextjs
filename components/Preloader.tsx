'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Cpu } from 'lucide-react';

const terminalLines = [
  { text: '> git pull origin main', color: 'text-zinc-400' },
  { text: '> npm install', color: 'text-zinc-400' },
  { text: '> install dependencies...', color: 'text-yellow-500/80' },
  { text: '> running build script...', color: 'text-blue-400' },
  { text: '> optimizing assets...', color: 'text-purple-400' },
  { text: '> starting production server...', color: 'text-green-400' },
  { text: '> READY', color: 'text-green-500 font-bold' },
];

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < terminalLines.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, 400); // Speed of each line appearing
      return () => clearTimeout(timeout);
    } else {
      // Finished all lines, wait a bit then hide
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  // Lock body scroll
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 font-mono"
        >
          <div className="w-full max-w-lg p-6">
            
            {/* Terminal Window Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4 text-zinc-600 border-b border-zinc-800 pb-2"
            >
              <Terminal size={16} />
              <span className="text-xs">developer_console — bash — 80x24</span>
            </motion.div>

            {/* Terminal Content */}
            <div className="space-y-2 font-mono text-sm md:text-base min-h-[200px]">
              {terminalLines.map((line, index) => (
                index <= currentLineIndex && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${line.color} flex items-center gap-3`}
                  >
                    <span>{line.text}</span>
                    {index === currentLineIndex && index !== terminalLines.length - 1 && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-zinc-500 ml-1"
                      />
                    )}
                  </motion.div>
                )
              ))}
            </div>

            {/* Loading Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 h-1 w-full bg-zinc-900 rounded-full overflow-hidden"
            >
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
