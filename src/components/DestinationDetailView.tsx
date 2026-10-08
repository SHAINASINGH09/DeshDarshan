'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  MapPin,
  Clock,
  Sun,
  ShieldCheck,
  Compass,
  ArrowRight,
  ChevronLeft,
  Calendar,
  DollarSign,
  Star,
  CheckCircle,
} from 'lucide-react';
import { Destination } from '@/types';

interface DestinationDetailViewProps {
  destination: Destination;
  onBack: () => void;
  onProceedToItinerary: () => void;
}

export default function DestinationDetailView({
  destination,
  onBack,
  onProceedToItinerary,
}: DestinationDetailViewProps) {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-10 text-slate-800">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Recommendations</span>
        </button>

        <button
          onClick={onProceedToItinerary}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Build Complete Trip Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl min-h-[400px] flex items-end p-8 sm:p-12 text-white">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              {destination.state}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm">
              ★ {destination.aiMatchPercentage}% Match
            </span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl font-extrabold text-white">
            {destination.name}
          </h1>

          <p className="text-base sm:text-xl text-blue-200 font-medium">
            "{destination.tagline}"
          </p>

          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Best Season</span>
          <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-600" />
            {destination.bestSeason}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Cost</span>
          <span className="font-extrabold text-blue-700 text-base">
            ₹{destination.estimatedCost.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Recommended Duration</span>
          <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-600" />
            {destination.recommendedDurationDays} Days
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Weather</span>
          <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span>{destination.weatherSummary.icon}</span>
            {destination.weatherSummary.temp} • {destination.weatherSummary.condition}
          </span>
        </div>
      </div>

      {/* Hidden Gems Section */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block">
              BEYOND THE TOURIST TRAIL
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-white">
              Offbeat Places & Hidden Experiences
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destination.hiddenGems.map((gem) => (
            <div
              key={gem.id}
              className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden p-5 flex flex-col sm:flex-row gap-5"
            >
              <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                <Image src={gem.image} alt={gem.name} fill className="object-cover" />
              </div>

              <div className="space-y-2 flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">
                    {gem.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    Est. ₹{gem.estimatedCost}
                  </span>
                </div>

                <h3 className="font-serif-heading font-bold text-base text-white">
                  {gem.name}
                </h3>

                <p className="text-[#A9B0B5] line-clamp-2 leading-relaxed">
                  {gem.description}
                </p>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200">
                  <span className="font-bold text-blue-300">Why special: </span>
                  {gem.whySpecial}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Footer */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
        <h3 className="font-serif-heading text-2xl font-bold text-slate-900">
          Ready to Build Your Complete Plan for {destination.name}?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Choose transportation, select your hotel room, and save your trip to your device.
        </p>

        <button
          onClick={onProceedToItinerary}
          className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-md transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 fill-current" />
          <span>Build Complete Trip Plan</span>
        </button>
      </div>
    </div>
  );
}
