'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Compass,
  MapPin,
  Sparkles,
  Heart,
  User,
  Bell,
  Check,
  Menu,
  X,
  Calendar,
  Hotel,
  CheckCircle,
} from 'lucide-react';
import { PriceAlert, NotificationItem } from '@/types';
import { INITIAL_NOTIFICATIONS, INITIAL_PRICE_ALERTS } from '@/data/destinationsData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPlanner: () => void;
  savedTripsCount: number;
  onToggleSidebarMobile?: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenPlanner,
  savedTripsCount,
  onToggleSidebarMobile,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(INITIAL_PRICE_ALERTS);

  const unreadCount = notifications.filter((n) => n.unread).length + priceAlerts.filter((p) => !p.isRead).length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E4DC] shadow-sm py-2.5'
            : 'bg-[#FAF8F5] border-b border-[#E8E4DC]/60 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Mark - Clean Compact Presentation (No large circle) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 group focus:outline-none text-left"
            >
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#D9A62E]/40 shadow-sm bg-white group-hover:border-[#D9A62E] transition-all">
                <Image
                  src="/logo.jpg"
                  alt="DeshDarshan Emblem"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-heading text-xl font-bold tracking-tight text-[#1E3329] group-hover:text-[#3F6B55] transition-colors">
                  DeshDarshan
                </span>
                <span className="text-[10px] tracking-wider text-[#5A6D63] font-semibold uppercase -mt-1">
                  Travel India
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-[#E8E4DC] text-xs shadow-xs">
            {[
              { id: 'dashboard', label: 'Home', icon: Compass },
              { id: 'explore', label: 'Explore', icon: MapPin },
              { id: 'planner', label: 'Plan Trip', icon: Sparkles },
              { id: 'hotels', label: 'Hotels', icon: Hotel },
              { id: 'activities', label: 'Activities', icon: Calendar },
              { id: 'myjourney', label: 'My Trips', icon: CheckCircle },
              { id: 'saved', label: `Saved (${savedTripsCount})`, icon: Heart },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'planner') onOpenPlanner();
                    else setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-[#3F6B55] text-white shadow-xs font-semibold'
                      : 'text-[#1E3329] hover:text-[#3F6B55] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E3B84B]' : 'text-[#3F6B55]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Price Watch Bell */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-white border border-[#E8E4DC] text-[#1E3329] hover:text-[#3F6B55] hover:border-[#3F6B55]/30 transition-colors shadow-xs"
              title="Notifications & Price Drops"
            >
              <Bell className="w-4 h-4 text-[#3F6B55]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D9A62E] text-[#1E3329] font-bold text-[9px] flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Plan Trip Primary CTA in Soft Golden Yellow */}
            <button
              onClick={onOpenPlanner}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D9A62E] hover:bg-[#C59424] text-[#1E3329] font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-95 border border-[#B88A22]/20"
            >
              <Sparkles className="w-3.5 h-3.5 fill-[#1E3329]" />
              <span>Plan Trip</span>
            </button>

            {/* Mobile Trip Sidebar Drawer Toggle */}
            {onToggleSidebarMobile && (
              <button
                onClick={onToggleSidebarMobile}
                className="lg:hidden p-2 rounded-xl bg-[#EBF3EE] border border-[#C8DCD0] text-[#1E3329] font-bold text-xs flex items-center gap-1"
                title="View Trip Plan Sidebar"
              >
                <Compass className="w-4 h-4 text-[#3F6B55]" />
                <span className="text-[11px]">Plan</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center justify-around border-t border-[#E8E4DC] bg-[#FAF8F5] px-2 py-2 mt-2 text-[10px]">
          {[
            { id: 'dashboard', label: 'Home', icon: Compass },
            { id: 'explore', label: 'Explore', icon: MapPin },
            { id: 'hotels', label: 'Hotels', icon: Hotel },
            { id: 'planner', label: 'Plan', icon: Sparkles },
            { id: 'myjourney', label: 'My Trips', icon: CheckCircle },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'planner') onOpenPlanner();
                  else setActiveTab(item.id);
                }}
                className={`flex flex-col items-center gap-0.5 font-medium transition-colors ${
                  isActive ? 'text-[#3F6B55] font-bold' : 'text-[#5A6D63]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D9A62E]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white border-l border-[#E8E4DC] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-[#E8E4DC] flex items-center justify-between bg-[#FAF8F5]">
              <h3 className="font-serif-heading font-bold text-base text-[#1E3329]">
                Price Drops & Seasonal Updates
              </h3>
              <button onClick={() => setShowNotifications(false)} className="p-1 text-[#5A6D63] hover:text-[#1E3329]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {priceAlerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#3F6B55]">{alert.title}</span>
                    <span className="text-[10px] text-[#5A6D63]">{alert.timeAgo}</span>
                  </div>
                  <p className="text-[#1E3329]">{alert.destinationName} fare dropped to ₹{alert.currentPrice.toLocaleString('en-IN')}.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
