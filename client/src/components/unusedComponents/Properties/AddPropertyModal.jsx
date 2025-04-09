import { useState } from "react";

function AddPropertyModal({ onClose, onSave }) {
  const [property, setProperty] = useState({
    name: "",
    location: "",
    rent: ""
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Property</h2>
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={property.name}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={property.location}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />
        <input
          type="number"
          name="rent"
          placeholder="Rent ($)"
          value={property.rent}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />
        <button
          onClick={() => onSave(property)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button onClick={onClose} className="ml-2 text-gray-600">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddPropertyModal;
