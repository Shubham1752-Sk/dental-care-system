
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Appointment } from '@/types';

interface AppointmentStatsProps {
  appointments: Appointment[];
}

export function AppointmentStats({ appointments }: AppointmentStatsProps) {
  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats.total,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'Cancelled',
      value: stats.cancelled,
      icon: XCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]">
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />
          <CardHeader className="relative pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-700">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-800">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
