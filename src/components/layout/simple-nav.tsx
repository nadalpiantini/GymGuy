'use client'

import Link from 'next/link';
import Image from 'next/image';

export default function SimpleNav() {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[999] top-[20px] md:top-[30px]">
      <nav
        className="block h-[60px] p-0 rounded-xl shadow-2xl relative overflow-hidden border border-gray-800 backdrop-blur-md bg-black/80"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div className="flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              aria-label="GymGuy - Go to homepage"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-primary-glow">
                <Image
                  src="/images/ponteroca-logo.jpg"
                  alt="PONTEROCA Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-teko-bold text-primary">GymGuy</span>
                <span className="text-xs text-primary/70 -mt-0.5" aria-label="Tagline: Unstoppable Strength">UNSTOPPABLE STRENGTH</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
