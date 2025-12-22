'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/storage';
import { X, AlertTriangle } from 'lucide-react';

export const MaintenanceBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      const profile = await api.getProfile();
      const dismissed = localStorage.getItem('maintenanceBannerDismissed') === 'true';
      
      if (profile.maintenanceMode && !dismissed) {
        setIsVisible(true);
      }
    };

    checkMaintenanceMode();
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('maintenanceBannerDismissed', 'true');
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-zinc-900 border-b border-zinc-800 shadow-lg animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <AlertTriangle size={18} className="text-amber-500 animate-pulse" />
          </div>
          <p className="text-sm md:text-base font-medium text-zinc-200">
            Updates in progress - new content coming soon!
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1.5 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-200"
          aria-label="Dismiss banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
