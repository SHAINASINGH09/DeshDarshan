import { Destination } from '@/types';

export interface SeasonalMonthInfo {
  monthIndex: number; // 0..11
  monthName: string; // e.g. "October"
  year: number; // e.g. 2026
  label: string; // e.g. "October 2026"
  isCurrent: boolean;
  seasonName: string; // e.g. "Autumn", "Winter", "Spring", "Monsoon", "Summer"
  summary: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getDynamicSeasonalMonths(baseDate?: Date): {
  currentMonth: SeasonalMonthInfo;
  nextMonth: SeasonalMonthInfo;
  monthAfterNext: SeasonalMonthInfo;
  threeMonthsList: SeasonalMonthInfo[];
} {
  // Use provided baseDate or static fallback date to avoid SSR hydration mismatch in Next.js 16
  const now = baseDate || new Date(2026, 9, 1);
  const currentMonthIdx = now.getMonth();
  const currentYear = now.getFullYear();

  const getMonthInfo = (offset: number): SeasonalMonthInfo => {
    let targetIdx = (currentMonthIdx + offset) % 12;
    let targetYear = currentYear + Math.floor((currentMonthIdx + offset) / 12);

    const mName = MONTH_NAMES[targetIdx];
    let season = 'Autumn';
    let summary = 'Crisp mountain air, clear skies, and ideal travel conditions.';

    if (targetIdx >= 11 || targetIdx <= 1) {
      season = 'Winter';
      summary = 'Snow adventures in Himalayas, sunny coastal beaches & vibrant heritage festivals.';
    } else if (targetIdx >= 2 && targetIdx <= 4) {
      season = 'Spring / Early Summer';
      summary = 'Pleasant temperatures, blooming mountain valleys & great outdoor sightseeing.';
    } else if (targetIdx >= 5 && targetIdx <= 7) {
      season = 'Monsoon';
      summary = 'Lush green landscapes, cascading waterfalls & tranquil low-season rates.';
    } else if (targetIdx >= 8 && targetIdx <= 10) {
      season = 'Autumn';
      summary = 'Cooler weather, clearer skies, golden chinars and post-monsoon freshness.';
    }

    return {
      monthIndex: targetIdx,
      monthName: mName,
      year: targetYear,
      label: `${mName} ${targetYear}`,
      isCurrent: offset === 0,
      seasonName: season,
      summary: summary,
    };
  };

  const currentMonth = getMonthInfo(0);
  const nextMonth = getMonthInfo(1);
  const monthAfterNext = getMonthInfo(2);

  return {
    currentMonth,
    nextMonth,
    monthAfterNext,
    threeMonthsList: [currentMonth, nextMonth, monthAfterNext],
  };
}

export function rankDestinationsForMonth(
  destinations: Destination[],
  monthIndex: number
): { destination: Destination; seasonalScore: number; whyVisitNow: string }[] {
  // Month is 0-indexed in JS (0=Jan, 9=Oct, 11=Dec)
  const humanMonth = monthIndex + 1; // 1..12

  return destinations
    .map((dest) => {
      const isBestMonth = dest.bestMonths.includes(humanMonth);
      let seasonalScore = 75;

      if (isBestMonth) {
        seasonalScore = 92;
      } else {
        seasonalScore = 72;
      }

      let whyVisitNow = `${MONTH_NAMES[monthIndex]} offers favorable weather and strong seasonal experiences in ${dest.name}.`;

      if (humanMonth === 10 || humanMonth === 11) {
        if (dest.name.includes('Kashmir')) {
          whyVisitNow = 'October & November showcase Kashmir’s world-famous golden Chinar leaves and crisp blue autumn skies.';
        } else if (dest.name.includes('Manali') || dest.name.includes('Auli')) {
          whyVisitNow = 'Clear mountain atmosphere with early snow-peaks and comfortable trekking weather.';
        } else if (dest.name.includes('Jaipur') || dest.name.includes('Rajasthan')) {
          whyVisitNow = 'Cooler desert breezes make palace exploration, fort walks, and outdoor bazaars extremely pleasant.';
        }
      } else if (humanMonth === 12 || humanMonth === 1 || humanMonth === 2) {
        if (dest.name.includes('Auli') || dest.name.includes('Manali')) {
          whyVisitNow = 'Peak winter snow season! Perfect for ski lessons, snowfall, and cozy fireplace hot stays.';
        } else if (dest.name.includes('Goa') || dest.name.includes('Kerala')) {
          whyVisitNow = 'Gentle tropical sunshine, calm sea water conditions, and lively cultural beach energy.';
        }
      }

      return {
        destination: dest,
        seasonalScore,
        whyVisitNow,
      };
    })
    .sort((a, b) => b.seasonalScore - a.seasonalScore);
}
