import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  useEffect(() => {
    // Simulated API Call
    setTenants([
      { id: 1, name: "John Doe", email: "john@example.com", rentDue: "$1200" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", rentDue: "$1400" }
    ]);
  }, []);

  // Inline Component: Add Tenant Modal
  const AddTenantModal = ({ onClose }) => {
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
  };

  // Inline Component: Edit Tenant Modal
  const EditTenantModal = ({ tenant, onClose }) => {
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
  };

  // Inline Component: Remove Tenant Button
  const RemoveTenantButton = ({ tenantId }) => {
    const handleRemove = () =>
      setTenants((prev) => prev.filter((tenant) => tenant.id !== tenantId));

    return (
      <button onClick={handleRemove} className="text-red-500 hover:underline">
        Remove
      </button>
    );
  };

  // Inline Component: Tenants Table
  const TenantsTable = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left hidden sm:table-cell">Email</th>
            <th className="p-3 text-left">Rent Due</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr
              key={tenant.id}
              className="border-b hover:bg-gray-100 transition"
            >
              <td className="p-3">{tenant.name}</td>
              <td className="p-3 hidden sm:table-cell">{tenant.email}</td>
              <td className="p-3">{tenant.rentDue}</td>
              <td className="p-3 flex flex-col sm:flex-row gap-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setSelectedTenant(tenant)}
                >
                  Edit
                </button>
                <RemoveTenantButton tenantId={tenant.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTenant && (
        <EditTenantModal
          tenant={selectedTenant}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </div>
  );

  return (
    <div className="flex">
      {/* Sidebar (Fixed) */}
      <Sidebar />

      {/* Main Content in Inline Sections */}
      <div className="flex flex-col md:flex-row flex-1 gap-4 p-4 md:p-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Tenant Management</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Tenant
          </button>
          <TenantsTable />
        </div>
      </div>

      {/* Add Tenant Modal */}
      {isAddModalOpen && (
        <AddTenantModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}

export default Tenants;
