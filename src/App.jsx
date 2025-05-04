import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MenuIcon } from "lucide-react";
import LandlordDashboard from "./components/LandlordDashboard";
import Sidebar from "./components/Sidebar";
import Properties from "./pages/Properties";
import ManageUnits from "./pages/ManageUnits";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Reminders from "./pages/Reminders";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 text-default">
      {isLandingPage ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      ) : (
        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main content */}
          <div className="flex-1 md:ml-64">
            {/* Top navbar (mobile) */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white shadow sticky top-0 z-30">
              <button onClick={() => setSidebarOpen(true)}>
                <MenuIcon size={24} className="text-gray-700" />
              </button>
              <h1 className="text-lg font-semibold text-blue-600">
                RentManage
              </h1>
            </div>

            <main className="p-4">
              <Toaster position="top-center" reverseOrder={false} />
              <Routes>
                <Route path="/dashboard" element={<LandlordDashboard />} />
                <Route path="/properties" element={<Properties />} />
                <Route
                  path="/manage-units/:propertyId"
                  element={<ManageUnits />}
                />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/reminders" element={<Reminders />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
