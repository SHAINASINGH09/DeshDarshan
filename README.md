# 🇮🇳 DeshDarshan (देशदर्शन)
### *From Dreams to Destinations — India on Your Budget.*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-orange?style=for-the-badge)](https://turbo.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**DeshDarshan** is an intelligent, full-stack travel planning platform designed specifically for discovering and planning journeys across India. Powered by smart budget allocation, multi-modal transit math, interactive hotel room selection, and dynamic seasonal intelligence, DeshDarshan builds complete, customized itineraries tailored to your budget, time, and travel preferences.

---

## 🌟 Key Features

### 1. 💰 Smart Budget Optimization Engine
- **Accurate Indian Rupee (₹) Math**: Granular expense breakdown across transport, lodging, food, local transit, activities, and an emergency buffer.
- **Budget Slider (₹10,000 – ₹5,00,000+)**: Tailors recommendations to budget tier (Backpacker, Balanced, Luxury).
- **Real-Time Cost Recalculation**: Adjustments to travelers, days, transport, or hotels immediately rebalance the budget.

### 2. 🗺️ Interactive Destination Discovery
- **Rich Indian Destination Catalog**: Curated destinations across Jammu & Kashmir, Himachal Pradesh, Rajasthan, Goa, Kerala, Ladakh, Uttar Pradesh, and Uttarakhand.
- **Interactive Tourist Cards**: Hover over cards for subtle zoom, state metadata, and quick 1-click exploration.
- **Seasonal Intelligence**: Dynamic recommendations based on weather, peak seasons, and crowd levels.

### 3. 🏨 Interactive Hotel & Room Selection
- **Deep Room Type Customization**: Choose between Standard, Deluxe, and Executive Suites with capacity, bed configuration, and pricing.
- **Detailed Modal Experience**: View verified amenities, check-in/check-out policies, distance from attractions, and guest ratings.
- **Trip Plan Integration**: Chosen rooms immediately update your persistent trip budget.

### 4. 🚆 Multi-Modal Transport Engine
- **IRCTC Train Integration**: Real-time route estimates with direct 1-click booking link to the official [IRCTC Portal](https://www.irctc.co.in).
- **Own Car Fuel & Toll Calculator**: Computes round-trip fuel expenditure using custom distance, vehicle mileage (km/L), current fuel rates, and highway tolls.
- **Flight & Bus Routes**: Compare cost vs. travel duration to choose the fastest or cheapest mode.

### 5. 📌 Persistent Trip Planning Assistant
- **Desktop Side Panel & Mobile Drawer**: Dynamically tracks selected destinations, travel dates, travelers, chosen transport, hotel rooms, activities, and budget remaining.
- **Save Trip to Device**: Persist customized plans directly into browser storage (`localStorage`) without requiring third-party logins.
- **Saved Plans Dashboard**: Revisit, review, edit, or delete previously created itineraries anytime.

### 6. 🎨 Elegant Indian Heritage Visual Identity
- Inspired by the official DeshDarshan emblem.
- **Color Palette**: Soft Golden Yellow (`#D9A62E`), Muted Forest Green (`#3F6B55`), and Warm White (`#FAF8F5`).
- Clean, trustworthy, modern travel SaaS design avoiding neon distraction or generic templates.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Bundler**: Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Client-Side Persistence (`localStorage`)

---

## 📂 Project Architecture

```plaintext
deshdarshan/
├── public/
│   ├── logo.jpg                 # Official DeshDarshan brand emblem
│   └── ...                      # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css          # Theme variables & warm palette styling
│   │   ├── layout.tsx           # Root metadata & fonts
│   │   └── page.tsx             # Main dashboard orchestration
│   ├── components/
│   │   ├── Navbar.tsx               # Header with brand identity & alerts
│   │   ├── LandingHero.tsx          # Hero section with interactive cards
│   │   ├── TravelDashboard.tsx      # Seasonal highlights & price drops
│   │   ├── SmartTripPlanner.tsx     # Multi-step requirement planner
│   │   ├── DestinationDiscovery.tsx # Destination listings & comparison
│   │   ├── DestinationDetailView.tsx# In-depth destination guide
│   │   ├── TransportEngine.tsx      # IRCTC links & Own Car fuel math
│   │   ├── StayDiscovery.tsx        # Hotel options
│   │   ├── HotelDetailModal.tsx     # Room selection modal
│   │   ├── AIItineraryView.tsx      # Day-by-day activity breakdown
│   │   ├── InteractiveIndiaMap.tsx  # Route visualization
│   │   ├── TripPlanningSidebar.tsx  # Persistent real-time trip drawer
│   │   ├── SavedTripsView.tsx       # Saved trip management
│   │   ├── DeshAIAssistant.tsx      # Floating travel assistant
│   │   └── Footer.tsx               # Footer with links & tagline
│   ├── data/
│   │   └── destinationsData.ts  # Verified Indian destination dataset
│   ├── services/
│   │   ├── aiService.ts         # Destination matching & scoring
│   │   ├── budgetEngine.ts      # Expense calculation & fuel formulas
│   │   └── seasonalEngine.ts    # Month-by-month weather analysis
│   └── types/
│       └── index.ts             # TypeScript definitions
├── next.config.ts               # Next.js config (image domains, etc.)
├── package.json                 # Dependencies & scripts
└── tsconfig.json                # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.18.0 or newer) and `npm` installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SHAINASINGH09/DeshDarshan.git
   cd DeshDarshan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Production Build

To build the application for production:

```bash
npm run build
```

To run the optimized production server locally:

```bash
npm run start
```

---

## ☁️ Deployment on Vercel

The easiest way to deploy DeshDarshan is using the [Vercel Platform](https://vercel.com/):

1. Push your latest code to your GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Select your repository (`SHAINASINGH09/DeshDarshan`) and click **Import**.
4. Keep the default settings (Next.js is automatically configured).
5. Click **Deploy**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with ❤️ for exploring the incredible beauty and heritage of India.
</p>
