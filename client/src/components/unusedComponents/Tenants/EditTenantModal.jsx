import { useState } from "react";

function EditTenantModal({ tenant, onClose, setTenants }) {
  const [updatedData, setUpdatedData] = useState({ ...tenant });

  const handleEditTenant = () => {
    setTenants((prev) =>
      prev.map((t) => (t.id === tenant.id ? updatedData : t))
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-80 sm:w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Tenant</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          value={updatedData.name}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, name: e.target.value })
          }
        />
        <input
          type="email"
          className="w-full p-2 border rounded mb-2"
          value={updatedData.email}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, email: e.target.value })
          }
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={updatedData.rentDue}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, rentDue: e.target.value })
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
            onClick={handleEditTenant}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTenantModal;
