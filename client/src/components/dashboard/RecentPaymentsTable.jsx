function RecentPaymentsTable() {
  const payments = [
    {
      id: 1,
      tenant: "John Doe",
      property: "Apartment 101",
      amount: "$1200",
      date: "March 25, 2025",
      status: "Paid"
    },
    {
      id: 2,
      tenant: "Jane Smith",
      property: "Condo 305",
      amount: "$1500",
      date: "March 24, 2025",
      status: "Paid"
    },
    {
      id: 3,
      tenant: "David Wilson",
      property: "Villa B12",
      amount: "$2000",
      date: "March 23, 2025",
      status: "Pending"
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-xs sm:text-sm">
              <th className="p-2 sm:p-3 border border-gray-300 text-left">
                Tenant
              </th>
              <th className="p-2 sm:p-3 border border-gray-300 text-left">
                Property
              </th>
              <th className="p-2 sm:p-3 border border-gray-300 text-left">
                Amount
              </th>
              <th className="p-2 sm:p-3 border border-gray-300 text-left">
                Date
              </th>
              <th className="p-2 sm:p-3 border border-gray-300 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border border-gray-300 text-xs sm:text-sm"
              >
                <td className="p-2 sm:p-3 border border-gray-300">
                  {payment.tenant}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300">
                  {payment.property}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300">
                  {payment.amount}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300">
                  {payment.date}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300">
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-xs sm:text-sm ${
                      payment.status === "Paid"
                        ? "bg-green-200 text-green-700"
                        : "bg-yellow-200 text-yellow-700"
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
  );
}

export default RecentPaymentsTable;
