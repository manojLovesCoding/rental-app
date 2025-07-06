import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ManageUnits = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [units, setUnits] = useState([
    { id: 1, unitNumber: "101", status: "Occupied", tenantName: "Rahul Verma" },
    { id: 2, unitNumber: "102", status: "Vacant", tenantName: "" },
    { id: 3, unitNumber: "103", status: "Occupied", tenantName: "Priya Nair" }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [newUnitData, setNewUnitData] = useState({
    unitNumber: "",
    status: "Vacant",
    tenantName: ""
  });

  const handleAddUnit = useCallback(async () => {
    if (!newUnitData.unitNumber) {
      toast.error("Unit number is required.");
      return;
    }
    if (units.some((unit) => unit.unitNumber === newUnitData.unitNumber)) {
      toast.error("Unit number already exists.");
      return;
    }
    if (newUnitData.status === "Occupied" && !newUnitData.tenantName) {
      toast.error("Tenant name is required for occupied units.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUnit = {
        id: units.length + 1,
        ...newUnitData
      };
      setUnits([...units, newUnit]);
      setNewUnitData({ unitNumber: "", status: "Vacant", tenantName: "" });
      setShowAddModal(false);
      toast.success("Unit Added Successfully ✅");
      setLoading(false);
    }, 800);
  }, [newUnitData, units]);

  const handleDeleteUnit = (id) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      setDeleteLoading(true);
      setTimeout(() => {
        setUnits(units.filter((unit) => unit.id !== id));
        toast.success("Unit Deleted ❌");
        setDeleteLoading(false);
      }, 800);
    }
  };

  const handleEditUnit = useCallback(async () => {
    if (selectedUnit.status === "Occupied" && !selectedUnit.tenantName) {
      toast.error("Tenant name is required for occupied units.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setUnits(
        units.map((unit) => (unit.id === selectedUnit.id ? selectedUnit : unit))
      );
      setShowEditModal(false);
      setSelectedUnit(null);
      toast.success("Unit Updated ✏️");
      setLoading(false);
    }, 800);
  }, [selectedUnit, units]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Manage Units (Property ID: {propertyId})
          </h1>
          <p className="text-gray-600 mt-2">
            Add, edit, or remove units for this property.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-all w-full sm:w-auto"
          >
            + Add Unit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-full transition-all w-full sm:w-auto"
          >
            Back
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="overflow-x-auto mb-6 hidden sm:block">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Unit No</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Tenant Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {units.map((unit) => (
              <tr
                key={unit.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{unit.unitNumber}</td>
                <td className="py-3 px-6">{unit.status}</td>
                <td className="py-3 px-6">{unit.tenantName || "-"}</td>
                <td className="py-3 px-6 text-center flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedUnit(unit);
                      setShowEditModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUnit(unit.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4 mb-6">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="bg-white p-4 rounded-lg shadow-md space-y-2"
          >
            <p>
              <span className="font-semibold">Unit No:</span> {unit.unitNumber}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {unit.status}
            </p>
            <p>
              <span className="font-semibold">Tenant:</span>{" "}
              {unit.tenantName || "-"}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedUnit(unit);
                  setShowEditModal(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUnit(unit.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Unit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] sm:w-[400px]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add New Unit
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Unit Number"
                value={newUnitData.unitNumber}
                onChange={(e) =>
                  setNewUnitData({ ...newUnitData, unitNumber: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400"
                required
              />
              <select
                value={newUnitData.status}
                onChange={(e) =>
                  setNewUnitData({ ...newUnitData, status: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400"
              >
                <option>Vacant</option>
                <option>Occupied</option>
              </select>
              <input
                type="text"
                placeholder="Tenant Name"
                value={newUnitData.tenantName}
                onChange={(e) =>
                  setNewUnitData({ ...newUnitData, tenantName: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUnit}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Unit Modal */}
      {showEditModal && selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] sm:w-[400px]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Unit</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={selectedUnit.unitNumber}
                disabled
                className="w-full p-2 border rounded-md bg-gray-100"
              />
              <select
                value={selectedUnit.status}
                onChange={(e) =>
                  setSelectedUnit({ ...selectedUnit, status: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option>Vacant</option>
                <option>Occupied</option>
              </select>
              <input
                type="text"
                placeholder="Tenant Name"
                value={selectedUnit.tenantName}
                onChange={(e) =>
                  setSelectedUnit({
                    ...selectedUnit,
                    tenantName: e.target.value
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                disabled={selectedUnit.status === "Vacant"}
              />
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUnit(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUnit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUnits;
