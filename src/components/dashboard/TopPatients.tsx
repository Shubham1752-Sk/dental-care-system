
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePatients } from '@/hooks/usePatients';
import { useAppointments } from '@/hooks/useAppointments';

export function TopPatients() {
  const { patients } = usePatients();
  const { appointments } = useAppointments();

  // Calculate top patients by appointment count and revenue
  const patientStats = patients.map(patient => {
    const patientAppointments = appointments.filter(a => a.patientId === patient.id);
    const appointmentCount = patientAppointments.length;
    const totalRevenue = patientAppointments
      .filter(a => a.cost)
      .reduce((sum, a) => sum + (a.cost || 0), 0);

    return {
      ...patient,
      appointmentCount,
      totalRevenue
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {patientStats.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No patient data available</p>
          ) : (
            patientStats.map((patient, index) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">
                      {patient.appointmentCount} appointments
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">
                    ${patient.totalRevenue.toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
