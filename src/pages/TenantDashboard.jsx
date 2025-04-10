import Sidebar from "../components/Sidebar.jsx";
import RentDueCard from "../components/dashboard/RentDueCard.jsx";
import PaymentHistoryTable from "../components/dashboard/PaymentHistoryTable.jsx";
import PayRentButton from "../components/dashboard/PayRentButton.jsx";
import NotificationsBanner from "../components/dashboard/NotificationsBanner.jsx";

function TenantDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Tenant Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RentDueCard />
          <NotificationsBanner />
          <PaymentHistoryTable />
          <PayRentButton />
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;
