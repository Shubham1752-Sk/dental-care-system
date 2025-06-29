
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useAppointments } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { format } from 'date-fns';
import { Calendar, FileText, DollarSign } from 'lucide-react';

export function PatientDashboard() {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const { patients } = usePatients();

  // Get patient data
  const patient = patients.find(p => p.id === user?.patientId);
  
  // Filter appointments for this patient
  const patientAppointments = appointments.filter(a => a.patientId === user?.patientId);
  
  // Get upcoming appointments
  const upcomingAppointments = patientAppointments
    .filter(a => new Date(a.appointmentDateTime) >= new Date())
    .sort((a, b) => new Date(a.appointmentDateTime).getTime() - new Date(b.appointmentDateTime).getTime());

  // Get treatment history
  const treatmentHistory = patientAppointments
    .filter(a => a.status === 'completed')
    .sort((a, b) => new Date(b.appointmentDateTime).getTime() - new Date(a.appointmentDateTime).getTime());

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
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome, {patient?.name}
        </h2>
        <p className="text-gray-600 mt-1">Here's your dental care overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {upcomingAppointments.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed Treatments
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {treatmentHistory.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Spent
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${patientAppointments
                .filter(a => a.cost)
                .reduce((sum, a) => sum + (a.cost || 0), 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                      <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{appointment.description}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(appointment.appointmentDateTime), 'MMM dd, yyyy - HH:mm')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Treatment History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Treatment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {treatmentHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No treatment history</p>
              ) : (
                treatmentHistory.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                      <span className="text-sm font-medium text-green-600">
                        ${appointment.cost || 0}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {appointment.treatment || appointment.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(appointment.appointmentDateTime), 'MMM dd, yyyy')}
                    </p>
                    {appointment.files && appointment.files.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          {appointment.files.length} file(s) attached
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
