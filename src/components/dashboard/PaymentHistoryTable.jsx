function PaymentHistoryTable() {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h3 className="text-lg font-bold mb-2">Payment History</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">March 5, 2025</td>
            <td className="p-2">$1200</td>
          </tr>
          <tr>
            <td className="p-2">February 5, 2025</td>
            <td className="p-2">$1200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistoryTable;
