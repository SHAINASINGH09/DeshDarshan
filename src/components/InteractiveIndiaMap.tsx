'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Star, Info } from 'lucide-react';
import { Destination } from '@/types';

interface InteractiveIndiaMapProps {
  startLocation: string;
  destination: Destination;
}

export default function InteractiveIndiaMap({
  startLocation,
  destination,
}: InteractiveIndiaMapProps) {
  const [activeMarker, setActiveMarker] = useState<string | null>('destination');

  let destX = 190;
  let destY = 110;

  if (destination.id === 'kashmir') { destX = 160; destY = 80; }
  else if (destination.id === 'auli') { destX = 220; destY = 135; }
  else if (destination.id === 'rishikesh') { destX = 210; destY = 150; }
  else if (destination.id === 'jaipur') { destX = 170; destY = 210; }
  else if (destination.id === 'goa') { destX = 150; destY = 380; }
  else if (destination.id === 'kerala') { destX = 190; destY = 440; }
  else if (destination.id === 'spiti') { destX = 210; destY = 100; }

  const startX = 200;
  const startY = 170;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1 block">
            INTERACTIVE ROUTE MAP
          </span>
          <h3 className="font-serif-heading text-2xl font-bold text-slate-900">
            {startLocation} → {destination.name} Route Map
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span>Interactive Route Path</span>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative h-[340px] w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full relative z-10" viewBox="0 0 500 500" fill="none">
          {/* India Outline */}
          <path
            d="M 180 60 Q 240 70 280 110 T 320 180 Q 300 240 260 290 T 230 460 Q 180 470 160 410 T 120 310 Q 110 240 140 180 T 180 60 Z"
            fill="#EFF6FF"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeDasharray="4 2"
          />

          {/* Route Path */}
          <path
            d={`M ${startX} ${startY} Q ${(startX + destX) / 2 + 20} ${(startY + destY) / 2 - 20} ${destX} ${destY}`}
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="animate-route-draw"
          />

          {/* Starting Hub */}
          <g transform={`translate(${startX}, ${startY})`} className="cursor-pointer" onClick={() => setActiveMarker('start')}>
            <circle r="8" fill="#2563EB" opacity="0.2" className="animate-ping" />
            <circle r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            <text x="10" y="4" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
              {startLocation}
            </text>
          </g>

          {/* Destination */}
          <g transform={`translate(${destX}, ${destY})`} className="cursor-pointer" onClick={() => setActiveMarker('destination')}>
            <circle r="12" fill="#2563EB" opacity="0.3" className="animate-pulse" />
            <circle r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            <text x="12" y="-5" fill="#1E40AF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              {destination.name}
            </text>
          </g>

          {/* Hidden Gem */}
          {destination.hiddenGems[0] && (
            <g transform={`translate(${destX + 25}, ${destY + 20})`} className="cursor-pointer" onClick={() => setActiveMarker('gem')}>
              <circle r="4" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="8" y="3" fill="#059669" fontSize="9" fontWeight="bold">
                Offbeat Gem
              </text>
            </g>
          )}
        </svg>

        {activeMarker && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 border border-slate-200 rounded-xl p-3 text-xs shadow-md backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <div>
                <span className="font-bold text-slate-900">
                  {activeMarker === 'start' ? startLocation : activeMarker === 'gem' ? destination.hiddenGems[0]?.name : destination.name}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {activeMarker === 'start' ? 'Starting Journey Hub' : `${destination.state} • Est. ₹${destination.estimatedCost.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            <button onClick={() => setActiveMarker(null)} className="text-[10px] text-blue-600 hover:underline font-bold">
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
