import { Building, Home, PlusCircle } from "lucide-react";

function PropertiesSummary() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-center sm:text-left">
        <Building className="text-blue-600 w-6 h-6" />
        Properties Overview
      </h2>

      {/* Property Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <div className="bg-blue-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
          <Home className="text-blue-600 w-8 h-8" />
          <p className="text-lg font-semibold">8</p>
          <p className="text-sm text-gray-600">Total Properties</p>
        </div>

        {/* Available Properties */}
        <div className="bg-green-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
          <Home className="text-green-600 w-8 h-8" />
          <p className="text-lg font-semibold">3</p>
          <p className="text-sm text-gray-600">Available</p>
        </div>

        {/* Occupied Properties */}
        <div className="bg-yellow-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
          <Home className="text-yellow-600 w-8 h-8" />
          <p className="text-lg font-semibold">5</p>
          <p className="text-sm text-gray-600">Occupied</p>
        </div>

        {/* Add New Property Button */}
        <button className="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 w-full hover:bg-blue-700 transition cursor-pointer active:scale-95">
          <PlusCircle className="w-8 h-8" />
          <p className="text-sm">Add Property</p>
        </button>
      </div>
    </div>
  );
}

export default PropertiesSummary;
