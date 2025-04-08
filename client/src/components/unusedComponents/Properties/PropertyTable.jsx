import DeletePropertyButton from "./DeletePropertyButton";

function PropertyTable({ properties, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Property Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Rent ($)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="text-center">
              <td className="border p-2">{property.name}</td>
              <td className="border p-2">{property.location}</td>
              <td className="border p-2">{property.rent}</td>
              <td className="border p-2">
                <button
                  onClick={() => onEdit(property)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mx-1"
                >
                  Edit
                </button>
                <DeletePropertyButton onDelete={() => onDelete(property.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyTable;
