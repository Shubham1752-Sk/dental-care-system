
import { useState, useMemo } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { AppointmentFilters } from '@/components/appointments/AppointmentFilters';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { AppointmentStats } from '@/components/appointments/AppointmentStats';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Appointments = () => {
  const { appointments, updateAppointmentStatus } = useAppointments();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appointment.treatmentType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      
      const matchesDate = dateFilter === 'all' || (() => {
        const appointmentDate = new Date(appointment.date);
        const today = new Date();
        
        switch (dateFilter) {
          case 'today':
            return appointmentDate.toDateString() === today.toDateString();
          case 'week':
            const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
            const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
            return appointmentDate >= weekStart && appointmentDate <= weekEnd;
          case 'month':
            return appointmentDate.getMonth() === today.getMonth() && 
                   appointmentDate.getFullYear() === today.getFullYear();
          default:
            return true;
        }
      })();
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    updateAppointmentStatus(appointmentId, newStatus);
    toast({
      title: "Status updated",
      description: `Appointment status changed to ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
            <p className="text-slate-600 mt-1">Manage and track all patient appointments</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>

        {/* Stats */}
        <AppointmentStats appointments={appointments} />

        {/* Filters */}
        <AppointmentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        {/* Appointments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-400 text-lg">No appointments found</div>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
