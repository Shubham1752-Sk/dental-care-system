
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppointments } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { format } from 'date-fns';

export function RecentAppointments() {
  const { appointments } = useAppointments();
  const { patients } = usePatients();

  // Get next 10 appointments
  const upcomingAppointments = appointments
    .filter(a => new Date(a.appointmentDateTime) >= new Date())
    .sort((a, b) => new Date(a.appointmentDateTime).getTime() - new Date(b.appointmentDateTime).getTime())
    .slice(0, 10);

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.name || 'Unknown Patient';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Next 10 Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
          ) : (
            upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">
                      {getPatientName(appointment.patientId)}
                    </h4>
                    <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{appointment.title}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(appointment.appointmentDateTime), 'MMM dd, yyyy - HH:mm')}
                  </p>
                </div>
                {appointment.cost && (
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600">
                      ${appointment.cost}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
