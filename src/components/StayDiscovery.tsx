'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Home, Star, MapPin, Check, Wifi, Coffee, Sparkles, Filter, BedDouble, ArrowRight } from 'lucide-react';
import { Destination, StayOption, HotelRoomOption } from '@/types';
import HotelDetailModal from './HotelDetailModal';

interface StayDiscoveryProps {
  destination: Destination;
  selectedStay?: StayOption;
  selectedRoom?: HotelRoomOption;
  onSelectStayRoom: (stay: StayOption, room: HotelRoomOption) => void;
}

export default function StayDiscovery({
  destination,
  selectedStay,
  selectedRoom,
  onSelectStayRoom,
}: StayDiscoveryProps) {
  const [filterType, setFilterType] = useState<string>('All');
  const [activeHotelModal, setActiveHotelModal] = useState<StayOption | null>(null);

  const stayTypes: string[] = ['All', 'Hostel', 'Hotel', 'Homestay', 'Resort'];

  const filteredStays = destination.stayOptions.filter((stay) => {
    return filterType === 'All' || stay.type === filterType;
  });

  return (
    <div className="space-y-6 bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-xs text-[#1E3329]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#3F6B55] mb-1 block">
            STAY & ACCOMMODATION OPTIONS
          </span>
          <h3 className="font-serif-heading text-2xl font-bold text-[#1E3329]">
            Hotels & Stays in {destination.name}
          </h3>
          <p className="text-xs text-[#5A6D63] font-medium">
            Click any hotel to view available rooms, check-in details, and choose room type.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E4DC] text-xs">
          {stayTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterType === type
                  ? 'bg-[#3F6B55] text-white shadow-xs'
                  : 'text-[#5A6D63] hover:text-[#1E3329]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Stays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredStays.map((stay) => {
          const isSelected = selectedStay?.id === stay.id;
          return (
            <div
              key={stay.id}
              onClick={() => setActiveHotelModal(stay)}
              className={`cursor-pointer group bg-[#FAF8F5] border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-[#3F6B55] ring-2 ring-[#3F6B55]/20 bg-[#EBF3EE] shadow-sm'
                  : 'border-[#E8E4DC] hover:border-[#3F6B55]/40 hover:bg-white'
              }`}
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={stay.image}
                  alt={stay.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3329]/80 via-transparent to-transparent opacity-85" />

                {stay.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#3F6B55] text-white text-[10px] font-bold shadow-xs">
                    {stay.badge}
                  </span>
                )}

                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/95 text-[#8C6B1B] text-xs font-bold shadow-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#D9A62E] text-[#D9A62E]" />
                  <span>{stay.rating}</span>
                </div>

                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-[#FDE68A] block">{stay.type}</span>
                  <h4 className="font-serif-heading font-bold text-base line-clamp-1">
                    {stay.name}
                  </h4>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs text-[#5A6D63] flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#3F6B55] shrink-0" />
                    <span>{stay.location} &bull; {stay.distanceFromAttractions}</span>
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {stay.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-0.5 rounded bg-white border border-[#E8E4DC] text-[10px] font-medium text-[#5A6D63]"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Selection Action */}
                <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#5A6D63] block font-medium">From / Night</span>
                    <span className="font-extrabold text-[#3F6B55] text-base">
                      ₹{stay.pricePerNight.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotelModal(stay);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#3F6B55] text-white'
                        : 'bg-[#D9A62E] text-[#1E3329] hover:bg-[#C59424] border border-[#B88A22]/20'
                    }`}
                  >
                    <span>{isSelected ? (selectedRoom ? selectedRoom.name : 'Selected') : 'Select Room'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hotel Rooms Details Modal */}
      {activeHotelModal && (
        <HotelDetailModal
          hotel={activeHotelModal}
          selectedRoom={selectedStay?.id === activeHotelModal.id ? selectedRoom : undefined}
          onSelectRoom={onSelectStayRoom}
          onClose={() => setActiveHotelModal(null)}
        />
      )}
    </div>
  );
}
