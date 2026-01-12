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
    { name: 'About', href: '/about', icon: Home },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Journey', href: '/#journey', icon: MapPin },
    { name: 'Certificates', href: '/certifications', icon: Award }
  ];

  const getNavHref = (item: typeof navItems[0]) => {
    const isHome = pathname === '/';
    if (item.name === 'Projects') return '/projects';
    if (item.name === 'Certificates') return '/certifications';
    if (item.name === 'About') return '/about';
    return isHome ? item.href.split('#')[1] ? `#${item.href.split('#')[1]}` : '/' : item.href;
  };

  return (
    <>
      {/* Desktop & Mobile Top Navbar */}
      <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-2xl shadow-black/50 flex items-center gap-3 md:gap-6">
          <Link href="/">
            <img src="/logo.jpeg" alt="Logo" className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover border border-white/10" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {

              const isExternal = item.name === 'Projects' || item.name === 'Certificates' || item.name === 'About';
              
              if (isExternal) {
                return (
                  <Link key={item.name} href={item.href} className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all">
                    {item.name}
                  </Link>
                );
              }
              
              // For anchor links (About, Journey), use smooth scroll without URL change
              const handleClick = (e: React.MouseEvent) => {
                e.preventDefault();
                const sectionId = item.href.split('#')[1];
                
                // If not on homepage, navigate there first
                if (pathname !== '/') {
                  window.location.href = '/' + (sectionId ? `#${sectionId}` : '');
                  return;
                }
                
                // Scroll to section on homepage
                if (sectionId) {
                  setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }
              };
              
              return (
                <button 
                  key={item.name} 
                  onClick={handleClick}
                  className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all"
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-all"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
        <div className={`absolute top-16 right-4 left-4 bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'}`}>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {

              
              const isExternal = item.name === 'Projects' || item.name === 'Certificates' || item.name === 'About';
              const Icon = item.icon;
              
              if (isExternal) {
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-zinc-300 hover:text-white px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                );
              }
              
              // For anchor links, use smooth scroll without URL change
              const handleClick = () => {
                const sectionId = item.href.split('#')[1];
                
                // If not on homepage, navigate there first
                if (pathname !== '/') {
                  window.location.href = '/' + (sectionId ? `#${sectionId}` : '');
                  setMobileMenuOpen(false);
                  return;
                }
                
                // Scroll to section on homepage
                if (sectionId) {
                  setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }
                setMobileMenuOpen(false);
              };
              
              return (
                <button 
                  key={item.name} 
                  onClick={handleClick}
                  className="flex items-center gap-3 text-zinc-300 hover:text-white px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all"
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
