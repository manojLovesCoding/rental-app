import { useState } from "react";

const CardDetailsForm = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cardNumber });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block mb-2">Card Number:</label>
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CardDetailsForm;
