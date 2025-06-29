
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePatients } from '@/hooks/usePatients';
import { useAppointments } from '@/hooks/useAppointments';
import { Users, Phone, Mail, Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function Patients() {
  const { patients } = usePatients();
  const { appointments } = useAppointments();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  // Calculate patient statistics
  const patientsWithContact = patients.filter(p => p.phone).length;
  const patientsWithEmail = patients.filter(p => p.email).length;

  // Get appointment count and revenue for each patient
  const getPatientStats = (patientId: string) => {
    const patientAppointments = appointments.filter(a => a.patientId === patientId);
    const appointmentCount = patientAppointments.length;
    const totalSpent = patientAppointments
      .filter(a => a.cost)
      .reduce((sum, a) => sum + (a.cost || 0), 0);
    return { appointmentCount, totalSpent };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600 mt-1">Manage your patients and their information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{patients.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">With Contact Info</CardTitle>
            <Phone className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{patientsWithContact}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">With Email</CardTitle>
            <Mail className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{patientsWithEmail}</div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Patients ({patients.length})</CardTitle>
          </div>
          <div className="mt-4">
            <Input
              placeholder="Search patients by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr className="text-left">
                  <th className="pb-3 text-sm font-medium text-gray-500">Patient</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Contact</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Date of Birth</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Health Info</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Statistics</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.map((patient) => {
                  const stats = getPatientStats(patient.id);
                  return (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <div className="font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.email}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone className="h-4 w-4 mr-1" />
                          {patient.phone}
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-900">
                        {format(new Date(patient.dateOfBirth), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-4 text-sm text-gray-900 max-w-xs truncate">
                        {patient.healthInfo}
                      </td>
                      <td className="py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {stats.appointmentCount} appointments
                          </div>
                          <div className="text-gray-500">
                            ${stats.totalSpent} spent
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
