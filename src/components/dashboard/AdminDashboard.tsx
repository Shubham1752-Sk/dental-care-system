
import { Users, Calendar, DollarSign, Activity } from 'lucide-react';
import { KPICard } from './KPICard';
import { RecentAppointments } from './RecentAppointments';
import { TopPatients } from './TopPatients';
import { RevenueChart } from './RevenueChart';
import { usePatients } from '@/hooks/usePatients';
import { useAppointments } from '@/hooks/useAppointments';

export function AdminDashboard() {
  const { patients } = usePatients();
  const { appointments } = useAppointments();

  // Calculate KPIs
  const totalRevenue = appointments
    .filter(a => a.cost)
    .reduce((sum, a) => sum + (a.cost || 0), 0);
  
  const completedTreatments = appointments.filter(a => a.status === 'completed').length;
  const pendingTreatments = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back, Dr. Smith!</h1>
              <p className="text-blue-100 text-lg">Here's what's happening at your dental practice today</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Activity className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Patients"
            value={patients.length}
            description="Active patients"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            description="Total earned"
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
          <KPICard
            title="Completed Treatments"
            value={completedTreatments}
            description="Treatments completed"
            icon={Activity}
          />
          <KPICard
            title="Pending Treatments"
            value={pendingTreatments}
            description="Awaiting completion"
            icon={Calendar}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentAppointments />
          <TopPatients />
        </div>

        {/* Revenue Chart */}
        <RevenueChart />
      </div>
    </div>
  );
}
