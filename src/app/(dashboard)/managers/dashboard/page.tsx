"use client";

type SummaryItem = {
  title: string;
  value: string | number;
};

type Payment = {
  tenant: string;
  apartment: string;
  unit: string;
  amount: string;
  date: string;
  status: string;
};

type Reminder = {
  tenant: string;
  apartment: string;
  unit: string;
  dueDate: string;
  reminderType: string;
  status: string;
};

const LandlordDashboard: React.FC = () => {
  const summaryData: SummaryItem[] = [
    { title: "Properties", value: 2 },
    { title: "Tenants", value: 24 },
    { title: "Total Income (This Month)", value: "₹1,20,000" },
    { title: "Due Payments", value: 3 },
  ];

  const recentPayments: Payment[] = [
    {
      tenant: "John Doe",
      apartment: "Sunshine Residency",
      unit: "A-101",
      amount: "₹15,000",
      date: "2025-04-20",
      status: "Paid",
    },
    {
      tenant: "Jane Smith",
      apartment: "Lakeview Heights",
      unit: "B-203",
      amount: "₹18,000",
      date: "2025-04-18",
      status: "Paid",
    },
    {
      tenant: "Mark Lee",
      apartment: "Hilltop Villas",
      unit: "C-305",
      amount: "₹10,000",
      date: "2025-04-15",
      status: "Pending",
    },
  ];

  const upcomingReminders: Reminder[] = [
    {
      tenant: "John Doe",
      apartment: "Sunshine Residency",
      unit: "A-101",
      dueDate: "2025-05-01",
      reminderType: "Email + SMS",
      status: "Scheduled",
    },
    {
      tenant: "Jane Smith",
      apartment: "Lakeview Heights",
      unit: "B-203",
      dueDate: "2025-05-03",
      reminderType: "Email",
      status: "Scheduled",
    },
    {
      tenant: "Mark Lee",
      apartment: "Hilltop Villas",
      unit: "C-305",
      dueDate: "2025-05-05",
      reminderType: "SMS",
      status: "Not Sent Yet",
    },
  ];

  const statusStyle = (status: string): string => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Scheduled") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Welcome, Landlord!
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Manage your properties, tenants, and payments here.
        </p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 md:p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-gray-500 text-sm sm:text-base">{item.title}</h2>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-gray-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Payments Section */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
          Recent Payments
        </h2>

        {/* Table for md+ */}
        <div className="hidden md:block bg-white p-6 rounded-2xl shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-600">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4">Tenant</th>
                  <th className="py-3 px-4">Apartment</th>
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{payment.tenant}</td>
                    <td className="py-3 px-4">{payment.apartment}</td>
                    <td className="py-3 px-4">{payment.unit}</td>
                    <td className="py-3 px-4">{payment.amount}</td>
                    <td className="py-3 px-4">{payment.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${statusStyle(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards for sm only */}
        <div className="md:hidden space-y-4">
          {recentPayments.map((payment, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow space-y-2 text-sm"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{payment.tenant}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${statusStyle(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </span>
              </div>
              <div>
                <strong>Apartment:</strong> {payment.apartment}
              </div>
              <div>
                <strong>Unit:</strong> {payment.unit}
              </div>
              <div>
                <strong>Amount:</strong> {payment.amount}
              </div>
              <div>
                <strong>Date:</strong> {payment.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Reminders Section */}
      <section>
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
          Upcoming Reminders
        </h2>

        {/* Table for md+ */}
        <div className="hidden md:block bg-white p-6 rounded-2xl shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-600">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4">Tenant</th>
                  <th className="py-3 px-4">Apartment</th>
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Reminder Type</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingReminders.map((reminder, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{reminder.tenant}</td>
                    <td className="py-3 px-4">{reminder.apartment}</td>
                    <td className="py-3 px-4">{reminder.unit}</td>
                    <td className="py-3 px-4">{reminder.dueDate}</td>
                    <td className="py-3 px-4">{reminder.reminderType}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${statusStyle(
                          reminder.status
                        )}`}
                      >
                        {reminder.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards for sm only */}
        <div className="md:hidden space-y-4">
          {upcomingReminders.map((reminder, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow space-y-2 text-sm"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{reminder.tenant}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${statusStyle(
                    reminder.status
                  )}`}
                >
                  {reminder.status}
                </span>
              </div>
              <div>
                <strong>Apartment:</strong> {reminder.apartment}
              </div>
              <div>
                <strong>Unit:</strong> {reminder.unit}
              </div>
              <div>
                <strong>Due Date:</strong> {reminder.dueDate}
              </div>
              <div>
                <strong>Reminder Type:</strong> {reminder.reminderType}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandlordDashboard;
