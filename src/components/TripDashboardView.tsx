'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Plus,
  Share2,
  Download,
  Edit,
  RefreshCw,
  TrendingUp,
  CreditCard,
  PieChart,
  Home,
  Train,
  BedDouble,
} from 'lucide-react';
import { SavedTrip, Expense } from '@/types';

interface TripDashboardViewProps {
  savedTrip: SavedTrip;
  onEditTrip: () => void;
  onReplanTrip: () => void;
  onAddExpense: (expense: Expense) => void;
}

export default function TripDashboardView({
  savedTrip,
  onEditTrip,
  onReplanTrip,
  onAddExpense,
}: TripDashboardViewProps) {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  const [expenseCategory, setExpenseCategory] = useState<Expense['category']>('Food');
  const [expenseAmount, setExpenseAmount] = useState<number>(500);
  const [expenseDesc, setExpenseDesc] = useState<string>('');

  const totalSpent = savedTrip.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = savedTrip.budgetBreakdown.totalBudget - totalSpent;
  const spentPercent = Math.min(100, Math.round((totalSpent / savedTrip.budgetBreakdown.totalBudget) * 100));

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      category: expenseCategory,
      amount: expenseAmount,
      description: expenseDesc || `${expenseCategory} Expense`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    };
    onAddExpense(newExp);
    setShowAddExpenseModal(false);
    setExpenseDesc('');
  };

  const handleDownloadItinerary = () => {
    const textContent = `
==================================================
DESHDARSHAN TRIP ITINERARY — ${savedTrip.destination.name.toUpperCase()}
==================================================
Destination: ${savedTrip.destination.name}, ${savedTrip.destination.state}
Dates: ${savedTrip.travelDatesText}
Total Budget: ₹${savedTrip.budgetBreakdown.totalBudget.toLocaleString('en-IN')}
Duration: ${savedTrip.userInput.durationDays} Days
Travelers: ${savedTrip.userInput.travelers}
Start Location: ${savedTrip.userInput.startLocation}

TRANSPORTATION:
${savedTrip.selectedTransport.title} (${savedTrip.selectedTransport.routeText})

ACCOMMODATION & ROOM:
${savedTrip.selectedStay.name} (${savedTrip.selectedStay.location})
Selected Room: ${savedTrip.selectedRoom ? savedTrip.selectedRoom.name : 'Standard'} (₹${savedTrip.selectedRoom ? savedTrip.selectedRoom.pricePerNight : savedTrip.selectedStay.pricePerNight}/night)

DAY-BY-DAY ITINERARY:
${savedTrip.itinerary
  .map(
    (d) => `
Day ${d.dayNumber}: ${d.title} (Est. Spend: ₹${d.estimatedSpend})
${d.activities.map((a) => `  - [${a.timeSlot}] ${a.activity} (${a.location}) — ₹${a.estimatedCost}`).join('\n')}
`
  )
  .join('\n')}
==================================================
DeshDarshan — From Dreams to Destinations
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DeshDarshan_${savedTrip.destination.name}_Plan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">
            MY JOURNEY DASHBOARD
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            {savedTrip.destination.name} Plan
          </h1>
          <p className="text-xs text-slate-500">
            Saved on {savedTrip.createdAt} • {savedTrip.userInput.durationDays} Days • {savedTrip.userInput.travelers} Traveler{savedTrip.userInput.travelers > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onEditTrip}
            className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 font-semibold text-xs flex items-center gap-1.5"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          <button
            onClick={onReplanTrip}
            className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 font-semibold text-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Smart Replan</span>
          </button>

          <button
            onClick={handleDownloadItinerary}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Download Plan</span>
          </button>
        </div>
      </div>

      {/* Budget & Expense Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            <h3 className="font-serif-heading text-xl font-bold text-slate-900">
              Trip Budget & Expense Tracker
            </h3>
          </div>

          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-700">₹{totalSpent.toLocaleString('en-IN')} Spent</span>
            <span className="text-blue-700">
              ₹{remainingBudget.toLocaleString('en-IN')} Remaining out of ₹{savedTrip.budgetBreakdown.totalBudget.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${spentPercent}%` }}
            />
          </div>
        </div>

        {/* Expenses List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Recorded Expenses ({savedTrip.expenses.length})
          </h4>

          {savedTrip.expenses.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">
              No custom expenses logged yet. Click "Add Expense" to track your spending!
            </p>
          ) : (
            <div className="space-y-2">
              {savedTrip.expenses.map((exp) => (
                <div
                  key={exp.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-blue-700 font-bold text-[10px]">
                      {exp.category}
                    </span>
                    <span className="font-semibold text-slate-800">{exp.description}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[10px]">{exp.date}</span>
                    <span className="font-bold text-blue-700">₹{exp.amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Transport & Stay Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
            SELECTED TRANSPORTATION
          </span>
          <h4 className="font-serif-heading font-bold text-base text-slate-900">
            {savedTrip.selectedTransport.title}
          </h4>
          <p className="text-xs text-slate-600">{savedTrip.selectedTransport.routeText}</p>
          <div className="text-xs font-bold text-blue-700">
            Est. Cost: ₹{savedTrip.selectedTransport.totalCost.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
            SELECTED HOTEL & ROOM
          </span>
          <h4 className="font-serif-heading font-bold text-base text-slate-900">
            {savedTrip.selectedStay.name}
          </h4>
          {savedTrip.selectedRoom && (
            <p className="text-xs font-semibold text-blue-800 flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-blue-600" />
              Room: {savedTrip.selectedRoom.name}
            </p>
          )}
          <div className="text-xs font-bold text-blue-700">
            ₹{savedTrip.selectedRoom ? savedTrip.selectedRoom.pricePerNight : savedTrip.selectedStay.pricePerNight} / Night
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif-heading font-bold text-lg text-slate-900">
                Log New Expense
              </h3>
              <button onClick={() => setShowAddExpenseModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-700 font-semibold block mb-1">
                  Category
                </label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value as Expense['category'])}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                >
                  {['Transport', 'Stay', 'Food', 'Activities', 'Shopping', 'Other'].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-700 font-semibold block mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 font-semibold block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Local Siddu & Cafe Coffee in Old Town"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-extrabold shadow-sm"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
