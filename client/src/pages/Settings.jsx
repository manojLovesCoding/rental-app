import Sidebar from "../components/Sidebar.jsx";
import ProfileForm from "../components/Settings/ProfileForm.jsx";
import ChangePasswordForm from "../components/Settings/ChangePasswordForm.jsx";
import PaymentMethods from "../components/Settings/PaymentMethods.jsx";
import NotificationPreferences from "../components/Settings/NotificationPreferences.jsx";

import { Navigate } from "react-router-dom";

function Settings() {
  // Assume user comes from authentication context or global state
  const user = { role: "tenant" }; // Example: 'tenant' or 'landlord'

  // Check if user is authenticated (example, replace with real auth logic)
  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  // Optional: Check if user has the required role
  if (user.role !== "tenant" && user.role !== "landlord") {
    return <Navigate to="/not-authorized" />; // Redirect to a 'not authorized' page if necessary
  }

  return (
    <div className="flex">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        {/* Profile Form */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          <ProfileForm />
        </div>

        {/* Change Password Form */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>
          <ChangePasswordForm />
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <PaymentMethods />
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Notification Preferences
          </h3>
          <NotificationPreferences />
        </div>
      </div>
    </div>
  );
}

export default Settings;
