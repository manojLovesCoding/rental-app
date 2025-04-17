import { useState, useEffect, useContext, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { PropertyContext } from "../context/PropertyContext";
import defaultAvatar from "../assets/default-avatar.png";

export default function TenantsPage() {
  const { properties } = useContext(PropertyContext);
  const [tenants, setTenants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Load tenants from localStorage on component mount
  useEffect(() => {
    const loadTenants = () => {
      try {
        const savedTenants = localStorage.getItem("tenants");
        if (savedTenants) {
          setTenants(JSON.parse(savedTenants));
        } else {
          // Initialize with sample data only if no saved tenants exist
          const sampleTenants = [
            {
              id: 1,
              firstName: "John",
              lastName: "Doe",
              email: "john@example.com",
              rentDue: "$1200",
              propertyId: properties[0]?.id.toString() || "",
              unitId: "101",
              leaseBegin: "2024-01-01",
              leaseEnd: "2024-12-31",
              phone: "555-0101",
              status: "active",
              avatar: defaultAvatar
            },
            {
              id: 2,
              firstName: "Jane",
              lastName: "Smith",
              email: "jane@example.com",
              rentDue: "$1400",
              propertyId: properties[0]?.id.toString() || "",
              unitId: "102",
              leaseBegin: "2024-03-01",
              leaseEnd: "2025-02-28",
              phone: "555-0102",
              status: "active",
              avatar: defaultAvatar
            }
          ];
          setTenants(sampleTenants);
          localStorage.setItem("tenants", JSON.stringify(sampleTenants));
        }
      } catch (error) {
        console.error("Failed to load tenants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenants();
  }, [properties]);

  // Save tenants to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tenants", JSON.stringify(tenants));
    }
  }, [tenants, isLoading]);

  const handleAddTenant = (newTenant) => {
    const tenantWithId = {
      ...newTenant,
      id: Date.now(),
      status: "active",
      phone: newTenant.phone || "N/A",
      avatar: avatarPreview || defaultAvatar
    };
    setTenants((prev) => [...prev, tenantWithId]);
    setIsModalOpen(false);
    setAvatarPreview(null);
  };

  const handleEditTenant = (updatedTenant) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === updatedTenant.id
          ? { ...updatedTenant, avatar: avatarPreview || t.avatar }
          : t
      )
    );
    setSelectedTenant(null);
    setAvatarPreview(null);
  };

  const handleDeleteTenant = (tenantId) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      setTenants((prev) => prev.filter((tenant) => tenant.id !== tenantId));
    }
  };

  const handleStatusChange = (tenantId, newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to change this tenant's status to ${newStatus}?`
      )
    ) {
      setTenants((prev) =>
        prev.map((t) => (t.id === tenantId ? { ...t, status: newStatus } : t))
      );
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredTenants = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return tenants.filter((tenant) => {
      return (
        `${tenant.firstName} ${tenant.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        tenant.email.toLowerCase().includes(searchLower) ||
        tenant.phone.toLowerCase().includes(searchLower) ||
        tenant.rentDue.toLowerCase().includes(searchLower) ||
        tenant.status.toLowerCase().includes(searchLower)
      );
    });
  }, [tenants, searchTerm]);

  const formatCurrency = (amount) => {
    if (!amount) return "";
    if (typeof amount === "string" && amount.startsWith("$")) return amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };

  const TenantModal = ({ tenant, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(
      tenant || {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        rentDue: "",
        propertyId: properties[0]?.id.toString() || "",
        unitId: "",
        leaseBegin: "",
        leaseEnd: "",
        status: "active",
        avatar: defaultAvatar
      }
    );

    const [errors, setErrors] = useState({});

    const availableUnits = useMemo(() => {
      const property = properties.find(
        (p) => p.id.toString() === formData.propertyId
      );
      return property?.units || [];
    }, [formData.propertyId, properties]);

    const validateForm = () => {
      const newErrors = {};
      if (!formData.firstName.trim()) newErrors.firstName = "Required";
      if (!formData.lastName.trim()) newErrors.lastName = "Required";
      if (!formData.email.trim()) newErrors.email = "Required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = "Invalid email";
      if (!formData.rentDue.trim()) newErrors.rentDue = "Required";
      if (!formData.propertyId) newErrors.propertyId = "Required";
      if (!formData.unitId) newErrors.unitId = "Required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;

      const newFormData = {
        ...formData,
        [name]: value
      };

      // If property changes, reset unit and rent
      if (name === "propertyId") {
        newFormData.unitId = "";
        newFormData.rentDue = "";
      }

      // If unit changes, auto-fill rent
      if (name === "unitId" && value) {
        const selectedUnit = availableUnits.find(
          (unit) => unit.id.toString() === value
        );
        if (selectedUnit) {
          newFormData.rentDue = formatCurrency(selectedUnit.rent);
        }
      }

      setFormData(newFormData);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        onSubmit(formData);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">
            {tenant ? "Edit Tenant" : "Add Tenant"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src={avatarPreview || formData.avatar}
                    alt="Tenant avatar"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded text-sm">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  className={`w-full p-2 border rounded ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  className={`w-full p-2 border rounded ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className={`w-full p-2 border rounded ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full p-2 border rounded"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="555-123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property *
                </label>
                <select
                  name="propertyId"
                  className={`w-full p-2 border rounded ${
                    errors.propertyId ? "border-red-500" : ""
                  }`}
                  value={formData.propertyId}
                  onChange={handleChange}
                >
                  <option value="">Select Property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
                {errors.propertyId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.propertyId}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <select
                  name="unitId"
                  className={`w-full p-2 border rounded ${
                    errors.unitId ? "border-red-500" : ""
                  }`}
                  value={formData.unitId}
                  onChange={handleChange}
                  disabled={!formData.propertyId}
                >
                  <option value="">Select Unit</option>
                  {availableUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.number}
                    </option>
                  ))}
                </select>
                {errors.unitId && (
                  <p className="text-red-500 text-xs mt-1">{errors.unitId}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rent Due *
                </label>
                <input
                  type="text"
                  name="rentDue"
                  className={`w-full p-2 border rounded ${
                    errors.rentDue ? "border-red-500" : ""
                  }`}
                  value={formData.rentDue}
                  onChange={handleChange}
                  placeholder="$1200"
                  readOnly={!!formData.unitId}
                />
                {formData.unitId && (
                  <button
                    type="button"
                    className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                    onClick={() => setFormData({ ...formData, rentDue: "" })}
                  >
                    ✕
                  </button>
                )}
                {errors.rentDue && (
                  <p className="text-red-500 text-xs mt-1">{errors.rentDue}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lease Start
                  </label>
                  <input
                    type="date"
                    name="leaseBegin"
                    className="w-full p-2 border rounded"
                    value={formData.leaseBegin}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lease End
                  </label>
                  <input
                    type="date"
                    name="leaseEnd"
                    className="w-full p-2 border rounded"
                    value={formData.leaseEnd}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {tenant && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full p-2 border rounded"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="past">Past Tenant</option>
                  </select>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {tenant ? "Save Changes" : "Add Tenant"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
          <div className="text-lg">Loading tenants...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0">Tenant Management</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search tenants..."
              className="p-2 border rounded flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setSelectedTenant(null);
                setIsModalOpen(true);
              }}
            >
              Add Tenant
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property/Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Lease Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => {
                  const property = properties.find(
                    (p) => p.id.toString() === tenant.propertyId
                  );
                  const unit = property?.units.find(
                    (u) => u.id.toString() === tenant.unitId
                  );

                  return (
                    <tr key={tenant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium">
                            {property?.name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {unit?.number || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={tenant.avatar || defaultAvatar}
                              alt={`${tenant.firstName} ${tenant.lastName}`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = defaultAvatar;
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium">
                              {tenant.firstName} {tenant.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{tenant.rentDue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">
                          <div>{tenant.email}</div>
                          <div className="text-sm text-gray-500">
                            {tenant.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div>
                          <div className="text-sm">
                            {tenant.leaseBegin || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tenant.leaseEnd || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            tenant.status === "active"
                              ? "bg-green-100 text-green-800"
                              : tenant.status === "inactive"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {tenant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTenant(tenant);
                              setAvatarPreview(null);
                              setIsModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              const newStatus =
                                tenant.status === "active"
                                  ? "inactive"
                                  : "active";
                              handleStatusChange(tenant.id, newStatus);
                            }}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            {tenant.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteTenant(tenant.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No matching tenants found"
                      : "No tenants available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <TenantModal
          tenant={selectedTenant}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTenant(null);
            setAvatarPreview(null);
          }}
          onSubmit={selectedTenant ? handleEditTenant : handleAddTenant}
        />
      )}
    </div>
  );
}
