
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan 2025', revenue: 200, appointments: 2 },
  { month: 'Feb 2025', revenue: 0, appointments: 0 },
  { month: 'Mar 2025', revenue: 0, appointments: 0 },
  { month: 'Apr 2025', revenue: 0, appointments: 0 },
  { month: 'May 2025', revenue: 0, appointments: 0 },
  { month: 'Jun 2025', revenue: 0, appointments: 0 },
];

export function RevenueChart() {
  const totalRevenue = monthlyData.reduce((sum, data) => sum + data.revenue, 0);
  const avgMonthlyRevenue = Math.round(totalRevenue / 6);
  const highestMonth = Math.max(...monthlyData.map(d => d.revenue));
  const totalAppointments = monthlyData.reduce((sum, data) => sum + data.appointments, 0);

  return (
    <div className="space-y-4">
      {/* Revenue Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Revenue Overview (Last 6 Months)</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">${totalRevenue}</div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">${avgMonthlyRevenue}</div>
            <div className="text-sm text-gray-500">Avg Monthly Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">${highestMonth}</div>
            <div className="text-sm text-gray-500">Highest Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{totalAppointments}</div>
            <div className="text-sm text-gray-500">Total Appointments</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
