import { useState } from "react";
const UPIInput = ({ onSubmit }) => {
  const [upiId, setUpiId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ upiId });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block mb-2">UPI ID:</label>
      <input
        type="text"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
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
export default UPIInput;
