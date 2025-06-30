
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAppointments } from '@/hooks/useAppointments';
import { usePatients } from '@/hooks/usePatients';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';
import { ChevronLeft, ChevronRight, Calendar, Clock, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { Appointment } from '@/types';

export default function CalendarView() {
  const { appointments, addAppointment } = useAppointments();
  const { patients } = usePatients();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment =>
      isSameDay(new Date(appointment.appointmentDateTime), date)
    );
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.name || 'Unknown Patient';
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleNewAppointment = (date?: Date) => {
    setSelectedDate(date || new Date());
    setIsFormOpen(true);
  };

  const handleAppointmentSubmit = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    addAppointment(appointmentData);
    setIsFormOpen(false);
    toast({
      title: "Appointment created",
      description: "New appointment has been successfully created",
    });
  };

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Calendar</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">View and manage appointments</p>
        </div>
        <Button 
          onClick={() => handleNewAppointment()}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Monthly View
            </CardTitle>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-base sm:text-lg font-medium min-w-[120px] sm:min-w-[140px] text-center">
                {format(currentDate, 'MMMM yyyy')}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-500 border-b">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {monthDays.map(day => {
              const dayAppointments = getAppointmentsForDate(day);
              const isToday = isSameDay(day, new Date());
              
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[60px] sm:min-h-[100px] p-1 sm:p-2 border border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    isToday ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => handleDateClick(day)}
                >
                  <div className={`text-xs sm:text-sm font-medium mb-1 ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, window.innerWidth < 640 ? 1 : 2).map(appointment => (
                      <div
                        key={appointment.id}
                        className="text-xs p-1 rounded truncate flex items-center space-x-1"
                      >
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(appointment.status)}`} />
                        <span className="truncate">{appointment.title}</span>
                      </div>
                    ))}
                    {dayAppointments.length > (window.innerWidth < 640 ? 1 : 2) && (
                      <div className="text-xs text-gray-500">
                        +{dayAppointments.length - (window.innerWidth < 640 ? 1 : 2)} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Date Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {selectedDate && format(selectedDate, 'MMM dd, yyyy')}
              </DialogTitle>
              
            </div>
          </DialogHeader>
          <div className="space-y-4">
            {selectedDateAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No appointments for this date</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateAppointments.map(appointment => (
                  <div key={appointment.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                      <Badge className={`text-xs ${
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{appointment.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{getPatientName(appointment.patientId)}</span>
                      <span>{format(new Date(appointment.appointmentDateTime), 'hh:mm a')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
                size="sm"
                onClick={() => handleNewAppointment(selectedDate!)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
        </DialogContent>
      </Dialog>

      {/* Appointment Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
          </DialogHeader>
          <AppointmentForm
            selectedDate={selectedDate || undefined}
            onSubmit={handleAppointmentSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
