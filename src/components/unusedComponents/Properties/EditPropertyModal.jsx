import { useState } from "react";

function EditPropertyModal({ property, onClose, onSave }) {
  const [updatedProperty, setUpdatedProperty] = useState(property);

  const handleChange = (e) => {
    setUpdatedProperty({ ...updatedProperty, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Property</h2>
        <input
          type="text"
          name="name"
          value={updatedProperty.name}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="location"
          value={updatedProperty.location}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />
        <input
          type="number"
          name="rent"
          value={updatedProperty.rent}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />
        <button
          onClick={() => onSave(updatedProperty)}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Update
        </button>
        <button onClick={onClose} className="ml-2 text-gray-600">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditPropertyModal;
