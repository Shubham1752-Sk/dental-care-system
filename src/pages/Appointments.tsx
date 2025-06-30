
import { useState, useMemo } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { AppointmentFilters } from '@/components/appointments/AppointmentFilters';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { AppointmentStats } from '@/components/appointments/AppointmentStats';
import { AppointmentDetailsModal } from '@/components/appointments/AppointmentDetailsModal';
import { AppointmentFormModal } from '@/components/appointments/AppointmentFormModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Appointment } from '@/types';

const Appointments = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (appointment.treatment || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      
      const matchesDate = dateFilter === 'all' || (() => {
        const appointmentDate = new Date(appointment.appointmentDateTime);
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
    updateAppointment(appointmentId, { status: newStatus as 'pending' | 'completed' | 'cancelled' });
    toast({
      title: "Status updated",
      description: `Appointment status changed to ${newStatus}`,
    });
  };

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsFormModalOpen(true);
  };

  const handleAddAppointment = () => {
    setEditingAppointment(null);
    setIsFormModalOpen(true);
  };

  const handleDelete = (appointmentId: string) => {
    deleteAppointment(appointmentId);
    toast({
      title: "Appointment deleted",
      description: "The appointment has been successfully deleted",
    });
  };

  const handleFormSubmit = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'> | Appointment) => {
    if ('id' in appointmentData) {
      updateAppointment(appointmentData.id, appointmentData);
      toast({
        title: "Appointment updated",
        description: `${appointmentData.title} has been updated successfully.`,
      });
    } else {
      addAppointment(appointmentData);
      toast({
        title: "Appointment created",
        description: `${appointmentData.title} has been scheduled successfully.`,
      });
    }
  };

  const handleEditFromDetails = (appointment: Appointment) => {
    setIsDetailsModalOpen(false);
    setEditingAppointment(appointment);
    setIsFormModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Appointments</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">Manage and track all patient appointments</p>
          </div>
          <Button 
            onClick={handleAddAppointment}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onStatusChange={handleStatusChange}
                onView={handleViewAppointment}
                onEdit={handleEditAppointment}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-400 text-base sm:text-lg">No appointments found</div>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AppointmentDetailsModal
        appointment={selectedAppointment}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={handleEditFromDetails}
      />

      <AppointmentFormModal
        appointment={editingAppointment}
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Appointments;
