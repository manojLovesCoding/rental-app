import Sidebar from "../components/Sidebar.jsx";
import TotalEarningsCard from "../components/dashboard/TotalEarningsCard.jsx";
import PropertiesSummary from "../components/dashboard/PropertiesSummary.jsx";
import RecentPaymentsTable from "../components/dashboard/RecentPaymentsTable.jsx";
import SendReminderButton from "../components/dashboard/SendReminderButton.jsx";

function LandlordDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Landlord Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6">
          {/* Total Earnings Card takes full width on small screens, half on larger */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <TotalEarningsCard />
          </div>

          {/* Properties Summary takes full width on small screens, spans 2 cols on larger screens */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <PropertiesSummary />
          </div>

          {/* Additional space for future components or keeping balance 
          <div className="hidden lg:block xl:col-span-1"></div>*/}
        </div>

        <div className="mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Payments</h2>
          <RecentPaymentsTable />
        </div>

        <div className="mt-6 flex justify-center sm:justify-end">
          <SendReminderButton />
        </div>
      </div>
    </div>
  );
}

export default LandlordDashboard;
