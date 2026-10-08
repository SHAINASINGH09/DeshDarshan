'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Heart,
  Home,
  Navigation,
  ArrowRight,
  Minus,
  Plus,
  Check,
  Zap,
} from 'lucide-react';
import { UserPlannerInput, InterestCategory, StayType, TravelPreference, TransportMode, TravelPace } from '@/types';

interface SmartTripPlannerProps {
  onComplete: (input: UserPlannerInput) => void;
  initialValues?: Partial<UserPlannerInput>;
}

const INTEREST_OPTIONS: { id: InterestCategory; label: string; icon: string }[] = [
  { id: 'Mountains', label: 'Mountains', icon: '🏔️' },
  { id: 'Beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'Adventure', label: 'Adventure', icon: '🏕️' },
  { id: 'Heritage', label: 'Heritage', icon: '🏛️' },
  { id: 'Food', label: 'Food', icon: '🍛' },
  { id: 'Nature', label: 'Nature', icon: '🌿' },
  { id: 'Wellness', label: 'Wellness', icon: '🧘' },
  { id: 'Spiritual', label: 'Spiritual', icon: '🛕' },
  { id: 'Photography', label: 'Photography', icon: '📸' },
  { id: 'Culture', label: 'Culture', icon: '🎭' },
  { id: 'Nightlife', label: 'Nightlife', icon: '🌃' },
  { id: 'Shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'Desert', label: 'Desert', icon: '🏜️' },
  { id: 'Water Activities', label: 'Water Activities', icon: '🌊' },
];

const STAY_OPTIONS: StayType[] = ['Hostel', 'Hotel', 'Homestay', 'Resort', 'Budget Stay'];
const PREFERENCE_OPTIONS: TravelPreference[] = ['Cheapest', 'Fastest', 'Balanced'];
const TRANSPORT_OPTIONS: TransportMode[] = ['Any', 'Flight', 'Train', 'Bus', 'Car'];
const PACE_OPTIONS: { id: TravelPace; title: string; desc: string }[] = [
  { id: 'Relaxed', title: 'Relaxed Pace', desc: '2–3 major activities per day' },
  { id: 'Balanced', title: 'Balanced Pace', desc: '3–5 activities per day' },
  { id: 'Packed', title: 'Packed Pace', desc: '5+ activities per day' },
];

export default function SmartTripPlanner({ onComplete, initialValues }: SmartTripPlannerProps) {
  const [budget, setBudget] = useState<number>(initialValues?.budget || 50000);
  const [travelers, setTravelers] = useState<number>(initialValues?.travelers || 2);
  const [durationDays, setDurationDays] = useState<number>(initialValues?.durationDays || 5);
  const [startLocation, setStartLocation] = useState<string>(initialValues?.startLocation || 'Delhi / Ghaziabad');
  const [selectedInterests, setSelectedInterests] = useState<InterestCategory[]>(
    initialValues?.interests || ['Mountains', 'Adventure']
  );
  const [stayPreference, setStayPreference] = useState<StayType>(initialValues?.stayPreference || 'Hotel');
  const [travelPreference, setTravelPreference] = useState<TravelPreference>(initialValues?.travelPreference || 'Balanced');
  const [preferredTransport, setPreferredTransport] = useState<TransportMode>(initialValues?.preferredTransport || 'Any');
  const [travelPace, setTravelPace] = useState<TravelPace>(initialValues?.travelPace || 'Balanced');

  const toggleInterest = (interest: InterestCategory) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setStartLocation('Delhi NCR (Detected GPS)'),
        () => setStartLocation('Delhi / Ghaziabad')
      );
    } else {
      setStartLocation('Delhi / Ghaziabad');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      budget,
      travelers,
      durationDays,
      startLocation,
      interests: selectedInterests,
      stayPreference,
      travelPreference,
      preferredTransport,
      travelPace,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 text-slate-800">
      {/* Planner Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>TRIP PLANNING ENGINE</span>
        </div>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
          Plan Your Journey
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Tell us your budget, duration, and preferences. DeshDarshan builds the optimal trip.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* STEP 01 — YOUR BUDGET */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                01
              </span>
              <h3 className="font-serif-heading text-xl font-bold text-slate-900">YOUR BUDGET</h3>
            </div>
            <span className="text-2xl font-extrabold text-blue-700">
              ₹{budget.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>₹10,000 (Backpacker)</span>
              <span>₹50,000 (Comfort)</span>
              <span>₹2,50,000+ (Luxury)</span>
            </div>

            <input
              type="range"
              min={10000}
              max={250000}
              step={2000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            {/* Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[20000, 35000, 50000, 80000, 120000].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setBudget(preset)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    budget === preset
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  ₹{(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STEP 02 & STEP 03 — TRAVELERS & DURATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* STEP 02 — TRAVELERS */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                02
              </span>
              <h3 className="font-serif-heading text-lg font-bold text-slate-900">TRAVELERS</h3>
            </div>

            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm text-slate-800">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">{travelers} Traveler{travelers > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-lg text-blue-700 w-4 text-center">{travelers}</span>
                <button
                  type="button"
                  onClick={() => setTravelers(travelers + 1)}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* STEP 03 — TRIP DURATION */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                03
              </span>
              <h3 className="font-serif-heading text-lg font-bold text-slate-900">TRIP DURATION</h3>
            </div>

            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm text-slate-800">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">{durationDays} Days</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-lg text-blue-700 w-4 text-center">{durationDays}</span>
                <button
                  type="button"
                  onClick={() => setDurationDays(durationDays + 1)}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 04 — STARTING LOCATION */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              04
            </span>
            <h3 className="font-serif-heading text-xl font-bold text-slate-900">STARTING LOCATION</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-blue-600" />
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Search city, airport or station (e.g. Delhi / Ghaziabad)"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="px-4 py-3 bg-slate-100 border border-slate-200 text-blue-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Use GPS Location</span>
            </button>
          </div>
        </div>

        {/* STEP 05 — INTERESTS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                05
              </span>
              <h3 className="font-serif-heading text-xl font-bold text-slate-900">INTERESTS</h3>
            </div>
            <span className="text-xs font-semibold text-blue-600">Select multiple</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {INTEREST_OPTIONS.map((item) => {
              const isSelected = selectedInterests.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleInterest(item.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 06 — STAY PREFERENCE */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              06
            </span>
            <h3 className="font-serif-heading text-xl font-bold text-slate-900">STAY PREFERENCE</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {STAY_OPTIONS.map((type) => {
              const isSelected = stayPreference === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => setStayPreference(type)}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 07 — TRAVEL PREFERENCE */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              07
            </span>
            <h3 className="font-serif-heading text-xl font-bold text-slate-900">TRAVEL PREFERENCE</h3>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
                Transport Mode
              </span>
              <div className="grid grid-cols-5 gap-2">
                {TRANSPORT_OPTIONS.map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setPreferredTransport(mode)}
                    className={`py-2 rounded-xl border font-bold text-xs text-center transition-all ${
                      preferredTransport === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
                Travel Pace
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACE_OPTIONS.map((pace) => (
                  <button
                    type="button"
                    key={pace.id}
                    onClick={() => setTravelPace(pace.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      travelPace === pace.id
                        ? 'bg-blue-50 border-blue-500 text-blue-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{pace.title}</div>
                    <div className="text-[10px] text-slate-500">{pace.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Discover Destinations & Build Trip</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
