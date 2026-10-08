'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ArrowRight, Check, Star, DollarSign, Clock, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Destination } from '@/types';

interface DestinationComparisonProps {
  selectedDestinations: Destination[];
  onClose: () => void;
  onSelectDestination: (dest: Destination) => void;
}

type SortCriteria = 'aiMatch' | 'cost' | 'travelTime' | 'adventure';

export default function DestinationComparison({
  selectedDestinations,
  onClose,
  onSelectDestination,
}: DestinationComparisonProps) {
  const [sortBy, setSortBy] = useState<SortCriteria>('aiMatch');

  const sortedList = [...selectedDestinations].sort((a, b) => {
    if (sortBy === 'cost') return a.estimatedCost - b.estimatedCost;
    if (sortBy === 'travelTime') return a.travelTimeHours - b.travelTimeHours;
    if (sortBy === 'adventure') return b.adventureScore - a.adventureScore;
    return b.aiMatchPercentage - a.aiMatchPercentage;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#0A2136] border border-[#D9A441]/40 rounded-3xl max-w-6xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D9A441]/20 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F4C95D] block">
              DESHDARSHAN INTELLIGENCE
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#F7F0DF]">
              Destination Comparison Matrix
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#071A2B] text-[#F7F0DF]/70 hover:text-white border border-[#D9A441]/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#071A2B] p-3 rounded-2xl border border-[#D9A441]/20 text-xs">
          <div className="flex items-center gap-2 text-[#F7F0DF]/70 font-semibold">
            <SlidersHorizontal className="w-4 h-4 text-[#F4C95D]" />
            <span>Sort Matrix By:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'aiMatch', label: 'Best Match' },
              { id: 'cost', label: 'Lowest Cost' },
              { id: 'travelTime', label: 'Shortest Travel' },
              { id: 'adventure', label: 'Most Adventure' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSortBy(item.id as SortCriteria)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all ${
                  sortBy === item.id
                    ? 'bg-[#F4C95D] text-[#071A2B]'
                    : 'bg-[#0A2136] text-[#F7F0DF]/80 border border-[#D9A441]/20 hover:border-[#F4C95D]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px] grid grid-cols-4 gap-4">
            {/* Metric Names Column */}
            <div className="space-y-6 pt-24 font-semibold text-xs text-[#F7F0DF]/70 border-r border-[#D9A441]/20 pr-4">
              <div className="py-2 border-b border-[#D9A441]/10 text-[#F4C95D] uppercase tracking-wider font-bold">
                AI Match Score
              </div>
              <div className="py-2 border-b border-[#D9A441]/10">Total Estimated Cost</div>
              <div className="py-2 border-b border-[#D9A441]/10">Travel Time from Delhi</div>
              <div className="py-2 border-b border-[#D9A441]/10">Stay Cost Allocation</div>
              <div className="py-2 border-b border-[#D9A441]/10">Activities Budget</div>
              <div className="py-2 border-b border-[#D9A441]/10">Adventure Score</div>
              <div className="py-2 border-b border-[#D9A441]/10">Nature Score</div>
              <div className="py-2 border-b border-[#D9A441]/10">Food & Dining Score</div>
              <div className="py-2 border-b border-[#D9A441]/10">Crowd Level</div>
              <div className="py-2 border-b border-[#D9A441]/10">Best Season</div>
            </div>

            {/* Destination Columns */}
            {sortedList.map((dest) => (
              <div key={dest.id} className="space-y-6 bg-[#071A2B] p-4 rounded-2xl border border-[#D9A441]/20 flex flex-col justify-between">
                {/* Header Card Info */}
                <div className="space-y-2">
                  <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2">
                    <Image src={dest.cardImage} alt={dest.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-[9px] uppercase font-bold text-[#F4C95D]">{dest.state}</span>
                      <h4 className="font-serif-heading text-lg font-bold text-[#F7F0DF]">{dest.name}</h4>
                    </div>
                  </div>
                </div>

                {/* Values Rows */}
                <div className="space-y-6 text-xs text-[#F7F0DF]">
                  <div className="py-2 border-b border-[#D9A441]/10 font-bold text-[#F4C95D] flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{dest.aiMatchPercentage}% Match</span>
                  </div>

                  <div className="py-2 border-b border-[#D9A441]/10 font-extrabold gold-gradient-text text-sm">
                    ₹{dest.estimatedCost.toLocaleString('en-IN')}
                  </div>

                  <div className="py-2 border-b border-[#D9A441]/10">{dest.travelTimeHours} Hours</div>

                  <div className="py-2 border-b border-[#D9A441]/10">
                    ₹{dest.baseBudgetBreakdown.stay.toLocaleString('en-IN')}
                  </div>

                  <div className="py-2 border-b border-[#D9A441]/10">
                    ₹{dest.baseBudgetBreakdown.activities.toLocaleString('en-IN')}
                  </div>

                  <div className="py-2 border-b border-[#D9A441]/10">
                    <div className="w-full bg-[#0A2136] h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full" style={{ width: `${dest.adventureScore}%` }} />
                    </div>
                    <span className="text-[10px] opacity-75">{dest.adventureScore}/100</span>
                  </div>

                  <div className="py-2 border-b border-[#D9A441]/10">
                    <div className="w-full bg-[#0A2136] h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full" style={{ width: `${dest.natureScore}%` }} />
                    </div>
                    <span className="text-[10px] opacity-75">{dest.natureScore}/100</span>
                  </div>

                  <div className="py-2 border-b border-[#D9A441]/10">
                    <div className="w-full bg-[#0A2136] h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-400 h-full" style={{ width: `${dest.foodScore}%` }} />
                    </div>
                    <span className="text-[10px] opacity-75">{dest.foodScore}/100</span>
                  </div>

                  <div className="py-2 border-b border-[#D9A441]/10 font-semibold text-emerald-400">
                    {dest.crowdLevel}
                  </div>

                  <div className="py-2 border-b border-[#D9A441]/10">{dest.bestSeason}</div>
                </div>

                {/* Select Trip Action */}
                <button
                  onClick={() => {
                    onClose();
                    onSelectDestination(dest);
                  }}
                  className="w-full py-2.5 rounded-full gold-gradient-bg text-[#071A2B] font-bold text-xs mt-4 hover:brightness-110 transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>Select {dest.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
