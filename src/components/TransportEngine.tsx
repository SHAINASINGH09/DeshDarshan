'use client';

import React, { useState } from 'react';
import {
  Train,
  Bus,
  Car,
  Plane,
  Clock,
  ExternalLink,
  Calculator,
  Info,
  CheckCircle,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { Destination, TransportOption } from '@/types';
import { calculateCarFuelCosts } from '@/services/budgetEngine';

interface TransportEngineProps {
  destination: Destination;
  selectedTransport?: TransportOption;
  onSelectTransport: (transport: TransportOption) => void;
  startLocation: string;
}

export default function TransportEngine({
  destination,
  selectedTransport,
  onSelectTransport,
  startLocation,
}: TransportEngineProps) {
  const [mileageKmpl, setMileageKmpl] = useState<number>(14);
  const [fuelPrice, setFuelPrice] = useState<number>(96.5);
  const [customDistance, setCustomDistance] = useState<number>(destination.distanceFromDelhiKm);

  const carFuelCalc = calculateCarFuelCosts(customDistance, mileageKmpl, fuelPrice);

  return (
    <div className="space-y-6 bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-xs text-[#1E3329]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#3F6B55] mb-1 block">
            TRANSPORTATION OPTIONS
          </span>
          <h3 className="font-serif-heading text-2xl font-bold text-[#1E3329]">
            Travel Routes to {destination.name}
          </h3>
          <p className="text-xs text-[#5A6D63] font-medium">
            Route from <span className="font-semibold text-[#1E3329]">{startLocation}</span> &rarr; {destination.name}.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] text-xs text-[#5A6D63] flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 text-[#3F6B55]" />
          <span>Select your mode of travel</span>
        </div>
      </div>

      {/* Transport Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {destination.transportOptions.map((option) => {
          const isSelected = selectedTransport?.type === option.type;
          let Icon = Train;
          if (option.type === 'Flight') Icon = Plane;
          else if (option.type === 'Bus') Icon = Bus;
          else if (option.type === 'Car') Icon = Car;

          return (
            <div
              key={option.type}
              onClick={() => onSelectTransport(option)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-[#EBF3EE] border-[#3F6B55] shadow-sm ring-2 ring-[#3F6B55]/20'
                  : 'bg-[#FAF8F5] border-[#E8E4DC] hover:border-[#3F6B55]/40 hover:bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${isSelected ? 'bg-[#3F6B55] text-white border-[#3F6B55]' : 'bg-white text-[#3F6B55] border-[#E8E4DC]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {option.isRecommended && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDF8E8] text-[#8C6B1B] font-extrabold border border-[#F3E4B5]">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#3F6B55] block">
                    {option.type}
                  </span>
                  <h4 className="font-serif-heading font-bold text-base text-[#1E3329]">
                    {option.title}
                  </h4>
                </div>

                <p className="text-xs text-[#5A6D63] line-clamp-2 leading-relaxed font-medium">
                  {option.routeText}
                </p>

                <div className="flex items-center gap-2 text-xs text-[#5A6D63] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#3F6B55]" />
                  <span>{option.durationText}</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#5A6D63] block">Estimated Cost</span>
                  <span className="font-extrabold text-[#3F6B55] text-base">
                    ₹{option.costPerPerson.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#3F6B55] text-white'
                      : 'bg-white border border-[#E8E4DC] text-[#1E3329] hover:bg-[#3F6B55] hover:text-white'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select'}
                </button>
              </div>

              {/* TRAIN SPECIFIC IRCTC DIRECT BUTTON */}
              {option.type === 'Train' && (
                <div className="pt-2 border-t border-[#E8E4DC]">
                  <a
                    href="https://www.irctc.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2 px-3 rounded-xl bg-[#3F6B55] hover:bg-[#325644] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>Search Trains on IRCTC</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* OWN CAR FUEL & TOLL CALCULATOR */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#3F6B55]" />
          <h4 className="font-serif-heading font-bold text-lg text-[#1E3329]">
            Own Car Travel & Fuel Estimation
          </h4>
        </div>

        <p className="text-xs text-[#5A6D63]">
          Formula: <code className="text-[#3F6B55] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#E8E4DC]">Fuel Cost = Distance / Vehicle Mileage &times; Fuel Price + Tolls</code>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
          <div>
            <label className="text-[#1E3329] font-semibold block mb-1">
              One-way Distance (km)
            </label>
            <input
              type="number"
              value={customDistance}
              onChange={(e) => setCustomDistance(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-[#E8E4DC] rounded-xl text-xs text-[#1E3329] font-medium"
            />
          </div>

          <div>
            <label className="text-[#1E3329] font-semibold block mb-1">
              Vehicle Mileage (km/L)
            </label>
            <input
              type="number"
              value={mileageKmpl}
              onChange={(e) => setMileageKmpl(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-[#E8E4DC] rounded-xl text-xs text-[#1E3329] font-medium"
            />
          </div>

          <div>
            <label className="text-[#1E3329] font-semibold block mb-1">
              Fuel Price (₹/L)
            </label>
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-[#E8E4DC] rounded-xl text-xs text-[#1E3329] font-medium"
            />
          </div>
        </div>

        {/* Breakdown Summary */}
        <div className="p-4 rounded-xl bg-white border border-[#E8E4DC] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-[#5A6D63] block font-medium">Round-Trip Fuel</span>
            <span className="font-bold text-[#1E3329]">₹{carFuelCalc.fuelCostTotal.toLocaleString('en-IN')}</span>
          </div>

          <div>
            <span className="text-[10px] text-[#5A6D63] block font-medium">Highway Tolls (Est.)</span>
            <span className="font-bold text-[#1E3329]">₹{carFuelCalc.tollsEstimated.toLocaleString('en-IN')}</span>
          </div>

          <div>
            <span className="text-[10px] text-[#5A6D63] block font-medium">Parking & Misc</span>
            <span className="font-bold text-[#1E3329]">₹{carFuelCalc.parkingEstimated.toLocaleString('en-IN')}</span>
          </div>

          <div>
            <span className="text-[10px] text-[#5A6D63] block font-medium">Total Car Expense</span>
            <span className="font-extrabold text-[#3F6B55] text-sm">
              ₹{carFuelCalc.grandTotalCarCost.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
