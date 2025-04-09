const payments = [
  { id: 1, tenant: "John Doe", amount: "$1200", date: "March 15, 2025" },
  { id: 2, tenant: "Jane Smith", amount: "$1400", date: "March 10, 2025" }
];

function PaymentsTable() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2">Recent Payments</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Tenant</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t">
              <td className="p-2">{payment.tenant}</td>
              <td className="p-2">{payment.amount}</td>
              <td className="p-2">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsTable;
