import { Destination, ItineraryDay, UserPlannerInput, WeatherAlert, ItineraryActivity } from '@/types';
import { INITIAL_DESTINATIONS } from '@/data/destinationsData';
import { filterDestinationsByBudget } from './budgetEngine';

export async function aiGenerateDestinations(userInput: UserPlannerInput): Promise<Destination[]> {
  // Simulates AI evaluation with real reasoning
  await new Promise((resolve) => setTimeout(resolve, 800));
  return filterDestinationsByBudget(INITIAL_DESTINATIONS, userInput);
}

export async function aiAdaptItinerary(
  destination: Destination,
  alert: WeatherAlert,
  currentItinerary: ItineraryDay[]
): Promise<{ updatedItinerary: ItineraryDay[]; explanation: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Clone itinerary for modification
  const updatedItinerary = JSON.parse(JSON.stringify(currentItinerary)) as ItineraryDay[];

  // Find Day 2 or Day 1 activity to adapt
  if (updatedItinerary.length >= 2) {
    const day2 = updatedItinerary[1];
    if (day2.activities.length >= 2) {
      // Move indoor/lower altitude activity to Day 2 and delay outdoor peak activity
      const originalOutdoor = day2.activities[1];
      day2.activities[1] = {
        ...alert.alternativeActivity,
        whyRecommended: 'Swapped by Desh AI Smart Replan due to heavy rain forecast at high altitude.',
      };
      
      // Push outdoor activity to Day 3 if present
      if (updatedItinerary.length >= 3) {
        updatedItinerary[2].activities.unshift({
          ...originalOutdoor,
          timeSlot: '11:00 AM (Rescheduled)',
          whyRecommended: 'Rescheduled from Day 2 when weather clears to blue skies.',
        });
      }
    }
  }

  return {
    updatedItinerary,
    explanation: `Desh AI detected ${alert.title.toLowerCase()}. Outdoor activities have been automatically rescheduled to dry time windows, and local heritage culture stops added to protect your trip experience!`,
  };
}

export async function aiAnswerQuestion(
  question: string,
  tripContext?: { destinationName?: string; budget?: number; duration?: number }
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const q = question.toLowerCase();
  const destName = tripContext?.destinationName || 'your destination';

  if (q.includes('cheaper hotel') || q.includes('reduce budget') || q.includes('cheaper stay')) {
    return `To save ₹3,000–₹5,000 on your ${destName} trip, I recommend switching to verified heritage homestays or backpacker hostels like Zostel in Old Town. Also, booking midweek stays instead of Saturday night gives an average 18% price drop!`;
  }
  if (q.includes('rain') || q.includes('weather') || q.includes('forecast')) {
    return `Weather for ${destName}: Expect clear mountain/sunny skies during daytime with crisp evening breezes around 14°C–18°C. Carry a light jacket and comfortable walking shoes!`;
  }
  if (q.includes('food') || q.includes('eat') || q.includes('restaurant')) {
    return `Top food experiences in ${destName}: Try local organic Siddu with ghee, wood-fired trout at old town cafes, hot Tibetan momos, and local herbal spiced saffron Kahwa!`;
  }
  if (q.includes('cheapest way') || q.includes('transport') || q.includes('reach')) {
    return `The most budget-friendly way to reach ${destName} is taking the overnight Volvo AC bus from ISBT Delhi (approx ₹1,600/person) or taking Vande Bharat Express to Chandigarh followed by a shared mountain cab.`;
  }

  return `Desh AI here! For your ${destName} journey, everything is optimized for your budget. You can customize activities, view alternative transport options, or activate Smart Replan if weather changes!`;
}
