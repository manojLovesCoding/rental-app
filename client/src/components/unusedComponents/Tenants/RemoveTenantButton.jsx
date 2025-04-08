function RemoveTenantButton({ tenantId, setTenants }) {
  const handleRemove = () => {
    setTenants((prev) => prev.filter((tenant) => tenant.id !== tenantId));
  };

  return (
    <button onClick={handleRemove} className="text-red-500 hover:underline">
      Remove
    </button>
  );
}

export default RemoveTenantButton;
