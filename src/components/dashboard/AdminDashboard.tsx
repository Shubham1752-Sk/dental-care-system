
import { Users, Calendar, DollarSign, Activity } from 'lucide-react';
import { KPICard } from './KPICard';
import { RecentAppointments } from './RecentAppointments';
import { TopPatients } from './TopPatients';
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
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back, here's what's happening today</p>
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
          title="Appointments"
          value={appointments.length}
          description="This month"
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          description="Total earned"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <KPICard
          title="Treatments"
          value={`${completedTreatments}/${completedTreatments + pendingTreatments}`}
          description="Completed vs Pending"
          icon={Activity}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAppointments />
        <TopPatients />
      </div>
    </div>
  );
}
