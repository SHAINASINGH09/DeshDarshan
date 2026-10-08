'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import TravelDashboard from '@/components/TravelDashboard';
import SmartTripPlanner from '@/components/SmartTripPlanner';
import DestinationDiscovery from '@/components/DestinationDiscovery';
import DestinationComparison from '@/components/DestinationComparison';
import DestinationDetailView from '@/components/DestinationDetailView';
import TransportEngine from '@/components/TransportEngine';
import StayDiscovery from '@/components/StayDiscovery';
import AIItineraryView from '@/components/AIItineraryView';
import InteractiveIndiaMap from '@/components/InteractiveIndiaMap';
import TripDashboardView from '@/components/TripDashboardView';
import SavedTripsView from '@/components/SavedTripsView';
import ExploreIndiaView from '@/components/ExploreIndiaView';
import TripPlanningSidebar from '@/components/TripPlanningSidebar';
import DeshAIAssistant from '@/components/DeshAIAssistant';
import Footer from '@/components/Footer';

import {
  Destination,
  UserPlannerInput,
  SavedTrip,
  TransportOption,
  StayOption,
  HotelRoomOption,
  ItineraryDay,
  ItineraryActivity,
  Expense,
} from '@/types';
import { INITIAL_DESTINATIONS } from '@/data/destinationsData';
import { aiGenerateDestinations } from '@/services/aiService';
import { calculateSmartBudget } from '@/services/budgetEngine';

export default function Home() {
  // Navigation tab state: 'dashboard' | 'planner' | 'discovery' | 'detail' | 'itinerary' | 'hotels' | 'activities' | 'myjourney' | 'explore' | 'saved'
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Active Planner Input State
  const [plannerInput, setPlannerInput] = useState<UserPlannerInput>({
    budget: 50000,
    travelers: 2,
    durationDays: 5,
    startDate: 'Oct 15, 2026',
    endDate: 'Oct 20, 2026',
    startLocation: 'Delhi / Ghaziabad',
    interests: ['Mountains', 'Adventure'],
    stayPreference: 'Hotel',
    travelPreference: 'Balanced',
    preferredTransport: 'Any',
    travelPace: 'Balanced',
  });

  // Active Selections for Persistent Trip Planning Sidebar
  const [discoveredDestinations, setDiscoveredDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [selectedDestination, setSelectedDestination] = useState<Destination>(INITIAL_DESTINATIONS[0]);
  const [selectedTransport, setSelectedTransport] = useState<TransportOption>(INITIAL_DESTINATIONS[0].transportOptions[0]);
  const [selectedStay, setSelectedStay] = useState<StayOption>(INITIAL_DESTINATIONS[0].stayOptions[0]);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoomOption>(INITIAL_DESTINATIONS[0].stayOptions[0].roomTypes[0]);
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryDay[]>(INITIAL_DESTINATIONS[0].defaultItinerary);
  const [selectedActivities, setSelectedActivities] = useState<ItineraryActivity[]>(
    INITIAL_DESTINATIONS[0].defaultItinerary[0]?.activities || []
  );

  // Mobile Trip Sidebar Drawer State
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false);

  // Comparison Modal State
  const [compareDestIds, setCompareDestIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  // Saved Trips Collection
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [activeSavedTrip, setActiveSavedTrip] = useState<SavedTrip | null>(null);

  // Load Saved Trips from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('deshdarshan_saved_trips');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedTrips(parsed);
        if (parsed.length > 0) {
          setActiveSavedTrip(parsed[0]);
        }
      }
    } catch (e) {
      console.error('LocalStorage load error', e);
    }
  }, []);

  // Sync saved trips to localStorage
  const saveTripsToStorage = (trips: SavedTrip[]) => {
    setSavedTrips(trips);
    try {
      localStorage.setItem('deshdarshan_saved_trips', JSON.stringify(trips));
    } catch (e) {
      console.error('LocalStorage save error', e);
    }
  };

  // Planner Submission Handler
  const handlePlannerSubmit = async (input: UserPlannerInput) => {
    setPlannerInput(input);
    const results = await aiGenerateDestinations(input);
    setDiscoveredDestinations(results);

    if (results.length > 0) {
      const topDest = results[0];
      setSelectedDestination(topDest);
      setSelectedTransport(topDest.transportOptions[0] || INITIAL_DESTINATIONS[0].transportOptions[0]);
      const stay = topDest.stayOptions[0] || INITIAL_DESTINATIONS[0].stayOptions[0];
      setSelectedStay(stay);
      setSelectedRoom(stay.roomTypes[0]);
      setCurrentItinerary(topDest.defaultItinerary);
      setSelectedActivities(topDest.defaultItinerary[0]?.activities || []);
    }

    setActiveTab('discovery');
  };

  // Select Destination Handler
  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setSelectedTransport(dest.transportOptions[0] || INITIAL_DESTINATIONS[0].transportOptions[0]);
    const stay = dest.stayOptions[0] || INITIAL_DESTINATIONS[0].stayOptions[0];
    setSelectedStay(stay);
    setSelectedRoom(stay.roomTypes[0]);
    setCurrentItinerary(dest.defaultItinerary);
    setSelectedActivities(dest.defaultItinerary[0]?.activities || []);
    setActiveTab('detail');
  };

  // Select Destination by ID (e.g. from Hero Card Click)
  const handleSelectDestinationById = (destId: string) => {
    const found = INITIAL_DESTINATIONS.find((d) => d.id.toLowerCase() === destId.toLowerCase());
    if (found) {
      handleSelectDestination(found);
    } else {
      setActiveTab('explore');
    }
  };

  // Hotel & Room Selection Handler
  const handleSelectStayRoom = (stay: StayOption, room: HotelRoomOption) => {
    setSelectedStay(stay);
    setSelectedRoom(room);
  };

  // Compare Handler
  const handleCompareDestinations = (ids: string[]) => {
    setCompareDestIds(ids);
    setShowCompareModal(true);
  };

  // Save Current Trip Handler
  const handleSaveCurrentTrip = () => {
    const budgetBreakdown = calculateSmartBudget(
      plannerInput.budget,
      plannerInput.travelers,
      plannerInput.durationDays,
      plannerInput.stayPreference,
      plannerInput.travelPreference
    );

    const travelDatesText = `${plannerInput.startDate || 'Oct 15'} – ${plannerInput.endDate || 'Oct 20, 2026'}`;

    const newTrip: SavedTrip = {
      id: `trip-${Date.now()}`,
      title: `${selectedDestination.name} ${plannerInput.durationDays}-Day Trip`,
      userInput: plannerInput,
      destination: selectedDestination,
      selectedTransport,
      selectedStay,
      selectedRoom,
      selectedActivities,
      budgetBreakdown,
      itinerary: currentItinerary,
      expenses: [
        {
          id: 'exp-1',
          category: 'Transport',
          amount: selectedTransport.totalCost,
          description: `${selectedTransport.title} Booking`,
          date: 'Day 1',
        },
        {
          id: 'exp-2',
          category: 'Stay',
          amount: (selectedRoom ? selectedRoom.pricePerNight : selectedStay.pricePerNight) * plannerInput.durationDays,
          description: `${selectedStay.name} — ${selectedRoom ? selectedRoom.name : 'Room'}`,
          date: 'Day 1',
        },
      ],
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      travelDatesText,
    };

    const updated = [newTrip, ...savedTrips];
    saveTripsToStorage(updated);
    setActiveSavedTrip(newTrip);
    setActiveTab('myjourney');
  };

  // Add Expense to Active Saved Trip
  const handleAddExpense = (expense: Expense) => {
    if (!activeSavedTrip) return;
    const updatedTrip: SavedTrip = {
      ...activeSavedTrip,
      expenses: [...activeSavedTrip.expenses, expense],
    };

    setActiveSavedTrip(updatedTrip);
    const updatedList = savedTrips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t));
    saveTripsToStorage(updatedList);
  };

  // Delete Saved Trip
  const handleDeleteSavedTrip = (tripId: string) => {
    const updated = savedTrips.filter((t) => t.id !== tripId);
    saveTripsToStorage(updated);
    if (activeSavedTrip?.id === tripId) {
      setActiveSavedTrip(updated.length > 0 ? updated[0] : null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E3329] font-sans">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPlanner={() => setActiveTab('planner')}
        savedTripsCount={savedTrips.length}
        onToggleSidebarMobile={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
      />

      {/* Main Body */}
      <main className="flex-1">
        {/* TAB 1: HOME DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <LandingHero
              onStartPlanning={() => setActiveTab('planner')}
              onExploreClick={() => setActiveTab('explore')}
              onSelectDestination={handleSelectDestinationById}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
              <TravelDashboard
                onOpenPlanner={() => setActiveTab('planner')}
                onSelectDestination={handleSelectDestination}
                onExploreClick={() => setActiveTab('explore')}
                savedTripsCount={savedTrips.length}
              />
            </div>
          </div>
        )}

        {/* TAB 2: SMART TRIP PLANNER */}
        {activeTab === 'planner' && (
          <div className="pt-24 pb-12">
            <SmartTripPlanner
              onComplete={handlePlannerSubmit}
              initialValues={plannerInput}
            />
          </div>
        )}

        {/* TAB 3: DESTINATION DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="pt-24 pb-12">
            <DestinationDiscovery
              userInput={plannerInput}
              destinations={discoveredDestinations}
              onSelectDestination={handleSelectDestination}
              onCompareDestinations={handleCompareDestinations}
              onEditPlanner={() => setActiveTab('planner')}
            />
          </div>
        )}

        {/* TAB 4: DESTINATION DETAIL VIEW */}
        {activeTab === 'detail' && (
          <div className="pt-24 pb-12">
            <DestinationDetailView
              destination={selectedDestination}
              onBack={() => setActiveTab('discovery')}
              onProceedToItinerary={() => setActiveTab('itinerary')}
            />
          </div>
        )}

        {/* TAB 5: COMPLETE TRIP PLAN & PERSISTENT SIDEBAR LAYOUT */}
        {(activeTab === 'itinerary' || activeTab === 'hotels' || activeTab === 'activities') && (
          <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 flex gap-8 items-start">
            {/* Main Interactive Content */}
            <div className="flex-1 space-y-10 min-w-0">
              {/* Top Subnav Tabs */}
              <div className="flex items-center gap-2 border-b border-[#E8E4DC] pb-3">
                {[
                  { id: 'itinerary', label: '1. Day-by-Day Plan' },
                  { id: 'hotels', label: '2. Hotel & Rooms' },
                  { id: 'activities', label: '3. Routes & Transport' },
                ].map((subTab) => (
                  <button
                    key={subTab.id}
                    onClick={() => setActiveTab(subTab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      activeTab === subTab.id
                        ? 'bg-[#3F6B55] text-white shadow-xs'
                        : 'bg-white text-[#1E3329] border border-[#E8E4DC] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {subTab.label}
                  </button>
                ))}
              </div>

              {/* Subtab Content */}
              {activeTab === 'itinerary' && (
                <div className="space-y-10">
                  <AIItineraryView
                    destination={selectedDestination}
                    itinerary={currentItinerary}
                    onUpdateItinerary={setCurrentItinerary}
                    travelPace={plannerInput.travelPace}
                    onChangePace={(pace) => setPlannerInput({ ...plannerInput, travelPace: pace })}
                    onSaveTrip={handleSaveCurrentTrip}
                  />

                  <InteractiveIndiaMap
                    startLocation={plannerInput.startLocation}
                    destination={selectedDestination}
                  />
                </div>
              )}

              {activeTab === 'hotels' && (
                <StayDiscovery
                  destination={selectedDestination}
                  selectedStay={selectedStay}
                  selectedRoom={selectedRoom}
                  onSelectStayRoom={handleSelectStayRoom}
                />
              )}

              {activeTab === 'activities' && (
                <TransportEngine
                  destination={selectedDestination}
                  selectedTransport={selectedTransport}
                  onSelectTransport={setSelectedTransport}
                  startLocation={plannerInput.startLocation}
                />
              )}
            </div>

            {/* Persistent Trip Planning Sidebar (Desktop persistent, Mobile drawer) */}
            <TripPlanningSidebar
              destination={selectedDestination}
              durationDays={plannerInput.durationDays}
              travelers={plannerInput.travelers}
              startLocation={plannerInput.startLocation}
              startDate={plannerInput.startDate}
              endDate={plannerInput.endDate}
              selectedTransport={selectedTransport}
              selectedStay={selectedStay}
              selectedRoom={selectedRoom}
              selectedActivities={selectedActivities}
              onSaveTrip={handleSaveCurrentTrip}
              isOpenMobile={isSidebarMobileOpen}
              onCloseMobile={() => setIsSidebarMobileOpen(false)}
            />
          </div>
        )}

        {/* TAB 6: MY TRIPS (ACTIVE TRIP DASHBOARD) */}
        {activeTab === 'myjourney' && (
          <div className="pt-24 pb-12">
            {activeSavedTrip ? (
              <TripDashboardView
                savedTrip={activeSavedTrip}
                onEditTrip={() => setActiveTab('planner')}
                onReplanTrip={() => setActiveTab('itinerary')}
                onAddExpense={handleAddExpense}
              />
            ) : (
              <div className="max-w-xl mx-auto text-center py-20 px-4 space-y-4">
                <h2 className="font-serif-heading text-3xl font-bold text-[#1E3329]">
                  No Active Trip Plan
                </h2>
                <p className="text-xs text-[#5A6D63] font-medium">
                  Plan your journey across India using our trip planning engine to unlock your active dashboard.
                </p>
                <button
                  onClick={() => setActiveTab('planner')}
                  className="px-6 py-3 rounded-xl bg-[#D9A62E] text-[#1E3329] font-extrabold text-xs shadow-sm"
                >
                  Start Planning Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: EXPLORE INDIA */}
        {activeTab === 'explore' && (
          <div className="pt-24 pb-12">
            <ExploreIndiaView onSelectDestination={handleSelectDestination} />
          </div>
        )}

        {/* TAB 8: SAVED PLANS */}
        {activeTab === 'saved' && (
          <div className="pt-24 pb-12">
            <SavedTripsView
              savedTrips={savedTrips}
              onViewTrip={(trip) => {
                setActiveSavedTrip(trip);
                setActiveTab('myjourney');
              }}
              onEditTrip={(trip) => {
                setSelectedDestination(trip.destination);
                if (trip.selectedTransport) setSelectedTransport(trip.selectedTransport);
                if (trip.selectedStay) setSelectedStay(trip.selectedStay);
                if (trip.selectedRoom) setSelectedRoom(trip.selectedRoom);
                setActiveTab('itinerary');
              }}
              onDeleteTrip={handleDeleteSavedTrip}
              onStartPlanning={() => setActiveTab('planner')}
            />
          </div>
        )}
      </main>

      {/* Destination Comparison Modal */}
      {showCompareModal && (
        <DestinationComparison
          selectedDestinations={INITIAL_DESTINATIONS.filter((d) => compareDestIds.includes(d.id))}
          onClose={() => setShowCompareModal(false)}
          onSelectDestination={handleSelectDestination}
        />
      )}

      {/* Floating Desh AI Assistant */}
      <DeshAIAssistant
        currentDestinationName={selectedDestination?.name || 'India'}
        currentBudget={plannerInput.budget}
      />

      {/* Footer */}
      <Footer
        onStartPlanning={() => setActiveTab('planner')}
        onExploreClick={() => setActiveTab('explore')}
      />
    </div>
  );
}
