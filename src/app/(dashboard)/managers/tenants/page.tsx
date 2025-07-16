"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
// import { toast } from "react-hot-toast"; // Optional: use if toasts are needed

interface Property {
  id: number;
  name: string;
  units: string[];
}

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  profileImage: string;
}

const TenantsPage: React.FC = () => {
  const [properties] = useState<Property[]>([
    {
      id: 1,
      name: "Greenwood Apartments",
      units: ["Unit 101", "Unit 102", "Unit 103"],
    },
    { id: 2, name: "Sunshine Residency", units: ["Unit 201", "Unit 202"] },
    {
      id: 3,
      name: "Riverdale Heights",
      units: ["Unit A1", "Unit A2", "Unit B1"],
    },
  ]);

  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 123-456-7890",
      property: "Greenwood Apartments",
      unit: "Unit 101",
      profileImage: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 987-654-3210",
      property: "Sunshine Residency",
      unit: "Unit 201",
      profileImage: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "+1 555-444-3333",
      property: "Riverdale Heights",
      unit: "Unit A2",
      profileImage: "https://via.placeholder.com/80",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState<number | null>(null);
  const [unitsOptions, setUnitsOptions] = useState<string[]>([]);

  const [formData, setFormData] = useState<Omit<Tenant, "id">>({
    name: "",
    email: "",
    phone: "",
    property: "",
    unit: "",
    profileImage: "",
  });

  const filteredTenants = tenants.filter((t) =>
    [t.name, t.email, t.phone, t.property, t.unit].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      property: "",
      unit: "",
      profileImage: "",
    });
    setUnitsOptions([]);
    setEditMode(false);
    setCurrentEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (tenant: Tenant) => {
    setFormData({ ...tenant });
    const property = properties.find((p) => p.name === tenant.property);
    setUnitsOptions(property ? property.units : []);
    setEditMode(true);
    setCurrentEditingId(tenant.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this tenant?")) {
      setTenants((prev) => prev.filter((t) => t.id !== id));
      // toast.success("Tenant deleted");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editMode && currentEditingId !== null) {
      setTenants((prev) =>
        prev.map((t) =>
          t.id === currentEditingId ? { ...formData, id: t.id } : t
        )
      );
      // toast.success("Tenant updated");
    } else {
      setTenants((prev) => [...prev, { ...formData, id: Date.now() }]);
      // toast.success("Tenant added");
    }
    setShowModal(false);
  };

  const handlePropertyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setFormData((f) => ({ ...f, property: selected, unit: "" }));
    const prop = properties.find((p) => p.name === selected);
    setUnitsOptions(prop ? prop.units : []);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Tenants</h1>
          <p className="text-gray-600 mt-1">
            View, add, and edit tenants associated with your properties.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
        >
          + Add Tenant
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tenants..."
          className="border rounded-md p-2 w-full max-w-md focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tenant List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTenants.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow rounded-2xl p-6 text-center flex flex-col items-center"
          >
            <img
              src={t.profileImage || "https://via.placeholder.com/80"}
              alt={t.name}
              className="w-20 h-20 rounded-full object-cover border mb-4"
            />
            <h2 className="font-bold text-xl">{t.name}</h2>
            <p className="text-sm text-gray-500">{t.email}</p>
            <p className="text-sm text-gray-500">{t.phone}</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Property:</strong> {t.property}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Unit:</strong> {t.unit}
            </p>
            <div className="flex gap-2 mt-4 w-full">
              <button
                onClick={() => handleEdit(t)}
                className="flex-1 py-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="flex-1 py-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-6">
              {editMode ? "Edit Tenant" : "Add Tenant"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium">Profile Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData((f) => ({
                        ...f,
                        profileImage: URL.createObjectURL(file),
                      }));
                    }
                  }}
                  className="mt-1 w-full border p-2 rounded-md"
                />
              </label>

              {formData.profileImage && (
                <div className="flex justify-center">
                  <img
                    src={formData.profileImage}
                    alt="Preview"
                    className="w-24 h-24 rounded-full border object-cover mt-2"
                  />
                </div>
              )}

              {[
                ["Full Name", "name"],
                ["Email", "email"],
                ["Phone", "phone"],
              ].map(([labelText, key]) => (
                <label key={key} className="block">
                  <span className="text-sm font-medium">{labelText}</span>
                  <input
                    type={key === "email" ? "email" : "text"}
                    required
                    value={(formData as any)[key]}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className="mt-1 w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                  />
                </label>
              ))}

              <label className="block">
                <span className="text-sm font-medium">Select Property</span>
                <select
                  value={formData.property}
                  onChange={handlePropertyChange}
                  required
                  className="mt-1 w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Choose Property…</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Select Unit</span>
                <select
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, unit: e.target.value }))
                  }
                  required
                  disabled={!formData.property}
                  className="mt-1 w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Choose Unit…</option>
                  {unitsOptions.map((u) => {
                    const occupied = tenants.some(
                      (t) =>
                        t.property === formData.property &&
                        t.unit === u &&
                        (!editMode || t.id !== currentEditingId)
                    );
                    return (
                      <option key={u} value={u} disabled={occupied}>
                        {u} {occupied ? "(Occupied)" : "(Available)"}
                      </option>
                    );
                  })}
                </select>
              </label>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantsPage;
