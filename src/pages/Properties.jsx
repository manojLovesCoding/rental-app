import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // For toast notifications

const Properties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Greenwood Apartments",
      address: "123 Maple Street, Mumbai",
      units: 2,
      tenants: 2,
      thumbnail: ""
    },
    {
      id: 2,
      name: "Sunshine Residency",
      address: "456 Oak Avenue, Delhi",
      units: 0,
      tenants: 0,
      thumbnail: ""
    },
    {
      id: 3,
      name: "Skyline Towers",
      address: "789 Pine Lane, Bangalore",
      units: 0,
      tenants: 0,
      thumbnail: ""
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    units: "",
    tenants: "",
    thumbnail: null
  });

  const openAddModal = () => {
    setFormData({
      name: "",
      address: "",
      units: "",
      tenants: "",
      thumbnail: null
    });
    setEditMode(false);
    setCurrentEditingId(null);
    setShowModal(true);
  };

  const handleEditProperty = (property) => {
    setFormData({
      name: property.name,
      address: property.address,
      units: property.units,
      tenants: property.tenants,
      thumbnail: null,
      oldThumbnail: property.thumbnail
    });
    setEditMode(true);
    setCurrentEditingId(property.id);
    setShowModal(true);
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties((prev) => prev.filter((property) => property.id !== id));
      toast.success("Property deleted ✅");
    }
  };

  const handleSaveProperty = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      if (editMode) {
        setProperties((prev) =>
          prev.map((property) =>
            property.id === currentEditingId
              ? {
                  ...property,
                  ...formData,
                  thumbnail: formData.thumbnail
                    ? URL.createObjectURL(formData.thumbnail)
                    : property.thumbnail
                }
              : property
          )
        );
        toast.success("Property updated ✏️");
      } else {
        const newProperty = {
          id: properties.length + 1,
          ...formData,
          thumbnail: formData.thumbnail
            ? URL.createObjectURL(formData.thumbnail)
            : ""
        };
        setProperties((prev) => [...prev, newProperty]);
        toast.success("New property added 🏡");
      }

      setFormData({
        name: "",
        address: "",
        units: "",
        tenants: "",
        thumbnail: null
      });
      setEditMode(false);
      setCurrentEditingId(null);
      setShowModal(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleManageUnits = (propertyId) => {
    navigate(`/manage-units/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Manage Your Properties
          </h1>
          <p className="text-gray-600 mt-2">
            View and update your properties and units easily.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all"
        >
          + Add Property
        </button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col"
          >
            {/* Thumbnail */}
            {property.thumbnail ? (
              <img
                src={property.thumbnail}
                alt={property.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center mb-4 text-gray-400">
                No Image
              </div>
            )}

            {/* Property Info */}
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {property.name}
              </h2>
              <p className="text-gray-500 text-sm mb-4">{property.address}</p>
            </div>

            <div className="flex items-center justify-between text-gray-700 text-sm mb-4">
              <span>
                <strong>{property.units}</strong> Units
              </span>
              <span>
                <strong>{property.tenants}</strong> Tenants
              </span>
            </div>

            {/* Manage Units Button */}
            <button
              onClick={() => handleManageUnits(property.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full text-sm transition mb-2"
            >
              Manage Units
            </button>

            {/* Edit & Delete Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEditProperty(property)}
                className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium py-2 px-4 rounded-full text-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProperty(property.id)}
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
              {editMode ? "Edit Property" : "Add New Property"}
            </h2>
            <form onSubmit={handleSaveProperty} className="space-y-4">
              <input
                type="text"
                placeholder="Property Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="number"
                placeholder="Number of Units"
                value={formData.units}
                onChange={(e) =>
                  setFormData({ ...formData, units: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="number"
                placeholder="Number of Tenants"
                value={formData.tenants}
                onChange={(e) =>
                  setFormData({ ...formData, tenants: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />

              {/* Image Upload */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Upload Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.files[0] })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Live Preview */}
              {formData.thumbnail && (
                <div className="mt-4">
                  <p className="text-gray-500 mb-2 text-sm">Image Preview:</p>
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="Thumbnail Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Buttons */}
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
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
