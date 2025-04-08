import { useState } from "react";
import { Navigate } from "react-router-dom";
import TenantDashboard from "./TenantDashboard";
import LandlordDashboard from "./LandlordDashboard";

function Dashboard() {
  // Assume userType comes from authentication (tenant or landlord)
  const [userType] = useState("landlord"); // Change to "landlord" for testing

  if (userType === "tenant") {
    return <TenantDashboard />;
  } else if (userType === "landlord") {
    return <LandlordDashboard />;
  } else {
    return <Navigate to="/" />;
  }
}

export default Dashboard;
