import React, { useState } from "react";

const Tenants = () => {
  const [properties] = useState([
    {
      id: 1,
      name: "Greenwood Apartments",
      units: ["Unit 101", "Unit 102", "Unit 103"]
    },
    {
      id: 2,
      name: "Sunshine Residency",
      units: ["Unit 201", "Unit 202"]
    },
    {
      id: 3,
      name: "Riverdale Heights",
      units: ["Unit A1", "Unit A2", "Unit B1"]
    }
  ]);

  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 123-456-7890",
      property: "Greenwood Apartments",
      unit: "Unit 101",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&s"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 987-654-3210",
      property: "Sunshine Residency",
      unit: "Unit 201",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&s"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "+1 555-444-3333",
      property: "Riverdale Heights",
      unit: "Unit A2",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&s"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    unit: "",
    profileImage: ""
  });

  const [unitsOptions, setUnitsOptions] = useState([]);

  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      property: "",
      unit: "",
      profileImage: ""
    });
    setUnitsOptions([]);
    setEditMode(false);
    setCurrentEditingId(null);
    setShowModal(true);
  };

  const handleEditTenant = (tenant) => {
    setFormData(tenant);
    const selectedProperty = properties.find((p) => p.name === tenant.property);
    setUnitsOptions(selectedProperty ? selectedProperty.units : []);
    setEditMode(true);
    setCurrentEditingId(tenant.id);
    setShowModal(true);
  };

  const handleDeleteTenant = (id) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      setTenants((prev) => prev.filter((tenant) => tenant.id !== id));
    }
  };

  const handleSaveTenant = (e) => {
    e.preventDefault();

    if (editMode) {
      setTenants((prev) =>
        prev.map((tenant) =>
          tenant.id === currentEditingId
            ? { ...formData, id: tenant.id }
            : tenant
        )
      );
    } else {
      const newTenant = { id: tenants.length + 1, ...formData };
      setTenants((prev) => [...prev, newTenant]);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      property: "",
      unit: "",
      profileImage: ""
    });
    setEditMode(false);
    setCurrentEditingId(null);
    setShowModal(false);
  };

  const handlePropertyChange = (e) => {
    const selectedProperty = e.target.value;
    setFormData({ ...formData, property: selectedProperty, unit: "" });

    const foundProperty = properties.find(
      (prop) => prop.name === selectedProperty
    );
    setUnitsOptions(foundProperty ? foundProperty.units : []);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Manage Tenants
          </h1>
          <p className="text-gray-600 mt-2">
            View, add, edit and manage tenants easily.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all"
        >
          + Add Tenant
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tenants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => (
          <div
            key={tenant.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center text-center"
          >
            <img
              src={
                tenant.profileImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&s"
              }
              alt={tenant.name}
              className="w-20 h-20 object-cover rounded-full border mb-4"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {tenant.name}
              </h2>
              <p className="text-gray-500 text-sm">{tenant.email}</p>
              <p className="text-gray-500 text-sm">{tenant.phone}</p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Property:</strong> {tenant.property}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Unit:</strong> {tenant.unit}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEditTenant(tenant)}
                className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium py-2 px-4 rounded-full text-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTenant(tenant.id)}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-full text-sm transition"
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
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editMode ? "Edit Tenant" : "Add New Tenant"}
            </h2>
            <form onSubmit={handleSaveTenant} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setFormData({ ...formData, profileImage: imageUrl });
                    }
                  }}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
                <div className="mt-2 flex justify-center">
                  <img
                    src={
                      formData.profileImage ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&s"
                    }
                    alt="Selected"
                    className="w-24 h-24 object-cover rounded-full border"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />

              <select
                value={formData.property}
                onChange={handlePropertyChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Property</option>
                {properties.map((prop) => (
                  <option key={prop.id} value={prop.name}>
                    {prop.name}
                  </option>
                ))}
              </select>

              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
                disabled={!formData.property}
              >
                <option value="">Select Unit</option>
                {unitsOptions.map((unit, index) => {
                  const isOccupied = tenants.some(
                    (tenant) =>
                      tenant.property === formData.property &&
                      tenant.unit === unit
                  );
                  return (
                    <option key={index} value={unit} disabled={isOccupied}>
                      {unit} {isOccupied ? "❌ Occupied" : "✅ Available"}
                    </option>
                  );
                })}
              </select>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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

export default Tenants;
