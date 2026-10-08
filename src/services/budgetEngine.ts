import { BudgetBreakdown, FuelCalculation, UserPlannerInput, Destination } from '@/types';

export function calculateSmartBudget(
  targetBudget: number,
  travelers: number,
  durationDays: number,
  stayPreference: string,
  travelPreference: string
): BudgetBreakdown {
  // Multiply rates by travelers and duration
  let baseStayNight = 1200;
  if (stayPreference === 'Resort') baseStayNight = 3500;
  else if (stayPreference === 'Hotel') baseStayNight = 2200;
  else if (stayPreference === 'Homestay') baseStayNight = 1600;
  else if (stayPreference === 'Hostel') baseStayNight = 850;

  const estimatedStay = Math.round(baseStayNight * durationDays * (travelers > 2 ? 1.5 : 1));
  const estimatedFood = Math.round(600 * travelers * durationDays);
  const estimatedActivities = Math.round(800 * travelers * durationDays);
  const estimatedLocalTravel = Math.round(400 * durationDays * travelers);

  let baseTransportPerPerson = 2500;
  if (travelPreference === 'Fastest') baseTransportPerPerson = 4500;
  else if (travelPreference === 'Cheapest') baseTransportPerPerson = 1400;

  const estimatedTransport = Math.round(baseTransportPerPerson * travelers);

  const subtotal = estimatedStay + estimatedFood + estimatedActivities + estimatedLocalTravel + estimatedTransport;
  const emergencyBuffer = Math.max(2500, Math.round(targetBudget * 0.1));

  let totalCost = subtotal + emergencyBuffer;

  // Scale proportional to user budget if specified higher
  if (targetBudget > totalCost && targetBudget <= totalCost * 2) {
    const scaleFactor = targetBudget / totalCost;
    return {
      totalBudget: targetBudget,
      estimatedTotalCost: Math.round(targetBudget * 0.88),
      transport: Math.round(estimatedTransport * scaleFactor * 0.8),
      stay: Math.round(estimatedStay * scaleFactor * 0.9),
      food: Math.round(estimatedFood * scaleFactor * 0.85),
      activities: Math.round(estimatedActivities * scaleFactor * 0.85),
      localTravel: Math.round(estimatedLocalTravel * scaleFactor * 0.8),
      emergencyBuffer: Math.round(targetBudget * 0.12),
    };
  }

  return {
    totalBudget: targetBudget,
    estimatedTotalCost: Math.min(targetBudget, totalCost),
    transport: estimatedTransport,
    stay: estimatedStay,
    food: estimatedFood,
    activities: estimatedActivities,
    localTravel: estimatedLocalTravel,
    emergencyBuffer: emergencyBuffer,
  };
}

export function calculateCarFuelCosts(
  distanceKm: number,
  mileageKmpl: number = 14,
  fuelPricePerLiter: number = 96.5,
  tollsEstimated: number = 850,
  parkingEstimated: number = 400
): FuelCalculation {
  const fuelLitersNeeded = distanceKm / mileageKmpl;
  const fuelCostTotal = Math.round(fuelLitersNeeded * fuelPricePerLiter * 2); // Round trip
  const grandTotalCarCost = fuelCostTotal + tollsEstimated * 2 + parkingEstimated;

  return {
    distanceKm,
    mileageKmpl,
    fuelPricePerLiter,
    fuelCostTotal,
    tollsEstimated: tollsEstimated * 2,
    parkingEstimated,
    grandTotalCarCost,
  };
}

export function filterDestinationsByBudget(
  destinations: Destination[],
  userInput: UserPlannerInput
): Destination[] {
  const { budget, travelers, durationDays, interests } = userInput;

  return destinations
    .map((dest) => {
      // Calculate realistic cost for this destination given user's parameters
      const durationFactor = durationDays / dest.recommendedDurationDays;
      const travelerFactor = travelers > 1 ? travelers * 0.85 : 1;

      const dynamicEstCost = Math.round(dest.estimatedCost * durationFactor * travelerFactor);
      const isWithinBudget = dynamicEstCost <= budget * 1.15;

      // Interest overlap match
      let interestMatches = 0;
      if (interests.length > 0) {
        interests.forEach((userInt) => {
          if (
            dest.topExperiences.some((exp) => exp.toLowerCase().includes(userInt.toLowerCase())) ||
            dest.tagline.toLowerCase().includes(userInt.toLowerCase()) ||
            dest.description.toLowerCase().includes(userInt.toLowerCase())
          ) {
            interestMatches += 1;
          }
        });
      }

      const interestBonus = Math.min(30, interestMatches * 10);
      const budgetFitBonus = isWithinBudget ? 25 : -20;
      let calculatedAiMatch = Math.min(99, Math.max(50, dest.aiMatchPercentage + interestBonus + (isWithinBudget ? 5 : -15)));

      return {
        ...dest,
        estimatedCost: dynamicEstCost,
        aiMatchPercentage: calculatedAiMatch,
        baseBudgetBreakdown: calculateSmartBudget(
          dynamicEstCost,
          travelers,
          durationDays,
          userInput.stayPreference,
          userInput.travelPreference
        ),
      };
    })
    .sort((a, b) => b.aiMatchPercentage - a.aiMatchPercentage);
}
