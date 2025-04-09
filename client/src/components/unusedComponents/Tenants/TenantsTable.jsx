import EditTenantModal from "./EditTenantModal";
import RemoveTenantButton from "./RemoveTenantButton";
import { useState } from "react";

function TenantsTable({ tenants, setTenants }) {
  const [selectedTenant, setSelectedTenant] = useState(null);

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3 hidden sm:table-cell">Email</th>
            <th className="p-3">Rent Due</th>
            <th className="p-3">Actions</th>
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
                <RemoveTenantButton
                  tenantId={tenant.id}
                  setTenants={setTenants}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTenant && (
        <EditTenantModal
          tenant={selectedTenant}
          onClose={() => setSelectedTenant(null)}
          setTenants={setTenants}
        />
      )}
    </div>
  );
}

export default TenantsTable;
