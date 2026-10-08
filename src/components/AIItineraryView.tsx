'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Sliders,
  ChevronDown,
  Info,
  ShieldCheck,
  Bookmark,
} from 'lucide-react';
import { Destination, ItineraryDay, TravelPace, WeatherAlert } from '@/types';
import { aiAdaptItinerary } from '@/services/aiService';

interface AIItineraryViewProps {
  destination: Destination;
  itinerary: ItineraryDay[];
  onUpdateItinerary: (newItinerary: ItineraryDay[]) => void;
  travelPace: TravelPace;
  onChangePace: (pace: TravelPace) => void;
  onSaveTrip: () => void;
}

export default function AIItineraryView({
  destination,
  itinerary,
  onUpdateItinerary,
  travelPace,
  onChangePace,
  onSaveTrip,
}: AIItineraryViewProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [isReplanning, setIsReplanning] = useState<boolean>(false);
  const [replanApplied, setReplanApplied] = useState<boolean>(false);
  const [showReplanModal, setShowReplanModal] = useState<boolean>(false);

  const sampleWeatherAlert: WeatherAlert = {
    id: 'alert-solang-rain',
    destinationName: destination.name,
    alertType: 'weather',
    title: 'High Altitude Rain Advisory',
    description: `Rain and low-hanging clouds are expected in ${destination.name} high pass area between 12 PM – 04 PM today.`,
    affectedTime: 'Today 12 PM – 4 PM',
    aiRecommendation: `Move high-altitude outdoor flight to tomorrow and visit Old Town indoor heritage craft cafes today.`,
    alternativeActivity: {
      id: 'alt-indoor-culture',
      timeSlot: '12:30 PM (Adapted)',
      activity: 'Old Town Heritage Craft Workshop & Himalayan Cafe Trail',
      location: 'Old Town Square',
      estimatedCost: 650,
      travelTime: '15 mins',
      duration: '2.5 hrs',
      whyRecommended: 'Cozy indoor wood-fire cafe experience safe from mountain rain advisory.',
      category: 'Culture & Food',
    },
  };

  const handleApplySmartReplan = async () => {
    setIsReplanning(true);
    const { updatedItinerary } = await aiAdaptItinerary(destination, sampleWeatherAlert, itinerary);
    onUpdateItinerary(updatedItinerary);
    setIsReplanning(false);
    setReplanApplied(true);
    setShowReplanModal(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">
            DAY-BY-DAY ITINERARY
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
            Daily Itinerary for {destination.name}
          </h2>
          <p className="text-xs text-slate-500">
            Pace: <span className="font-bold text-blue-700">{travelPace}</span> • Tailored to your target budget.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Pace selector */}
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
            {(['Relaxed', 'Balanced', 'Packed'] as TravelPace[]).map((pace) => (
              <button
                key={pace}
                onClick={() => onChangePace(pace)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  travelPace === pace
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {pace}
              </button>
            ))}
          </div>

          <button
            onClick={onSaveTrip}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <Bookmark className="w-4 h-4 fill-current text-white" />
            <span>Save Trip Plan</span>
          </button>
        </div>
      </div>

      {/* Smart Replan Advisory */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-800">
                REAL-TIME WEATHER ADVISORY
              </span>
              {replanApplied && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                  ✓ REPLAN APPLIED
                </span>
              )}
            </div>
            <p className="text-slate-700">{sampleWeatherAlert.description}</p>
            <p className="text-blue-800 font-medium">
              <span className="font-bold">Recommendation: </span>
              {sampleWeatherAlert.aiRecommendation}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowReplanModal(true)}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all shrink-0 flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Apply Smart Replan</span>
        </button>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {itinerary.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => setActiveDay(day.dayNumber)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeDay === day.dayNumber
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Day 0{day.dayNumber} (Est. ₹{day.estimatedSpend.toLocaleString('en-IN')})
          </button>
        ))}
      </div>

      {/* Day Activities List */}
      {itinerary.map((day) => {
        if (day.dayNumber !== activeDay) return null;
        return (
          <div key={day.dayNumber} className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-serif-heading text-xl font-bold text-slate-900">
                Day 0{day.dayNumber} — {day.title}
              </h3>
              <span className="text-xs font-bold text-blue-700">
                Day Spend: ₹{day.estimatedSpend.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
              {day.activities.map((act, idx) => (
                <div
                  key={act.id}
                  className="relative pl-12 p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs hover:border-blue-300 transition-all"
                >
                  <div className="absolute left-3.5 top-5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                    {idx + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {act.timeSlot}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-medium">
                        {act.category}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-slate-900">
                      Est. ₹{act.estimatedCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h4 className="font-serif-heading text-base font-bold text-slate-900">
                    {act.activity}
                  </h4>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      {act.location}
                    </span>
                    <span>• Travel: {act.travelTime}</span>
                    <span>• Duration: {act.duration}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <span className="font-bold text-blue-700">Why recommended: </span>
                    {act.whyRecommended}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Smart Replan Comparison Modal */}
      {showReplanModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-serif-heading font-bold text-xl text-slate-900">
                Smart Replan Before & After
              </h3>
              <button onClick={() => setShowReplanModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-800 uppercase text-[10px] block">Original (Risky)</span>
                <p className="text-slate-700 font-semibold">Paragliding in Solang</p>
                <p className="text-rose-700 text-[11px]">Advisory: Rain at peak 12–4 PM</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-800 uppercase text-[10px] block">Adapted Schedule</span>
                <p className="text-slate-700 font-semibold">Old Town Craft Workshop</p>
                <p className="text-emerald-700 text-[11px]">Safe indoor craft experience</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReplanModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Keep Current
              </button>
              <button
                onClick={handleApplySmartReplan}
                disabled={isReplanning}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm"
              >
                {isReplanning ? 'Adapting...' : 'Apply Live Replan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
