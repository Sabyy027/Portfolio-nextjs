'use client';

import React, { useState, useEffect } from 'react';

export const NameAnimation = ({ name }: { name: string }) => {
  const fullText = `I'm ${name} 👋`;
  const [displayedText, setDisplayedText] = useState("");
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    // Array.from splits by code points (handles emojis correctly)
    const chars = Array.from(fullText);
    let i = 0;
    
    const typingInterval = setInterval(() => {
      if (i <= chars.length) {
        setDisplayedText(chars.slice(0, i).join(''));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText]);

  return (
    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 text-center leading-tight min-h-[1.2em] whitespace-nowrap">
      {displayedText}
      <span 
        className={`inline-block w-2 md:w-3 h-8 md:h-12 bg-green-500 ml-2 align-middle transition-opacity duration-100 ${
          isCursorVisible ? 'opacity-100' : 'opacity-0'
        }`} 
      />
    </h1>
  );
};
