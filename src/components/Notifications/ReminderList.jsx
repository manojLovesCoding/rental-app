import { useState } from "react";

function ReminderList() {
  const [reminders, setReminders] = useState([
    { id: 1, message: "Rent due on April 5th", read: false },
    { id: 2, message: "Late payment alert", read: false }
  ]);

  const markAsRead = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, read: true } : reminder
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Upcoming Reminders</h3>
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className={`p-2 border-b flex justify-between ${
            reminder.read ? "text-gray-500" : ""
          }`}
        >
          <span>{reminder.message}</span>
          {!reminder.read && (
            <button
              onClick={() => markAsRead(reminder.id)}
              className="text-blue-600 hover:underline"
            >
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReminderList;
