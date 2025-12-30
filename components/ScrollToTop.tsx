'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-button fixed bottom-[7.5rem] left-0 md:bottom-8 md:left-8 z-50 group animate-fade-in-up"
          aria-label="Scroll to top"
        >
          {/* Mobile: Slim vertical tab */}
          <div className="md:hidden">
            <div className="relative w-12 h-12 bg-white/95 backdrop-blur-xl rounded-r-xl shadow-lg flex items-center justify-center border border-neutral-200/80">
              <svg
                className="w-5 h-5 text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
          </div>

          {/* Desktop: Minimal elegant button */}
          <div className="hidden md:block relative">
            <div className="relative w-12 h-12 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg flex items-center justify-center border border-neutral-200/80 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <svg
                className="w-5 h-5 text-neutral-700 group-hover:-translate-y-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                Back to top
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  );
}
