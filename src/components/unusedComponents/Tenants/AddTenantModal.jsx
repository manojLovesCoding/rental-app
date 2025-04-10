import { useState } from "react";

function AddTenantModal({ onClose, setTenants }) {
  const [tenantData, setTenantData] = useState({
    name: "",
    email: "",
    rentDue: ""
  });

  const handleAddTenant = () => {
    setTenants((prev) => [...prev, { id: Date.now(), ...tenantData }]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-80 sm:w-96">
        <h2 className="text-xl font-semibold mb-4">Add Tenant</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
          value={tenantData.name}
          onChange={(e) =>
            setTenantData({ ...tenantData, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={tenantData.email}
          onChange={(e) =>
            setTenantData({ ...tenantData, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Rent Due"
          className="w-full p-2 border rounded mb-4"
          value={tenantData.rentDue}
          onChange={(e) =>
            setTenantData({ ...tenantData, rentDue: e.target.value })
          }
        />
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleAddTenant}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTenantModal;
