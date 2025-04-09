import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ReminderList from "../components/Notifications/ReminderList.jsx";
import EmailReminderToggle from "../components/Notifications/EmailReminderToggle.jsx";
import SMSReminderToggle from "../components/Notifications/SMSReminderToggle.jsx";

function Notifications() {
  const [reminders, setReminders] = useState([
    { id: 1, message: "Rent due in 3 days", read: false },
    { id: 2, message: "Maintenance check scheduled", read: false }
  ]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-4">Notifications & Reminders</h2>

        {/* Reminder List */}
        <ReminderList reminders={reminders} setReminders={setReminders} />

        {/* Notification Toggles */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">
            Notification Preferences
          </h3>
          <EmailReminderToggle />
          <SMSReminderToggle />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
