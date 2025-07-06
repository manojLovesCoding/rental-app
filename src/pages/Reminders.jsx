import React, { useState } from "react";

const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Rent Due - John Doe",
      description: "April rent payment pending.",
      dueDate: "2025-04-30",
      tenant: "John Doe",
      status: "Pending"
    },
    {
      id: 2,
      title: "Lease Renewal - Jane Smith",
      description: "Lease ends next month. Discuss renewal.",
      dueDate: "2025-05-15",
      tenant: "Jane Smith",
      status: "Pending"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    tenant: "",
    status: "Pending"
  });

  const openAddModal = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      tenant: "",
      status: "Pending"
    });
    setShowModal(true);
  };

  const handleSaveReminder = (e) => {
    e.preventDefault();
    const newReminder = { id: reminders.length + 1, ...formData };
    setReminders((prev) => [...prev, newReminder]);
    setShowModal(false);
  };

  const markAsCompleted = (id) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, status: "Completed" } : reminder
      )
    );
  };

  const getFilteredReminders = () => {
    if (filter === "All") return reminders;
    return reminders.filter((reminder) => reminder.status === filter);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Reminders
          </h1>
          <p className="text-gray-600 mt-2">
            Manage important tasks and alerts.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all"
          >
            + Add Reminder
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="grid gap-4">
        {getFilteredReminders().map((reminder) => (
          <div
            key={reminder.id}
            className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {reminder.title}
              </h2>
              <p className="text-gray-600">{reminder.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                Due: {reminder.dueDate} | Tenant: {reminder.tenant}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              {reminder.status === "Pending" && (
                <button
                  onClick={() => markAsCompleted(reminder.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Mark Completed
                </button>
              )}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  reminder.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {reminder.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Add Reminder
            </h2>
            <form onSubmit={handleSaveReminder} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                rows="3"
                required
              />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Tenant"
                value={formData.tenant}
                onChange={(e) =>
                  setFormData({ ...formData, tenant: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;
