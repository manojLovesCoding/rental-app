// SMSReminderToggle.js
import { useState } from "react";

function SMSReminderToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <span>SMS Reminders</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`px-4 py-2 rounded-md ${
          enabled ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
}

export default SMSReminderToggle;
