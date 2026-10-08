'use client';

import React from 'react';
import Image from 'next/image';
import {
  Bookmark,
  Calendar,
  MapPin,
  Clock,
  Trash2,
  Eye,
  Edit,
  Sparkles,
  Train,
  Car,
  Plane,
  Bus,
  Home,
  BedDouble,
  DollarSign,
} from 'lucide-react';
import { SavedTrip } from '@/types';

interface SavedTripsViewProps {
  savedTrips: SavedTrip[];
  onViewTrip: (trip: SavedTrip) => void;
  onEditTrip: (trip: SavedTrip) => void;
  onDeleteTrip: (tripId: string) => void;
  onStartPlanning: () => void;
}

export default function SavedTripsView({
  savedTrips,
  onViewTrip,
  onEditTrip,
  onDeleteTrip,
  onStartPlanning,
}: SavedTripsViewProps) {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-[#1E3329]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#3F6B55] mb-1 block">
            MY SAVED TRIPS & PLANS
          </span>
          <h1 className="font-serif-heading text-3xl font-extrabold text-[#1E3329]">
            Saved Trip Plans ({savedTrips.length})
          </h1>
          <p className="text-xs text-[#5A6D63] font-medium">
            Access your saved itineraries, hotel choices, transportation details, and budget allocations.
          </p>
        </div>

        <button
          onClick={onStartPlanning}
          className="px-5 py-2.5 rounded-xl bg-[#D9A62E] hover:bg-[#C59424] text-[#1E3329] font-extrabold text-xs shadow-sm transition-all flex items-center gap-2 border border-[#B88A22]/20"
        >
          <Sparkles className="w-4 h-4 fill-[#1E3329]" />
          <span>Plan New Journey</span>
        </button>
      </div>

      {/* Empty State */}
      {savedTrips.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-[#E8E4DC] shadow-xs text-center space-y-4 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#EBF3EE] text-[#3F6B55] flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-serif-heading text-2xl font-bold text-[#1E3329]">No Saved Trips Yet</h3>
          <p className="text-xs text-[#5A6D63] leading-relaxed font-medium">
            You haven’t saved any travel plans. Use our trip planning engine to choose your destination, transportation, and hotel room, then click "Save Trip".
          </p>
          <button
            onClick={onStartPlanning}
            className="px-6 py-3 rounded-xl bg-[#D9A62E] text-[#1E3329] font-extrabold text-xs shadow-sm"
          >
            Start Planning Now
          </button>
        </div>
      ) : (
        /* Saved Trips Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white border border-[#E8E4DC] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image & Header */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={trip.destination.cardImage}
                  alt={trip.destination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3329]/80 via-transparent to-transparent opacity-85" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[#1E3329] text-[11px] font-bold shadow-xs">
                  {trip.travelDatesText || `${trip.userInput.durationDays} Days`}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-[#FDE68A] block">
                    {trip.destination.state}
                  </span>
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    {trip.title}
                  </h3>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3 text-xs">
                  {/* Transportation & Hotel Summary */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC]">
                    <div className="flex items-center justify-between text-[#1E3329] font-semibold">
                      <span className="flex items-center gap-1.5">
                        {trip.selectedTransport.type === 'Train' && <Train className="w-4 h-4 text-[#3F6B55]" />}
                        {trip.selectedTransport.type === 'Flight' && <Plane className="w-4 h-4 text-[#3F6B55]" />}
                        {trip.selectedTransport.type === 'Bus' && <Bus className="w-4 h-4 text-[#3F6B55]" />}
                        {trip.selectedTransport.type === 'Car' && <Car className="w-4 h-4 text-[#3F6B55]" />}
                        {trip.selectedTransport.title}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#1E3329] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Home className="w-4 h-4 text-[#3F6B55] shrink-0" />
                        <span className="line-clamp-1">{trip.selectedStay.name}</span>
                      </span>
                    </div>

                    {trip.selectedRoom && (
                      <div className="text-[11px] text-[#3F6B55] font-semibold pl-5">
                        Room: {trip.selectedRoom.name} (₹{trip.selectedRoom.pricePerNight}/night)
                      </div>
                    )}
                  </div>

                  {/* Budget & Date Saved */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-[10px] text-[#5A6D63] block font-medium">Estimated Total</span>
                      <span className="font-extrabold text-[#3F6B55] text-base">
                        ₹{trip.budgetBreakdown.totalBudget.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#5A6D63] block font-medium">Saved Date</span>
                      <span className="text-[11px] font-medium text-[#5A6D63]">{trip.createdAt}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#E8E4DC] flex items-center gap-2">
                  <button
                    onClick={() => onViewTrip(trip)}
                    className="flex-1 py-2 rounded-xl bg-[#D9A62E] hover:bg-[#C59424] text-[#1E3329] font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1 border border-[#B88A22]/20"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Plan</span>
                  </button>

                  <button
                    onClick={() => onEditTrip(trip)}
                    className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBF3EE] text-[#1E3329] font-bold text-xs border border-[#E8E4DC]"
                    title="Edit Trip"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
