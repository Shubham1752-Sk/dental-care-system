
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Calendar, TrendingUp } from 'lucide-react';
import { Patient } from '@/types';
import { differenceInYears } from 'date-fns';

interface PatientStatsProps {
  patients: Patient[];
}

export function PatientStats({ patients }: PatientStatsProps) {
  const calculateAverageAge = () => {
    if (patients.length === 0) return 0;
    const totalAge = patients.reduce((sum, patient) => {
      return sum + differenceInYears(new Date(), new Date(patient.dateOfBirth));
    }, 0);
    return Math.round(totalAge / patients.length);
  };

  const stats = {
    total: patients.length,
    newThisMonth: Math.floor(patients.length * 0.1), // Mock data
    avgAge: calculateAverageAge(),
    activePatients: patients.length,
  };

  const statCards = [
    {
      title: 'Total Patients',
      value: stats.total,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'New This Month',
      value: stats.newThisMonth,
      icon: UserPlus,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'Average Age',
      value: stats.avgAge || 0,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Active Today',
      value: Math.floor(stats.activePatients * 0.2),
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group ">
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />
          <CardHeader className="relative pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-700">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-xl sm:text-2xl font-bold text-slate-800">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
