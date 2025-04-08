function FiltersBar({ filters = { dateRange: "This Month" }, setFilters }) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg flex flex-wrap gap-4 justify-between mt-4">
      <select
        value={filters?.dateRange ?? "This Month"} // Ensure a default value
        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
        className="p-2 border rounded-md"
      >
        <option value="This Month">This Month</option>
        <option value="Last Month">Last Month</option>
        <option value="This Year">This Year</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Apply Filters
      </button>
    </div>
  );
}

export default FiltersBar;
