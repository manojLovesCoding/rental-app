function RentDueCard() {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h3 className="text-lg font-bold">Rent Due</h3>
      <p className="text-gray-700 mt-2">
        Amount: <span className="font-semibold">$1200</span>
      </p>
      <p className="text-gray-700">
        Due Date: <span className="font-semibold">April 5, 2025</span>
      </p>
    </div>
  );
}

export default RentDueCard;
