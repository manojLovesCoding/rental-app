import Sidebar from "../components/Sidebar.jsx";
import RentCollectionGraph from "../components/Reports/RentCollectionGraph.jsx";
import EarningsSummaryCard from "../components/Reports/EarningsSummaryCard.jsx";
import FiltersBar from "../components/Reports/FiltersBar.jsx";
import ExportReportButton from "../components/Reports/ExportReportButton.jsx";
import PaymentsTable from "../components/Reports/PaymentsTable.jsx";

function Reports() {
  return (
    <div className="flex">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>

        {/* Filters Bar */}
        <FiltersBar />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EarningsSummaryCard />
        </div>

        {/* Rent Collection Graph */}
        <div className="bg-white p-4 rounded-lg shadow mt-4">
          <h3 className="text-lg font-semibold mb-2">Rent Collection Trends</h3>
          <RentCollectionGraph />
        </div>

        {/* Payments Table */}
        <div className="mt-4">
          <PaymentsTable />
        </div>

        {/* Export Reports Button */}
        <div className="mt-4 text-right">
          <ExportReportButton />
        </div>
      </div>
    </div>
  );
}

export default Reports;
