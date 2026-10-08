'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, MapPin, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface LandingHeroProps {
  onStartPlanning: () => void;
  onExploreClick: () => void;
  onSelectDestination?: (destId: string) => void;
}

interface HeroDestination {
  id: string;
  name: string;
  state: string;
  image: string;
  tagline: string;
}

const HERO_DESTINATIONS: HeroDestination[] = [
  {
    id: 'kashmir',
    name: 'Kashmir',
    state: 'Jammu & Kashmir',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    tagline: 'Paradise of Lakes & Mountains',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    tagline: 'Palaces & Royal Heritage',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'God\'s Own Country',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    tagline: 'Backwaters & Lush Palms',
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'West Coast',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    tagline: 'Sun-kissed Beaches & Vibe',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    state: 'High Pass',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    tagline: 'Stark Monasteries & Valleys',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    tagline: 'Ancient Ghats & Spiritual River',
  },
];

export default function LandingHero({ onStartPlanning, onExploreClick, onSelectDestination }: LandingHeroProps) {
  const [hoveredDestId, setHoveredDestId] = useState<string | null>(null);

  const handleDestinationClick = (id: string) => {
    if (onSelectDestination) {
      onSelectDestination(id);
    } else {
      onStartPlanning();
    }
  };

  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] overflow-hidden text-[#1E3329]">
      {/* Background Indian Travel Imagery Layer with Warm Overlay */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=85"
          alt="Indian Travel Background"
          fill
          priority
          className="object-cover object-center filter blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/80 to-[#FAF8F5]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Main Headline & Hero Content Box */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle Destination Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D9A62E]/30 shadow-xs text-xs font-bold text-[#3F6B55] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A62E]" />
            <span>AI-POWERED INDIA TRAVEL DISCOVERY</span>
          </div>

          {/* Main Headline & Highlighted Tagline */}
          <div className="space-y-4">
            <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1E3329] leading-[1.12]">
              From Dreams to Destinations — <br className="hidden sm:inline" />
              <span className="relative inline-block mt-1 text-[#1E3329] bg-gradient-to-r from-[#FDF8E8] via-[#F3E4B5] to-[#FDF8E8] px-4 py-1 rounded-2xl border border-[#D9A62E]/40 shadow-xs">
                <span className="text-[#3F6B55]">India</span> on Your Budget.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#5A6D63] font-medium leading-relaxed">
              Plan unforgettable journeys across India without overspending.
            </p>
          </div>

          {/* Primary & Secondary Soft Gold + Green Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Primary CTA - Soft Golden Yellow */}
            <button
              onClick={onStartPlanning}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#D9A62E] hover:bg-[#C59424] text-[#1E3329] font-extrabold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group border border-[#B88A22]/30 active:scale-95"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA - Warm White / Muted Green */}
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-[#FAF8F5] border-2 border-[#3F6B55] text-[#3F6B55] font-bold text-base shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95"
            >
              <Compass className="w-5 h-5 text-[#3F6B55]" />
              <span>Explore India</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE TOURIST IMAGE CARDS GRID */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="font-serif-heading font-bold text-xl text-[#1E3329] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#D9A62E]" />
              <span>Interactive Destination Journey</span>
            </h2>
            <span className="text-xs text-[#5A6D63] font-medium hidden sm:inline">
              Hover to discover &bull; Click to plan
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {HERO_DESTINATIONS.map((dest) => {
              const isHovered = hoveredDestId === dest.id;
              const isAnyHovered = hoveredDestId !== null;

              return (
                <div
                  key={dest.id}
                  onClick={() => handleDestinationClick(dest.id)}
                  onMouseEnter={() => setHoveredDestId(dest.id)}
                  onMouseLeave={() => setHoveredDestId(null)}
                  className={`group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                    isHovered
                      ? 'border-[#D9A62E] shadow-xl z-20 scale-105 -translate-y-1'
                      : isAnyHovered
                      ? 'border-[#E8E4DC] opacity-75 grayscale-25 z-0'
                      : 'border-[#E8E4DC] shadow-sm hover:shadow-md z-10'
                  }`}
                >
                  {/* Destination Photo */}
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className={`object-cover transition-transform duration-500 ease-out ${
                      isHovered ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 bg-gradient-to-t ${
                      isHovered
                        ? 'from-[#1E3329]/90 via-[#1E3329]/40 to-transparent'
                        : 'from-[#1E3329]/75 via-[#1E3329]/20 to-transparent'
                    }`}
                  />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-extrabold text-[#3F6B55] shadow-xs">
                      {dest.state}
                    </span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10 text-white space-y-1">
                    <h3 className="font-serif-heading text-lg font-bold tracking-wide text-white group-hover:text-[#FDE68A] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-[11px] text-stone-200 line-clamp-1 font-medium">
                      {dest.tagline}
                    </p>

                    {/* Explore Action Button on Hover */}
                    <div
                      className={`pt-1 flex items-center justify-between text-xs font-bold text-[#E3B84B] transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Value Highlights Bar */}
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { label: 'Smart Budgeting in Rupee (₹)', sub: 'Calculates complete trip math' },
            { label: 'Clickable Hotel & Room Selection', sub: 'Interactive rooms & amenities' },
            { label: 'IRCTC Train & Car Routes', sub: 'Calculates fuel, tolls & direct links' },
            { label: 'Save Plans to Device', sub: 'Persists saved trips locally' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#E8E4DC] shadow-xs hover:border-[#3F6B55]/30 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-[#3F6B55] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1E3329]">{item.label}</p>
                <p className="text-[10px] text-[#5A6D63]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
