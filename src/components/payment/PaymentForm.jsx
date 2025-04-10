import { useState } from "react";
const PaymentForm = ({ setPaymentMethod, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, method });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block mb-2">Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <label className="block mt-4">Payment Method:</label>
      <select
        value={method}
        onChange={(e) => {
          setMethod(e.target.value);
          setPaymentMethod(e.target.value);
        }}
        className="w-full p-2 border rounded"
      >
        <option value="card">Credit/Debit Card</option>
        <option value="upi">UPI</option>
      </select>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
      >
        Proceed
      </button>
    </form>
  );
};

export default PaymentForm;
