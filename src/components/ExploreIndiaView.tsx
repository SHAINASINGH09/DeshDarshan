'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, Star, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Destination } from '@/types';
import { INITIAL_DESTINATIONS } from '@/data/destinationsData';

interface ExploreIndiaViewProps {
  onSelectDestination: (dest: Destination) => void;
}

const CATEGORIES = [
  { id: 'All', label: 'All India', icon: '🗺️' },
  { id: 'Mountains', label: 'Mountains', icon: '🏔️' },
  { id: 'Beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'Heritage', label: 'Heritage', icon: '🏛️' },
  { id: 'Adventure', label: 'Adventure', icon: '🏕️' },
  { id: 'Nature', label: 'Nature', icon: '🌿' },
  { id: 'Spiritual', label: 'Spiritual', icon: '🛕' },
  { id: 'Food', label: 'Food & Culture', icon: '🍛' },
];

export default function ExploreIndiaView({ onSelectDestination }: ExploreIndiaViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDestinations = INITIAL_DESTINATIONS.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'All') return matchesSearch;

    const matchesCat =
      dest.topExperiences.some((exp) => exp.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      dest.tagline.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      dest.description.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-slate-800">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>EXPLORE INDIA’S HERITAGE & LANDSCAPES</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
          Discover Destinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          From high Himalayan passes and Rajasthani palaces to backwaters and tropical beaches.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-blue-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state, mountain, beach, temple, or city..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-semibold text-xs transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Clean Travel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(dest)}
            className="group cursor-pointer bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-blue-300 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={dest.heroImage}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 text-blue-700 text-xs font-bold shadow-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
                <span>{dest.aiMatchPercentage}% Match</span>
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-blue-200 block">
                  {dest.state}
                </span>
                <h3 className="font-serif-heading text-2xl font-bold text-white">
                  {dest.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {dest.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starting Budget</span>
                  <span className="font-extrabold text-blue-700 text-base">
                    From ₹{dest.estimatedCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
