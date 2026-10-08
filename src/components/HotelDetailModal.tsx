'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Star,
  MapPin,
  Check,
  BedDouble,
  Users,
  Clock,
  ShieldCheck,
  Wifi,
  Coffee,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { StayOption, HotelRoomOption } from '@/types';

interface HotelDetailModalProps {
  hotel: StayOption;
  selectedRoom?: HotelRoomOption;
  onSelectRoom: (hotel: StayOption, room: HotelRoomOption) => void;
  onClose: () => void;
}

export default function HotelDetailModal({
  hotel,
  selectedRoom,
  onSelectRoom,
  onClose,
}: HotelDetailModalProps) {
  const [activeRoom, setActiveRoom] = useState<HotelRoomOption>(
    selectedRoom || hotel.roomTypes[0]
  );

  const handleConfirmRoomChoice = (room: HotelRoomOption) => {
    setActiveRoom(room);
    onSelectRoom(hotel, room);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white border border-[#E8E4DC] rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 my-6 animate-in fade-in zoom-in-95 duration-200 text-[#1E3329]">
        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF8F5] text-[#5A6D63] hover:text-[#1E3329] hover:bg-[#EBF3EE] transition-colors border border-[#E8E4DC]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hotel Header Hero Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Main Image */}
          <div className="relative h-56 md:h-full min-h-[200px] rounded-2xl overflow-hidden border border-[#E8E4DC]">
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              className="object-cover"
            />
            {hotel.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#3F6B55] text-white text-[10px] font-bold shadow-xs">
                {hotel.badge}
              </span>
            )}
          </div>

          {/* Hotel Info Details */}
          <div className="md:col-span-2 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B55]">
                  {hotel.type} &bull; ACCOMMODATION DETAILS
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#8C6B1B] bg-[#FDF8E8] px-2.5 py-1 rounded-full border border-[#F3E4B5]">
                  <Star className="w-3.5 h-3.5 fill-[#D9A62E] text-[#D9A62E]" />
                  <span>{hotel.rating} / 5.0 Rating</span>
                </div>
              </div>

              <h2 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-[#1E3329]">
                {hotel.name}
              </h2>

              <p className="text-xs text-[#5A6D63] flex items-center gap-1 font-medium">
                <MapPin className="w-4 h-4 text-[#3F6B55] shrink-0" />
                <span>{hotel.location} &bull; {hotel.distanceFromAttractions}</span>
              </p>

              {hotel.description && (
                <p className="text-xs text-[#5A6D63] leading-relaxed pt-1 font-medium">
                  {hotel.description}
                </p>
              )}

              {/* Check-in / Check-out */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC]">
                  <span className="text-[10px] text-[#5A6D63] block font-medium">Check-in Time</span>
                  <span className="font-bold text-[#1E3329] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#3F6B55]" />
                    {hotel.checkInTime || '12:00 PM'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC]">
                  <span className="text-[10px] text-[#5A6D63] block font-medium">Check-out Time</span>
                  <span className="font-bold text-[#1E3329] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#3F6B55]" />
                    {hotel.checkOutTime || '11:00 AM'}
                  </span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {hotel.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8E4DC] text-[11px] font-semibold text-[#1E3329]"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROOM TYPES & SELECTION SECTION */}
        <div className="space-y-4 pt-4 border-t border-[#E8E4DC]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-heading font-bold text-xl text-[#1E3329]">
                Available Room Types ({hotel.roomTypes.length})
              </h3>
              <p className="text-xs text-[#5A6D63] font-medium">
                Select a room option to update your trip plan.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#3F6B55] bg-[#EBF3EE] px-3 py-1 rounded-full border border-[#C8DCD0]">
              Verified Rates
            </span>
          </div>

          <div className="space-y-4">
            {hotel.roomTypes.map((room) => {
              const isCurrentSelected = activeRoom?.id === room.id;
              return (
                <div
                  key={room.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isCurrentSelected
                      ? 'bg-[#EBF3EE] border-[#3F6B55] shadow-sm ring-2 ring-[#3F6B55]/20'
                      : 'bg-[#FAF8F5] border-[#E8E4DC] hover:border-[#3F6B55]/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-28 h-24 rounded-xl overflow-hidden shrink-0 border border-[#E8E4DC]">
                      <Image src={room.image} alt={room.name} fill className="object-cover" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-[#1E3329]">{room.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FDF8E8] text-[#8C6B1B] font-extrabold border border-[#F3E4B5]">
                          {room.availableRooms} Left
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A6D63]">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#3F6B55]" />
                          {room.capacity}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5 text-[#3F6B55]" />
                          {room.bedType}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {room.amenities.map((am) => (
                          <span key={am} className="text-[10px] text-[#5A6D63] bg-white px-2 py-0.5 rounded border border-[#E8E4DC]">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#E8E4DC] shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-[#5A6D63] block font-medium">Price per Night</span>
                      <span className="font-extrabold text-[#3F6B55] text-lg">
                        ₹{room.pricePerNight.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleConfirmRoomChoice(room)}
                      className={`mt-2 px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 ${
                        isCurrentSelected
                          ? 'bg-[#3F6B55] text-white hover:bg-[#325644]'
                          : 'bg-[#D9A62E] text-[#1E3329] hover:bg-[#C59424] border border-[#B88A22]/20'
                      }`}
                    >
                      {isCurrentSelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Room Selected</span>
                        </>
                      ) : (
                        <>
                          <span>Choose Room</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
