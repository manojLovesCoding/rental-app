import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BuildingIcon,
  UsersIcon,
  CreditCardIcon,
  BellIcon,
  SettingsIcon,
  XIcon
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon size={20} />, link: "/" },
    {
      name: "Properties",
      icon: <BuildingIcon size={20} />,
      link: "/properties"
    },
    { name: "Tenants", icon: <UsersIcon size={20} />, link: "/tenants" },
    { name: "Payments", icon: <CreditCardIcon size={20} />, link: "/payments" },
    { name: "Reminders", icon: <BellIcon size={20} />, link: "/reminders" },
    { name: "Settings", icon: <SettingsIcon size={20} />, link: "/settings" }
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen w-64 bg-white border-r shadow-md flex-col p-4 fixed">
        <div className="text-2xl font-bold text-blue-600 mb-10">RentManage</div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <NavLink
                to={item.link}
                key={index}
                className={`flex items-center gap-3 p-2 rounded-lg transition text-base ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-auto text-sm text-gray-400 text-center">
          © 2025 RentManage
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={onClose}
          ></div>

          {/* Drawer */}
          <div className="relative w-64 bg-white shadow-md p-4 z-50">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              <XIcon size={20} />
            </button>

            <div className="text-2xl font-bold text-blue-600 mb-10">
              RentManage
            </div>
            <nav className="flex flex-col gap-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.link;
                return (
                  <NavLink
                    to={item.link}
                    key={index}
                    onClick={onClose} // close drawer on navigation
                    className={`flex items-center gap-3 p-2 rounded-lg transition text-base ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="mt-auto text-sm text-gray-400 text-center">
              © 2025 RentManage
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
