function DeletePropertyButton({ onDelete }) {
  return (
    <button
      onClick={onDelete}
      className="bg-red-600 text-white px-2 py-1 rounded-md mx-1"
    >
      Delete
    </button>
  );
}

export default DeletePropertyButton;
