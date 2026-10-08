'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Compass,
  TrendingDown,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  ArrowRight,
  Sun,
  Flame,
  CheckCircle,
  Tag,
  Clock,
  Sparkles,
  Hotel,
} from 'lucide-react';
import { Destination, UserPlannerInput } from '@/types';
import { getDynamicSeasonalMonths, rankDestinationsForMonth } from '@/services/seasonalEngine';
import { INITIAL_DESTINATIONS } from '@/data/destinationsData';

interface TravelDashboardProps {
  onStartPlanningWithInput?: (input: Partial<UserPlannerInput>) => void;
  onOpenPlanner: () => void;
  onSelectDestination: (dest: Destination) => void;
  onExploreClick: () => void;
  savedTripsCount: number;
}

export default function TravelDashboard({
  onOpenPlanner,
  onSelectDestination,
  onExploreClick,
  savedTripsCount,
}: TravelDashboardProps) {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [selectedMonthTab, setSelectedMonthTab] = useState<number>(0);
  const [quickBudgetFilter, setQuickBudgetFilter] = useState<number>(50000);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const seasonalInfo = getDynamicSeasonalMonths(currentDate);
  const activeMonthInfo = seasonalInfo.threeMonthsList[selectedMonthTab];
  const rankedDestinations = rankDestinationsForMonth(INITIAL_DESTINATIONS, activeMonthInfo.monthIndex);

  const cheapTripDestinations = INITIAL_DESTINATIONS.filter(
    (d) => d.estimatedCost <= quickBudgetFilter * 1.15
  );

  return (
    <div className="space-y-10 pb-16 text-[#1E3329]">
      {/* 1. HERO BANNER SPOTLIGHT */}
      <section className="relative rounded-3xl overflow-hidden border border-[#D9A62E]/30 bg-gradient-to-r from-[#1E3329] via-[#2D4A3C] to-[#1E3329] text-white shadow-md p-6 sm:p-10">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80"
            alt="Season Spotlight"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FDE68A] text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5 text-[#D9A62E]" />
            <span>SEASON INTELLIGENCE &bull; {activeMonthInfo.label.toUpperCase()}</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Welcome to DeshDarshan 👋 <br />
            <span className="text-[#E3B84B]">
              {seasonalInfo.currentMonth.monthName} is ideal for exploring India.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed font-medium">
            {seasonalInfo.currentMonth.summary} Plan your journey within your budget with verified stays, route planning, and interactive room options.
          </p>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onOpenPlanner}
              className="px-6 py-2.5 rounded-xl bg-[#D9A62E] hover:bg-[#C59424] text-[#1E3329] font-extrabold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-2 border border-[#B88A22]/20"
            >
              <Sparkles className="w-4 h-4 fill-[#1E3329]" />
              <span>Plan New Trip</span>
            </button>

            <button
              onClick={onExploreClick}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#E3B84B]" />
              <span>Explore Destinations</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. BEST PLACES THIS MONTH */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E4DC] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#3F6B55] mb-1 block">
              SEASONAL DESTINATIONS
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1E3329]">
              Top Destinations for {activeMonthInfo.monthName}
            </h2>
          </div>

          {/* Month Selector Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E8E4DC] text-xs shadow-xs">
            {seasonalInfo.threeMonthsList.map((m, idx) => (
              <button
                key={m.label}
                onClick={() => setSelectedMonthTab(idx)}
                className={`px-4 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedMonthTab === idx
                    ? 'bg-[#3F6B55] text-white shadow-xs'
                    : 'text-[#5A6D63] hover:text-[#1E3329]'
                }`}
              >
                {m.monthName}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankedDestinations.slice(0, 6).map(({ destination: dest, whyVisitNow }) => (
            <div
              key={dest.id}
              className="group bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#3F6B55]/40 transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={dest.cardImage}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3329]/80 via-transparent to-transparent opacity-85" />

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 text-[#3F6B55] text-xs font-bold shadow-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#D9A62E] text-[#D9A62E]" />
                  <span>{dest.aiMatchPercentage}% Match</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FDE68A] block">
                    {dest.state}
                  </span>
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    {dest.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs text-[#5A6D63] line-clamp-2 leading-relaxed font-medium">
                    {dest.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-[11px] text-[#1E3329]">
                    <span className="font-bold text-[#3F6B55]">Why visit now: </span>
                    {whyVisitNow}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#5A6D63] block">Estimated Cost</span>
                    <span className="text-base font-extrabold text-[#3F6B55]">
                      ₹{dest.estimatedCost.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#5A6D63] ml-1">/ {dest.recommendedDurationDays} Days</span>
                  </div>

                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="px-4 py-2 rounded-xl bg-[#EBF3EE] hover:bg-[#3F6B55] hover:text-white text-[#1E3329] font-bold text-xs transition-all flex items-center gap-1 border border-[#C8DCD0]"
                  >
                    <span>View Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CHEAP TRIP DISCOVERY */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E4DC] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#3F6B55] mb-1 block">
              BUDGET TRIP FINDER
            </span>
            <h2 className="font-serif-heading text-2xl font-bold text-[#1E3329]">
              Where Can I Go With My Budget?
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[20000, 30000, 50000, 100000].map((amt) => (
              <button
                key={amt}
                onClick={() => setQuickBudgetFilter(amt)}
                className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${
                  quickBudgetFilter === amt
                    ? 'bg-[#3F6B55] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#1E3329] hover:bg-[#EBF3EE] border border-[#E8E4DC]'
                }`}
              >
                ₹{(amt / 1000).toFixed(0)}k Budget
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cheapTripDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="cursor-pointer bg-[#FAF8F5] border border-[#E8E4DC] rounded-2xl p-4 hover:border-[#3F6B55] hover:bg-white transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-[#3F6B55]">{dest.state}</span>
                <span className="text-xs font-bold text-[#D9A62E]">
                  ₹{Math.round(dest.estimatedCost * 0.85).toLocaleString('en-IN')} &ndash; ₹{dest.estimatedCost.toLocaleString('en-IN')}
                </span>
              </div>
              <h4 className="font-serif-heading font-bold text-base text-[#1E3329] mb-1">{dest.name}</h4>
              <p className="text-[11px] text-[#5A6D63] line-clamp-2 mb-3">{dest.tagline}</p>

              <div className="flex items-center justify-between text-[10px] text-[#5A6D63] pt-2 border-t border-[#E8E4DC]">
                <span>⏱ {dest.recommendedDurationDays} Days</span>
                <span className="text-[#3F6B55] font-bold">Build Plan &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRICE WATCH & DESTINATION SPOTLIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#E8E4DC] rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#D9A62E]" />
              <h3 className="font-serif-heading font-bold text-lg text-[#1E3329]">
                Smart Price Watch & Fare Alerts
              </h3>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#EBF3EE] text-[#3F6B55] font-bold border border-[#C8DCD0]">
              UPDATED TODAY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#3F6B55]">FLIGHT DROP</span>
                  <h4 className="font-bold text-sm text-[#1E3329]">Delhi &rarr; Srinagar (SXR)</h4>
                </div>
                <span className="text-xs font-bold text-[#3F6B55]">18% LOWER</span>
              </div>
              <p className="text-xs text-[#5A6D63]">
                Current: <span className="font-bold text-[#1E3329]">₹4,200</span> (Avg ₹5,150). Estimated saving: ₹1,900/traveler.
              </p>
              <button onClick={onOpenPlanner} className="text-[#3F6B55] font-bold hover:underline text-xs">
                Plan Kashmir &rarr;
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#3F6B55]">HOTEL DEAL</span>
                  <h4 className="font-bold text-sm text-[#1E3329]">Old Manali Stays</h4>
                </div>
                <span className="text-xs font-bold text-[#3F6B55]">22% LOWER</span>
              </div>
              <p className="text-xs text-[#5A6D63]">
                Heritage homestay rooms from <span className="font-bold text-[#1E3329]">₹950/night</span>.
              </p>
              <button onClick={onOpenPlanner} className="text-[#3F6B55] font-bold hover:underline text-xs">
                Explore Stays &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Destination Spotlight Card */}
        <div className="bg-white border border-[#E8E4DC] rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-[#D9A62E] fill-[#D9A62E]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#3F6B55]">
                SPOTLIGHT DESTINATION
              </span>
            </div>

            <div className="relative h-36 rounded-2xl overflow-hidden mb-3">
              <Image
                src="https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=600&q=80"
                alt="Auli Uttarakhand"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3329]/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2 left-3 text-white">
                <h4 className="font-serif-heading text-lg font-bold">🏔️ AULI, UTTARAKHAND</h4>
                <p className="text-[10px] text-[#FDE68A]">96% AI Match &bull; Peak Vistas</p>
              </div>
            </div>

            <p className="text-xs text-[#5A6D63] leading-relaxed">
              Clear autumn/winter weather with unobstructed 360° views of Nanda Devi. Perfect for mountain lovers within a ₹50K budget.
            </p>
          </div>

          <button
            onClick={() => onSelectDestination(INITIAL_DESTINATIONS.find((d) => d.id === 'auli') || INITIAL_DESTINATIONS[0])}
            className="w-full py-2.5 rounded-xl bg-[#D9A62E] hover:bg-[#C59424] text-[#1E3329] font-extrabold text-xs shadow-xs text-center border border-[#B88A22]/20"
          >
            Explore Auli Plan &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
