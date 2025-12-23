'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Home',
      href: '/',
      cta: false,
      icon: (isActive: boolean) => (
        <svg
          className={`h-6 w-6 ${isActive ? 'text-accent' : 'text-neutral-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9.75L12 4l9 5.75M19.5 10.75V20a1 1 0 01-1 1h-4.5v-5.25h-4V21H6.5a1 1 0 01-1-1v-9.25"
          />
        </svg>
      ),
    },
    {
      name: 'About',
      href: '/about',
      cta: false,
      icon: (isActive: boolean) => (
        <svg
          className={`h-6 w-6 ${isActive ? 'text-accent' : 'text-neutral-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 3v8.5m0 0h-.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Services',
      href: '/services',
      cta: false,
      icon: (isActive: boolean) => (
        <svg
          className={`h-6 w-6 ${isActive ? 'text-accent' : 'text-neutral-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h3.5a2 2 0 012 2v3.5a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm8.5 0a2 2 0 012-2H18a2 2 0 012 2v3.5a2 2 0 01-2 2h-3.5a2 2 0 01-2-2V6zM4 14.5a2 2 0 012-2h3.5a2 2 0 012 2V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.5zm8.5 0a2 2 0 012-2H18a2 2 0 012 2V18a2 2 0 01-2 2h-3.5a2 2 0 01-2-2v-3.5z"
          />
        </svg>
      ),
    },
    {
      name: 'Case Studies',
      href: '/case-studies',
      cta: false,
      icon: (isActive: boolean) => (
        <svg
          className={`h-6 w-6 ${isActive ? 'text-accent' : 'text-neutral-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.75 5.75A1.75 1.75 0 016.5 4h11a1.75 1.75 0 011.75 1.75v12.5A1.75 1.75 0 0017.5 20h-11A1.75 1.75 0 014.75 18.25V5.75zM8 7.5h8m-8 4h8m-8 4h4"
          />
        </svg>
      ),
    },
    {
      name: 'For Candidates',
      href: '/candidates',
      cta: false,
      icon: (isActive: boolean) => (
        <svg
          className={`h-6 w-6 ${isActive ? 'text-accent' : 'text-neutral-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 6c-3.314 0-6 2.015-6 4.5V20h12v-2.5c0-2.485-2.686-4.5-6-4.5z"
          />
        </svg>
      ),
    },
    {
      name: 'Contact',
      href: '/contact',
      cta: true,
      icon: (isActive: boolean) => (
        <svg
          className={`h-6 w-6 ${isActive ? 'text-white' : 'text-white'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5.75A1.75 1.75 0 014.75 4h14.5A1.75 1.75 0 0121 5.75v12.5A1.75 1.75 0 0119.25 20H4.75A1.75 1.75 0 013 18.25V5.75zM4.75 6l7.25 5 7.25-5"
          />
        </svg>
      ),
    },
  ];

  const primaryNav = navigation.filter((item) => !item.cta);
  const actionNav = navigation.find((item) => item.cta);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      if (currentScrollY < 0) {
        return;
      }

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (delta > 8) {
        setIsVisible(false);
      } else if (delta < -8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <nav
        className={`bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-neutral-200/50 transition-transform duration-500 ease-out will-change-transform ${
          isVisible ? 'translate-y-0' : '-translate-y-[120%]'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-20 items-center justify-center md:justify-between">
            <Link href="/" className="flex items-center group">
              <div className="relative h-14 md:h-16 bg-white rounded-lg px-3 py-2 shadow-sm">
                <Image
                  src="/datavruti-full.jpg"
                  alt="DataVruti Logo"
                  width={180}
                  height={64}
                  className="object-contain h-full w-auto group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-all duration-300 px-5 py-2.5 rounded-xl relative group ${
                      isActive
                        ? 'text-white bg-accent-700 shadow-lg shadow-accent/30 font-semibold'
                        : 'text-neutral-600 hover:text-accent hover:bg-accent-50/80 hover:shadow-md font-medium'
                    }`}
                  >
                    <span className="relative">{item.name}</span>
                    {!isActive && (
                      <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-accent group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="ml-4 relative inline-flex items-center gap-2 bg-primary-600 text-white px-7 py-3 rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transform"
              >
                <span className="relative">Hire Talent</span>
                <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom navigation */}
      <nav
        className={`md:hidden fixed inset-x-0 bottom-4 z-50 pointer-events-none transition-transform duration-500 ease-out will-change-transform ${
          isVisible ? 'translate-y-0' : 'translate-y-[140%]'
        }`}
        aria-label="Primary"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex justify-center px-4">
          <div className="glass-nav pointer-events-auto flex items-center gap-3 px-3 py-2">
            <div className="relative z-10 grid flex-1 grid-cols-5 gap-0.5">
              {primaryNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));

                const label =
                  item.name === 'For Candidates' ? 'Candidates' : item.name;

                return (
                  <Link
                    key={`mobile-bottom-${item.name}`}
                    href={item.href}
                    className={`relative flex flex-col items-center gap-0.5 rounded-2xl px-1.5 py-0.5 transition-all duration-300 ${
                      isActive
                        ? 'text-accent'
                        : 'text-neutral-700 hover:text-accent'
                    }`}
                  >
                    <span
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-white/80 shadow-[0_16px_32px_rgba(59,130,246,0.28)]'
                          : 'bg-transparent'
                      }`}
                    >
                      {item.icon(isActive)}
                    </span>
                    <span
                      className={`relative flex min-h-[16px] items-center justify-center px-0.5 text-[9px] font-semibold tracking-wide leading-tight text-center ${
                        isActive ? 'text-accent' : 'text-neutral-700'
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {actionNav && (
              <Link
                key={`mobile-bottom-${actionNav.name}`}
                href={actionNav.href}
                className="relative z-10 flex flex-col items-center gap-0.5 rounded-full bg-primary p-1 text-white shadow-lg shadow-primary/40 transition-transform duration-300 hover:scale-105"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  {actionNav.icon(true)}
                </span>
                <span className="flex min-h-[16px] items-center justify-center px-0.5 text-[9px] font-semibold tracking-wide leading-tight text-center text-white/90">
                  {actionNav.name}
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
