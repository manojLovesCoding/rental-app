import { Link } from "react-router-dom";

function PayRentButton() {
  return (
    <Link to="/dashboard/payment">
      <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 w-full">
        Pay Rent Now
      </button>
    </Link>
  );
}

export default PayRentButton;
