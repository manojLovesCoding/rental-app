import Sidebar from "@/components/Sidebar";
import LandlordDashboard from "@/components/LandlordDashboard";
//import TenantDashboard from "@/components/TenantDashboard";
export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-4 w-full">
        <LandlordDashboard />
        {/*<TenantDashboard />*/}
      </main>
    </div>
  );
}
