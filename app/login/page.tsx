'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      router.push('/admin');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar toggleTheme={() => {}} isDark={true} />
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md p-8 bg-zinc-900/50 border border-white/5 rounded-3xl backdrop-blur-xl">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-green-500/10 rounded-full border border-green-500/20">
              <Lock className="text-green-400" size={32} />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
          <p className="text-zinc-400 text-center mb-8 text-sm">Enter password to manage your portfolio</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 ml-4">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-white/10 rounded-full px-6 py-3 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all text-sm"
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 px-4 py-2 rounded-full border border-red-400/20">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full">
              Login as Admin
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
