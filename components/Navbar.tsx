'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Lock, Menu, X, Home, Briefcase, Award, MapPin } from 'lucide-react';

export const Navbar = ({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'About', href: '/#about', icon: Home },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Journey', href: '/#journey', icon: MapPin },
    { name: 'Certificates', href: '/certifications', icon: Award }
  ];

  const getNavHref = (item: typeof navItems[0]) => {
    const isHome = pathname === '/';
    if (item.name === 'Projects') return '/projects';
    if (item.name === 'Certificates') return '/certifications';
    return isHome ? item.href.split('#')[1] ? `#${item.href.split('#')[1]}` : '/' : item.href;
  };

  return (
    <>
      {/* Desktop & Mobile Top Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl shadow-black/50 flex items-center gap-6">
          <Link href="/">
            <img src="/logo.jpeg" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-white/10" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const href = getNavHref(item);
              const isExternal = item.name === 'Projects' || item.name === 'Certificates';
              
              return isExternal ? (
                <Link key={item.name} href={href} className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all">
                  {item.name}
                </Link>
              ) : (
                <a key={item.name} href={href} className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all">
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="h-4 w-[1px] bg-zinc-700 hidden md:block"></div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
               <Link href="/admin" className="text-xs font-mono text-green-400 hover:text-green-300 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
                 Dashboard
               </Link>
            ) : (
              <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">
                <Lock size={16} />
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
        <div className={`absolute top-24 right-4 left-4 bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'}`}>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const href = getNavHref(item);
              const isExternal = item.name === 'Projects' || item.name === 'Certificates';
              const Icon = item.icon;
              
              return isExternal ? (
                <Link 
                  key={item.name} 
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-zinc-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ) : (
                <a 
                  key={item.name} 
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-zinc-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 px-2 py-3 safe-area-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const href = getNavHref(item);
            const isExternal = item.name === 'Projects' || item.name === 'Certificates';
            const Icon = item.icon;
            
            return isExternal ? (
              <Link 
                key={item.name} 
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-white/5 transition-all group"
              >
                <Icon size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300">{item.name}</span>
              </Link>
            ) : (
              <a 
                key={item.name} 
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-white/5 transition-all group"
              >
                <Icon size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300">{item.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
