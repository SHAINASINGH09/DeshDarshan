export type InterestCategory =
  | 'Mountains'
  | 'Beaches'
  | 'Adventure'
  | 'Heritage'
  | 'Food'
  | 'Nature'
  | 'Wellness'
  | 'Spiritual'
  | 'Photography'
  | 'Culture'
  | 'Nightlife'
  | 'Shopping'
  | 'Desert'
  | 'Water Activities';

export type StayType = 'Hostel' | 'Hotel' | 'Homestay' | 'Resort' | 'Budget Stay';
export type TravelPreference = 'Cheapest' | 'Fastest' | 'Balanced';
export type TransportMode = 'Flight' | 'Train' | 'Bus' | 'Car' | 'Any';
export type TravelPace = 'Relaxed' | 'Balanced' | 'Packed';

export interface UserPlannerInput {
  budget: number; // e.g. 50000
  travelers: number; // e.g. 2
  durationDays: number; // e.g. 5
  startDate?: string; // e.g. "2026-10-15"
  endDate?: string; // e.g. "2026-10-20"
  startLocation: string; // e.g. "Delhi / Ghaziabad"
  interests: InterestCategory[];
  stayPreference: StayType;
  travelPreference: TravelPreference;
  preferredTransport: TransportMode;
  travelPace: TravelPace;
}

export interface BudgetBreakdown {
  totalBudget: number;
  estimatedTotalCost: number;
  transport: number;
  stay: number;
  food: number;
  activities: number;
  localTravel: number;
  emergencyBuffer: number;
}

export interface FuelCalculation {
  distanceKm: number;
  mileageKmpl: number;
  fuelPricePerLiter: number;
  fuelCostTotal: number;
  tollsEstimated: number;
  parkingEstimated: number;
  grandTotalCarCost: number;
}

export interface TransportOption {
  type: TransportMode;
  title: string;
  routeText: string;
  costPerPerson: number;
  durationText: string;
  totalCost: number;
  details?: string;
  fuelCalc?: FuelCalculation;
  isRecommended?: boolean;
}

export interface HotelRoomOption {
  id: string;
  name: string; // e.g. "Deluxe Mountain View Room", "Executive Suite"
  pricePerNight: number;
  capacity: string; // e.g. "2 Adults", "3 Adults"
  bedType: string; // e.g. "1 King Bed"
  amenities: string[];
  availableRooms: number;
  image: string;
}

export interface StayOption {
  id: string;
  name: string;
  type: StayType;
  location: string;
  pricePerNight: number;
  rating: number;
  distanceFromAttractions: string;
  amenities: string[];
  image: string;
  badge?: string;
  description?: string;
  checkInTime?: string;
  checkOutTime?: string;
  roomTypes: HotelRoomOption[];
  selectedRoom?: HotelRoomOption;
}

export interface HiddenGem {
  id: string;
  name: string;
  category: string;
  description: string;
  whySpecial: string;
  location: string;
  bestTimeToVisit: string;
  estimatedCost: number;
  image: string;
}

export interface ItineraryActivity {
  id: string;
  timeSlot: string; // e.g., "09:00 AM" or "Morning"
  activity: string;
  location: string;
  estimatedCost: number;
  travelTime: string;
  duration: string;
  whyRecommended: string;
  category: string;
  isSelected?: boolean;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  estimatedSpend: number;
  activities: ItineraryActivity[];
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  tagline: string;
  description: string;
  heroImage: string;
  cardImage: string;
  estimatedCost: number;
  distanceFromDelhiKm: number;
  recommendedDurationDays: number;
  bestSeason: string;
  bestMonths: number[]; // 1 to 12
  travelTimeHours: number;
  topExperiences: string[];
  budgetScore: number;
  adventureScore: number;
  natureScore: number;
  foodScore: number;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  aiMatchPercentage: number;
  whyRecommended: string;
  latitude: number;
  longitude: number;
  weatherSummary: {
    temp: string;
    condition: string;
    icon: string;
  };
  hiddenGems: HiddenGem[];
  transportOptions: TransportOption[];
  stayOptions: StayOption[];
  baseBudgetBreakdown: BudgetBreakdown;
  defaultItinerary: ItineraryDay[];
}

export interface WeatherAlert {
  id: string;
  destinationName: string;
  alertType: 'weather' | 'road' | 'crowd' | 'event';
  title: string;
  description: string;
  affectedTime: string;
  affectedActivityId?: string;
  aiRecommendation: string;
  alternativeActivity: ItineraryActivity;
}

export interface Expense {
  id: string;
  category: 'Transport' | 'Stay' | 'Food' | 'Activities' | 'Shopping' | 'Other';
  amount: number;
  description: string;
  date: string;
}

export interface ActiveTripPlan {
  destination?: Destination;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelers: number;
  startLocation: string;
  transport?: TransportOption;
  hotel?: StayOption;
  room?: HotelRoomOption;
  selectedActivities: ItineraryActivity[];
  selectedPlaces: string[];
  foodPreferences: string[];
  customBudget?: number;
}

export interface SavedTrip {
  id: string;
  title: string;
  userInput: UserPlannerInput;
  destination: Destination;
  selectedTransport: TransportOption;
  selectedStay: StayOption;
  selectedRoom?: HotelRoomOption;
  selectedActivities?: ItineraryActivity[];
  budgetBreakdown: BudgetBreakdown;
  itinerary: ItineraryDay[];
  expenses: Expense[];
  activeWeatherAlert?: WeatherAlert;
  isReplanned?: boolean;
  createdAt: string;
  travelDatesText: string;
}

export interface PriceAlert {
  id: string;
  destinationId: string;
  destinationName: string;
  type: 'flight' | 'train' | 'hotel' | 'trip';
  title: string;
  currentPrice: number;
  avgPrice: number;
  priceDropPercent: number;
  savingAmount: number;
  badge: string;
  timeAgo: string;
  isRead: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'seasonal' | 'price' | 'transport' | 'stay' | 'ai';
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  linkText?: string;
  linkAction?: string;
}
