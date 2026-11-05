import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AdSlot } from './components/AdSlot';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { MapPage } from './pages/MapPage';

// Calculators
import { CalculatorsHub } from './pages/calculators/CalculatorsHub';
import { MoneyCalculator } from './pages/calculators/MoneyCalculator';
import { LoadoutBuilder } from './pages/calculators/LoadoutBuilder';
import { VehicleComparison } from './pages/calculators/VehicleComparison';

// Database
import { DatabaseHub } from './pages/database/DatabaseHub';
import { VehiclesDatabase } from './pages/database/VehiclesDatabase';
import { VehicleDetail } from './pages/database/VehicleDetail';
import { WeaponsDatabase } from './pages/database/WeaponsDatabase';
import { WeaponDetail } from './pages/database/WeaponDetail';
import { PropertiesDatabase } from './pages/database/PropertiesDatabase';
import { PropertyDetail } from './pages/database/PropertyDetail';

// Status & Guides
import { StatusPage } from './pages/StatusPage';
import { GuidesPage } from './pages/guides/GuidesPage';
import { GuideDetail } from './pages/guides/GuideDetail';

// Utility Pages
import { AboutPage } from './pages/utility/AboutPage';
import { ContactPage } from './pages/utility/ContactPage';
import { PrivacyPage } from './pages/utility/PrivacyPage';
import { TermsPage } from './pages/utility/TermsPage';
import { DisclaimerPage } from './pages/utility/DisclaimerPage';
import { NotFoundPage } from './pages/utility/NotFoundPage';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0B0614] text-[#FFF5FB] bg-grain font-sans">
          {/* Top Sticky Navbar */}
          <Navbar onOpenSearch={() => setSearchOpen(true)} />

          {/* Main Viewport Content */}
          <main className="flex-1 pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapPage />} />

              {/* Calculators Suite */}
              <Route path="/calculators" element={<CalculatorsHub />} />
              <Route path="/calculators/money" element={<MoneyCalculator />} />
              <Route path="/calculators/loadout" element={<LoadoutBuilder />} />
              <Route path="/calculators/compare" element={<VehicleComparison />} />

              {/* Database Suite */}
              <Route path="/database" element={<DatabaseHub />} />
              <Route path="/database/vehicles" element={<VehiclesDatabase />} />
              <Route path="/database/vehicles/:slug" element={<VehicleDetail />} />
              <Route path="/database/weapons" element={<WeaponsDatabase />} />
              <Route path="/database/weapons/:slug" element={<WeaponDetail />} />
              <Route path="/database/properties" element={<PropertiesDatabase />} />
              <Route path="/database/properties/:slug" element={<PropertyDetail />} />

              {/* Live Status & Guides */}
              <Route path="/status" element={<StatusPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/guides/:slug" element={<GuideDetail />} />

              {/* Utility Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Sticky Dismissible Mobile Ad Slot */}
          <AdSlot size="sticky-mobile" />

          {/* Global Footer with Mandatory Disclaimers */}
          <Footer />

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav />

          {/* Global Search Modal (Cmd+K / Search icon) */}
          <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

          {/* Cookie / LocalStorage Preferences Consent Banner */}
          <CookieConsent />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
