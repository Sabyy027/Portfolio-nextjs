'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-zinc-100 text-zinc-900 hover:bg-white border border-transparent font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)]',
    secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700',
    outline: 'border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 bg-transparent',
    ghost: 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
  };
  
  return (
    <button 
      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`} 
      {...props} 
    />
  );
};

export const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 md:mb-20">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-zinc-100">{title}</h2>
    {subtitle && <p className="text-zinc-400 max-w-xl text-lg leading-relaxed">{subtitle}</p>}
  </div>
);
