import React from "react";

const TenantDashboard = () => {
  const summaryData = [
    { title: "Rent Due", value: "₹15,000" },
    { title: "Last Payment", value: "2025-04-20" },
    { title: "Total Paid (2025)", value: "₹60,000" },
    { title: "Next Reminder", value: "2025-05-01" }
  ];

  const paymentHistory = [
    { date: "2025-04-20", amount: "₹15,000", status: "Paid" },
    { date: "2025-03-20", amount: "₹15,000", status: "Paid" },
    { date: "2025-02-20", amount: "₹15,000", status: "Paid" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Welcome Header */}
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome, Tenant!
        </h1>
        <p className="text-gray-600 mt-2">
          View your rent status, history, and upcoming payments.
        </p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-gray-500 text-sm">{item.title}</h2>
            <p className="mt-2 text-xl font-semibold text-gray-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Payment History */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Payment History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-600">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{payment.date}</td>
                  <td className="py-3 px-4">{payment.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
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

      {/* Upcoming Payment Notice */}
      <div className="bg-blue-100 p-6 rounded-2xl shadow text-blue-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Upcoming Payment Due</h2>
          <p>
            Your next rent payment of <strong>₹15,000</strong> is due on{" "}
            <strong>2025-05-01</strong>.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default TenantDashboard;
