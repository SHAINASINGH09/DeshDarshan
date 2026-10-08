'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, MapPin, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onStartPlanning: () => void;
  onExploreClick: () => void;
}

export default function Footer({ onStartPlanning, onExploreClick }: FooterProps) {
  return (
    <footer className="bg-[#1E3329] border-t border-[#2D4A3C] text-white pt-16 pb-12 px-4 sm:px-6">
      {/* FINAL CTA */}
      <div className="max-w-4xl mx-auto text-center space-y-6 pb-16 border-b border-[#2D4A3C]">
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-extrabold text-white">
          From Dreams to Destinations — <br className="hidden sm:inline" />
          <span className="text-[#E3B84B]">India on Your Budget.</span>
        </h2>
        <p className="text-sm sm:text-base text-stone-200 max-w-xl mx-auto font-medium">
          Plan unforgettable journeys across India without overspending.
        </p>

        <button
          onClick={onStartPlanning}
          className="px-8 py-4 rounded-2xl bg-[#D9A62E] hover:bg-[#C59424] active:scale-95 text-[#1E3329] font-extrabold text-base shadow-md transition-all inline-flex items-center gap-2 border border-[#B88A22]/30"
        >
          <Sparkles className="w-5 h-5 fill-[#1E3329]" />
          <span>Start Planning Trip</span>
        </button>
      </div>

      {/* FOOTER MAIN GRID */}
      <div className="max-w-7xl mx-auto pt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#D9A62E]/40 bg-white">
              <Image src="/logo.jpg" alt="DeshDarshan Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-serif-heading text-xl font-bold tracking-tight text-white block">
                DeshDarshan
              </span>
              <span className="text-[9px] tracking-wider text-[#FDE68A] uppercase block -mt-1 font-semibold">
                From Dreams to Destinations
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-300 max-w-md leading-relaxed font-medium">
            Discover destinations across India, compare route costs, choose hotel rooms, calculate car fuel math, and save complete itineraries to your device.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-serif-heading text-sm font-bold text-[#E3B84B] uppercase tracking-wider">
            Explore India
          </h4>
          <ul className="space-y-2 text-stone-300 font-medium">
            <li><button onClick={onExploreClick} className="hover:text-[#FDE68A]">Himalayan Mountains</button></li>
            <li><button onClick={onExploreClick} className="hover:text-[#FDE68A]">Goa & Kerala Beaches</button></li>
            <li><button onClick={onExploreClick} className="hover:text-[#FDE68A]">Rajasthani Palaces</button></li>
            <li><button onClick={onExploreClick} className="hover:text-[#FDE68A]">Spiti & Ladakh Passes</button></li>
          </ul>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-serif-heading text-sm font-bold text-[#E3B84B] uppercase tracking-wider">
            Key Features
          </h4>
          <ul className="space-y-2 text-stone-300 font-medium">
            <li>Interactive Hotel Room Selection</li>
            <li>Persistent Trip Planning Sidebar</li>
            <li>IRCTC Train Booking Direct Link</li>
            <li>Own Car Fuel & Toll Estimation</li>
            <li>Save Trips to Device Storage</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-[#2D4A3C] flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-400 gap-4">
        <span>© 2026 DeshDarshan. Built for discovering the beauty of India.</span>
        <span className="text-[#FDE68A]">From Dreams to Destinations &bull; India on Your Budget</span>
      </div>
    </footer>
  );
}
