'use client';

import React from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Train,
  Car,
  Plane,
  Bus,
  Home,
  CheckCircle,
  Bookmark,
  Sparkles,
  X,
  ArrowRight,
  ExternalLink,
  DollarSign,
  BedDouble,
  Compass,
} from 'lucide-react';
import { Destination, TransportOption, StayOption, HotelRoomOption, ItineraryActivity } from '@/types';

interface TripPlanningSidebarProps {
  destination?: Destination;
  durationDays: number;
  travelers: number;
  startLocation: string;
  startDate?: string;
  endDate?: string;
  selectedTransport?: TransportOption;
  selectedStay?: StayOption;
  selectedRoom?: HotelRoomOption;
  selectedActivities?: ItineraryActivity[];
  onSaveTrip: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export default function TripPlanningSidebar({
  destination,
  durationDays,
  travelers,
  startLocation,
  startDate = 'Oct 15, 2026',
  endDate = 'Oct 20, 2026',
  selectedTransport,
  selectedStay,
  selectedRoom,
  selectedActivities = [],
  onSaveTrip,
  isOpenMobile,
  onCloseMobile,
}: TripPlanningSidebarProps) {
  // Calculations for running total budget
  const transportCost = selectedTransport ? selectedTransport.totalCost : 0;
  const stayNightRate = selectedRoom ? selectedRoom.pricePerNight : selectedStay ? selectedStay.pricePerNight : 0;
  const stayCost = stayNightRate * durationDays;

  const activityCost = selectedActivities.length > 0
    ? selectedActivities.reduce((acc, act) => acc + act.estimatedCost, 0)
    : (destination ? destination.baseBudgetBreakdown.activities : 3000);

  const foodCost = destination ? destination.baseBudgetBreakdown.food : 4000;
  const totalEstimated = transportCost + stayCost + activityCost + foodCost;

  const content = (
    <div className="flex flex-col h-full bg-[#FAF8F5] border-l border-[#E8E4DC] shadow-xl overflow-hidden text-[#1E3329]">
      {/* Sidebar Header */}
      <div className="p-5 bg-gradient-to-r from-[#1E3329] via-[#2D4A3C] to-[#1E3329] text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-[#D9A62E]/40 flex items-center justify-center text-[#E3B84B]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-heading font-bold text-base tracking-wide text-white">Your Trip Plan</h3>
            <span className="text-[11px] text-[#FDE68A] block font-medium">Real-Time Assistant Overview</span>
          </div>
        </div>
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1 rounded-full text-stone-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Details Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
        {/* 1. DESTINATION & DATES */}
        <div className="space-y-2 pb-4 border-b border-[#E8E4DC]">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#3F6B55]">
            01. DESTINATION & DATES
          </span>
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-serif-heading font-bold text-lg text-[#1E3329]">
                {destination ? destination.name : 'Select Destination'}
              </h4>
              <span className="text-[#5A6D63] font-semibold text-[11px]">
                {destination ? destination.state : 'India'}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#EBF3EE] text-[#3F6B55] font-bold text-[11px] border border-[#C8DCD0]">
              {durationDays} Days
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-[#5A6D63]">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-[#E8E4DC]">
              <Calendar className="w-3.5 h-3.5 text-[#3F6B55] shrink-0" />
              <span>{startDate} – {endDate}</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-[#E8E4DC]">
              <Users className="w-3.5 h-3.5 text-[#3F6B55] shrink-0" />
              <span>{travelers} Traveler{travelers > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* 2. TRANSPORTATION */}
        <div className="space-y-2 pb-4 border-b border-[#E8E4DC]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#3F6B55]">
              02. TRANSPORTATION
            </span>
            {selectedTransport && (
              <span className="text-xs font-bold text-[#3F6B55]">₹{selectedTransport.totalCost.toLocaleString('en-IN')}</span>
            )}
          </div>

          {selectedTransport ? (
            <div className="p-3 rounded-xl bg-white border border-[#E8E4DC] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1E3329] text-xs flex items-center gap-1.5">
                  {selectedTransport.type === 'Train' && <Train className="w-4 h-4 text-[#3F6B55]" />}
                  {selectedTransport.type === 'Flight' && <Plane className="w-4 h-4 text-[#3F6B55]" />}
                  {selectedTransport.type === 'Bus' && <Bus className="w-4 h-4 text-[#3F6B55]" />}
                  {selectedTransport.type === 'Car' && <Car className="w-4 h-4 text-[#3F6B55]" />}
                  {selectedTransport.title}
                </span>
              </div>
              <p className="text-[11px] text-[#5A6D63] leading-snug font-medium">{selectedTransport.routeText}</p>

              {/* IRCTC Button if Train */}
              {selectedTransport.type === 'Train' && (
                <a
                  href="https://www.irctc.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full py-2 px-3 rounded-lg bg-[#3F6B55] hover:bg-[#325644] text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <span>Search Trains on IRCTC</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {/* Fuel breakdown if Own Car */}
              {selectedTransport.type === 'Car' && selectedTransport.fuelCalc && (
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E4DC] text-[10px] text-[#5A6D63] space-y-1 mt-2">
                  <div className="flex justify-between">
                    <span>Distance ({selectedTransport.fuelCalc.distanceKm} km):</span>
                    <span className="font-bold text-[#1E3329]">₹{selectedTransport.fuelCalc.fuelCostTotal} Fuel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tolls & Parking:</span>
                    <span className="font-bold text-[#1E3329]">₹{selectedTransport.fuelCalc.tollsEstimated + selectedTransport.fuelCalc.parkingEstimated}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[#5A6D63] italic text-[11px]">No transport selected yet.</p>
          )}
        </div>

        {/* 3. HOTEL & ROOM */}
        <div className="space-y-2 pb-4 border-b border-[#E8E4DC]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#3F6B55]">
              03. HOTEL & ROOM
            </span>
            {stayCost > 0 && (
              <span className="text-xs font-bold text-[#3F6B55]">₹{stayCost.toLocaleString('en-IN')}</span>
            )}
          </div>

          {selectedStay ? (
            <div className="p-3 rounded-xl bg-white border border-[#E8E4DC] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-bold text-[#1E3329] text-xs flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-[#3F6B55] shrink-0" />
                    {selectedStay.name}
                  </h5>
                  <p className="text-[11px] text-[#5A6D63] pl-5">{selectedStay.location}</p>
                </div>
              </div>

              {selectedRoom ? (
                <div className="p-2 rounded-lg bg-[#EBF3EE] border border-[#C8DCD0] text-[11px] text-[#1E3329] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <BedDouble className="w-3.5 h-3.5 text-[#3F6B55]" />
                    <span>{selectedRoom.name}</span>
                  </div>
                  <span className="font-bold text-[#3F6B55]">₹{selectedRoom.pricePerNight}/night</span>
                </div>
              ) : (
                <p className="text-[11px] text-[#8C6B1B] font-medium bg-[#FDF8E8] p-1.5 rounded-md border border-[#F3E4B5]">
                  ⚠️ Select a room type in Hotel Options below.
                </p>
              )}
            </div>
          ) : (
            <p className="text-[#5A6D63] italic text-[11px]">No hotel selected yet.</p>
          )}
        </div>

        {/* 4. SELECTED ACTIVITIES */}
        <div className="space-y-2 pb-4 border-b border-[#E8E4DC]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#3F6B55]">
              04. ACTIVITIES & PLACES
            </span>
            <span className="text-xs font-bold text-[#1E3329]">
              {selectedActivities.length > 0 ? `${selectedActivities.length} Chosen` : 'Default Included'}
            </span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {(selectedActivities.length > 0
              ? selectedActivities
              : destination?.defaultItinerary[0]?.activities || []
            ).map((act) => (
              <div
                key={act.id}
                className="p-2 rounded-lg bg-white border border-[#E8E4DC] flex items-center justify-between text-[11px]"
              >
                <span className="font-medium text-[#1E3329] line-clamp-1">{act.activity}</span>
                <span className="font-bold text-[#3F6B55] shrink-0">₹{act.estimatedCost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. ESTIMATED BUDGET BREAKDOWN SUMMARY */}
        <div className="p-4 rounded-2xl bg-[#EBF3EE]/80 border border-[#C8DCD0] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#1E3329]">
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-[#3F6B55]" />
              Estimated Total Budget
            </span>
            <span className="text-base font-extrabold text-[#3F6B55]">
              ₹{totalEstimated.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-1 text-[11px] text-[#5A6D63] pt-1 border-t border-[#C8DCD0]">
            <div className="flex justify-between">
              <span>Transport:</span>
              <span className="font-medium text-[#1E3329]">₹{transportCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Hotel Stay:</span>
              <span className="font-medium text-[#1E3329]">₹{stayCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Activities & Places:</span>
              <span className="font-medium text-[#1E3329]">₹{activityCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Food & Dining (Est.):</span>
              <span className="font-medium text-[#1E3329]">₹{foodCost.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Primary Save Trip Action in Soft Golden Yellow */}
      <div className="p-5 bg-white border-t border-[#E8E4DC]">
        <button
          onClick={onSaveTrip}
          className="w-full py-3.5 px-4 rounded-xl bg-[#D9A62E] hover:bg-[#C59424] active:scale-[0.99] text-[#1E3329] font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#B88A22]/30"
        >
          <Bookmark className="w-4 h-4 fill-[#1E3329]" />
          <span>Save Complete Trip Plan</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Side Panel */}
      <div className="hidden lg:block w-80 xl:w-96 shrink-0 h-[calc(100vh-5rem)] sticky top-20 rounded-3xl overflow-hidden my-4 border border-[#E8E4DC] shadow-md">
        {content}
      </div>

      {/* Mobile Slide-Out Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md h-full shadow-2xl animate-in slide-in-from-right duration-300">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
