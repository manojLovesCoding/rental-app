import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  CreditCard,
  FileText,
  Settings,
  Users,
  Bell,
  Headset,
  Menu,
  X
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-blue-600 text-white w-64 p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform md:relative md:h-screen`}
      >
        <h2 className="text-2xl font-bold mb-6">RentPay</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <Home />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/properties"
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <Users />
                <span>Property Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/tenants"
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <Users />
                <span>Tenant Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/payment"
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <CreditCard />
                <span>Pay Rent</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/reports"
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <FileText />
                <span>Reports</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/notifications"
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <Bell />
                <span>Notifications</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/support"
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <Headset />
                <span>Support</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <Settings />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
