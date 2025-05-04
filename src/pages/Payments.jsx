import React, { useState, useEffect } from "react";

const Payments = () => {
  const [tenants] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mark Lee" }
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      tenant: "John Doe",
      property: "Greenwood Apartments",
      unit: "Unit 101",
      amount: "15000",
      date: "2025-04-20",
      status: "Paid"
    },
    {
      id: 2,
      tenant: "Jane Smith",
      property: "Sunshine Residency",
      unit: "Unit 202",
      amount: "18000",
      date: "2025-03-18",
      status: "Paid"
    },
    {
      id: 3,
      tenant: "Mark Lee",
      property: "Riverdale Heights",
      unit: "Unit A1",
      amount: "10000",
      date: "2025-02-05",
      status: "Pending"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterMonth, setFilterMonth] = useState("");
  const [monthsList, setMonthsList] = useState([]);
  const [formData, setFormData] = useState({
    tenant: "",
    property: "",
    unit: "",
    amount: "",
    date: "",
    status: "Paid"
  });

  useEffect(() => {
    const today = new Date();
    const months = [];
    for (let i = 0; i < 6; i++) {
      const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = monthDate.toLocaleString("default", { month: "long" });
      months.push({
        label: `${monthName} ${monthDate.getFullYear()}`,
        value: `${monthDate.getFullYear()}-${String(
          monthDate.getMonth() + 1
        ).padStart(2, "0")}`
      });
    }
    setMonthsList(months);
  }, []);

  const openAddModal = () => {
    setFormData({
      tenant: "",
      property: "",
      unit: "",
      amount: "",
      date: "",
      status: "Paid"
    });
    setShowModal(true);
  };

  const handleSavePayment = (e) => {
    e.preventDefault();
    const newPayment = { id: payments.length + 1, ...formData };
    setPayments((prev) => [...prev, newPayment]);
    setShowModal(false);
    alert("✅ Payment Added Successfully!");
  };

  const getFilteredPayments = () => {
    if (!filterMonth) return payments;
    return payments.filter((payment) => {
      const [year, month] = filterMonth.split("-");
      const paymentDate = new Date(payment.date);
      return (
        paymentDate.getFullYear() === parseInt(year) &&
        paymentDate.getMonth() + 1 === parseInt(month)
      );
    });
  };

  const autoFillAmount = (property, unit) => {
    if (property === "Greenwood Apartments" && unit === "Unit 101")
      return "15000";
    if (property === "Sunshine Residency" && unit === "Unit 202")
      return "18000";
    if (property === "Riverdale Heights" && unit === "Unit A1") return "10000";
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Manage Payments
          </h1>
          <p className="text-gray-600 mt-2">View and add payments easily.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
          >
            <option value="">All Months</option>
            {monthsList.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all w-full sm:w-auto"
          >
            + Add Payment
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md overflow-x-auto">
        <table className="min-w-full text-gray-600 text-sm sm:text-base">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left whitespace-nowrap">Tenant</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">
                Property
              </th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Unit</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Amount</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Date</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredPayments().map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{payment.tenant}</td>
                <td className="py-3 px-4">{payment.property}</td>
                <td className="py-3 px-4">{payment.unit}</td>
                <td className="py-3 px-4">₹{payment.amount}</td>
                <td className="py-3 px-4">{payment.date}</td>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
              Add Payment
            </h2>
            <form onSubmit={handleSavePayment} className="space-y-4">
              <select
                value={formData.tenant}
                onChange={(e) =>
                  setFormData({ ...formData, tenant: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Tenant</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.name}>
                    {tenant.name}
                  </option>
                ))}
              </select>

              <select
                value={formData.property}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    property: e.target.value,
                    unit: "",
                    amount: ""
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Property</option>
                <option value="Greenwood Apartments">
                  Greenwood Apartments
                </option>
                <option value="Sunshine Residency">Sunshine Residency</option>
                <option value="Riverdale Heights">Riverdale Heights</option>
              </select>

              {formData.property && (
                <select
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unit: e.target.value,
                      amount: autoFillAmount(formData.property, e.target.value)
                    })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Unit</option>
                  {formData.property === "Greenwood Apartments" && (
                    <>
                      <option value="Unit 101">Unit 101</option>
                      <option value="Unit 102">Unit 102</option>
                    </>
                  )}
                  {formData.property === "Sunshine Residency" && (
                    <>
                      <option value="Unit 201">Unit 201</option>
                      <option value="Unit 202">Unit 202</option>
                    </>
                  )}
                  {formData.property === "Riverdale Heights" && (
                    <>
                      <option value="Unit A1">Unit A1</option>
                      <option value="Unit A2">Unit A2</option>
                    </>
                  )}
                </select>
              )}

              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>

              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
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

export default Payments;
