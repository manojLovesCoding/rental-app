import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        RentPay
      </Link>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4">
        {/* Commented out links */}
        {/* <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link> */}
        {/* <Link to="/dashboard/payment" className="hover:underline">
          Pay Rent
        </Link> */}
        {/* <Link to="/reports" className="hover:underline">
          Reports
        </Link> */}
        {/* <Link to="/settings" className="hover:underline">
          Settings
        </Link> */}
        <Link
          to="/login"
          className="bg-white text-blue-600 px-3 py-1 rounded-md"
        >
          Login
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 text-white flex flex-col space-y-4 p-4 md:hidden">
          {/* Commented out links */}
          {/* <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="hover:underline"
          >
            Dashboard
          </Link> */}
          {/* <Link
            to="/payment"
            onClick={() => setIsOpen(false)}
            className="hover:underline"
          >
            Pay Rent
          </Link> */}
          {/* <Link
            to="/reports"
            onClick={() => setIsOpen(false)}
            className="hover:underline"
          >
            Reports
          </Link> */}
          {/* <Link
            to="/settings"
            onClick={() => setIsOpen(false)}
            className="hover:underline"
          >
            Settings
          </Link> */}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="bg-white text-blue-600 px-3 py-1 rounded-md"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
