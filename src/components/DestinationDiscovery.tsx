'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Sliders,
  DollarSign,
  TrendingUp,
  Check,
  RotateCcw,
  Calendar,
} from 'lucide-react';
import { Destination, UserPlannerInput } from '@/types';

interface DestinationDiscoveryProps {
  userInput: UserPlannerInput;
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onCompareDestinations: (destIds: string[]) => void;
  onEditPlanner: () => void;
}

export default function DestinationDiscovery({
  userInput,
  destinations,
  onSelectDestination,
  onCompareDestinations,
  onEditPlanner,
}: DestinationDiscoveryProps) {
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const toggleCompareSelect = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-8 text-[#1E3329]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DC] shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B55] block">
            DESTINATION DISCOVERY & BUDGET ENGINE
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#1E3329]">
            Recommended Journeys across India
          </h2>
          <p className="text-xs text-[#5A6D63] font-medium">
            For: <span className="font-bold text-[#3F6B55]">₹{userInput.budget.toLocaleString('en-IN')} Budget</span> &bull; {userInput.travelers} Traveler{userInput.travelers > 1 ? 's' : ''} &bull; {userInput.durationDays} Days &bull; From {userInput.startLocation}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onEditPlanner}
            className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-[#1E3329] hover:text-[#3F6B55] hover:border-[#3F6B55]/30 font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#3F6B55]" />
            <span>Edit Criteria</span>
          </button>

          {selectedForCompare.length > 0 && (
            <button
              onClick={() => onCompareDestinations(selectedForCompare)}
              className="px-5 py-2 rounded-xl bg-[#D9A62E] text-[#1E3329] font-extrabold text-xs shadow-sm flex items-center gap-1.5 border border-[#B88A22]/20"
            >
              <span>Compare ({selectedForCompare.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => {
          const isCompared = selectedForCompare.includes(dest.id);
          return (
            <div
              key={dest.id}
              className={`group bg-white border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 ${
                isCompared
                  ? 'border-[#3F6B55] shadow-md ring-2 ring-[#3F6B55]/20'
                  : 'border-[#E8E4DC] hover:border-[#3F6B55]/40 hover:shadow-md'
              }`}
            >
              {/* Image Header */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={dest.cardImage}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3329]/80 via-transparent to-transparent opacity-85" />

                {/* AI Match Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 text-[#3F6B55] text-xs font-bold shadow-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#D9A62E] text-[#D9A62E]" />
                  <span>{dest.aiMatchPercentage}% Match</span>
                </div>

                {/* Compare Checkbox */}
                <button
                  onClick={() => toggleCompareSelect(dest.id)}
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isCompared
                      ? 'bg-[#3F6B55] text-white border-[#3F6B55]'
                      : 'bg-white/90 text-[#1E3329] border-[#E8E4DC] hover:bg-white'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${isCompared ? 'opacity-100' : 'opacity-0'}`} />
                  <span>Compare</span>
                </button>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FDE68A] block">
                    {dest.state}
                  </span>
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-[#5A6D63] line-clamp-2 leading-relaxed font-medium">
                    "{dest.description}"
                  </p>

                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-[#5A6D63] block uppercase font-bold">Starting Budget</span>
                      <span className="text-lg font-extrabold text-[#3F6B55]">
                        ₹{dest.estimatedCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#5A6D63] block uppercase font-bold">Best Season</span>
                      <span className="font-bold text-[#1E3329] flex items-center gap-1 justify-end text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-[#D9A62E]" />
                        {dest.bestSeason}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EBF3EE] border border-[#C8DCD0] text-xs text-[#1E3329] space-y-1">
                    <span className="font-bold text-[#3F6B55] block text-[10px] uppercase">Why Recommended:</span>
                    <p className="line-clamp-2 leading-relaxed text-[11px] font-medium">
                      {dest.whyRecommended}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E4DC] flex items-center gap-2">
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="flex-1 py-2.5 rounded-xl bg-[#D9A62E] hover:bg-[#C59424] text-[#1E3329] font-extrabold text-xs shadow-xs transition-all text-center flex items-center justify-center gap-1.5 border border-[#B88A22]/20"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleCompareSelect(dest.id)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      isCompared
                        ? 'bg-[#EBF3EE] text-[#3F6B55] border-[#C8DCD0]'
                        : 'bg-[#FAF8F5] text-[#1E3329] border-[#E8E4DC] hover:bg-white'
                    }`}
                  >
                    {isCompared ? 'Compared' : 'Compare'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
