import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Payment from "./pages/Payment.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import Properties from "./pages/Properties.jsx";
import Notifications from "./pages/Notifications.jsx";
import Support from "./pages/Support.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import TenantsPage from "./pages/Tenants.jsx";
import NotificationsPage from "./pages/Notifications.jsx";

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar is always visible */}
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/payment" element={<Payment />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/properties" element={<Properties />} />
          <Route path="/dashboard/tenants" element={<TenantsPage />} />
          <Route
            path="/dashboard/notifications"
            element={<NotificationsPage />}
          />
          <Route path="/dashboard/support" element={<Support />} />
        </Routes>
      </div>

      {/* Footer is always visible */}
      <Footer />
    </div>
  );
}

export default App;
