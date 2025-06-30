
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, DollarSign, Phone, Edit, Trash2 } from 'lucide-react';
import { Appointment } from '@/types';
import { usePatients } from '@/hooks/usePatients';
import { format } from 'date-fns';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (id: string, status: string) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function AppointmentCard({ appointment, onStatusChange, onEdit, onDelete }: AppointmentCardProps) {
  const { patients } = usePatients();
  const patient = patients.find(p => p.id === appointment.patientId);
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-slate-200 group hover:border-blue-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors text-sm sm:text-base truncate">
                {patient?.name || 'Unknown Patient'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 truncate">{appointment.treatment || appointment.title}</p>
            </div>
          </div>
          
          <Badge className={`${getStatusColor(appointment.status)} border font-medium text-xs whitespace-nowrap`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-2 text-slate-600">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{format(new Date(appointment.appointmentDateTime), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{format(new Date(appointment.appointmentDateTime), 'hh:mm a')}</span>
          </div>
          {appointment.cost && (
            <div className="flex items-center space-x-2 text-slate-600">
              <DollarSign className="h-4 w-4 flex-shrink-0" />
              <span>${appointment.cost}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-slate-600">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{patient?.phone || 'N/A'}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {appointment.status === 'pending' && (
            <>
              <Button
                size="sm"
                onClick={() => onStatusChange(appointment.id, 'completed')}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs sm:text-sm"
              >
                Complete
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStatusChange(appointment.id, 'cancelled')}
                className="border-red-200 text-red-600 hover:bg-red-50 transition-colors text-xs sm:text-sm"
              >
                Cancel
              </Button>
            </>
          )}
          
          <div className="flex gap-2 ml-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(appointment)}
              className="hover:bg-gray-50 transition-colors p-2"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(appointment.id)}
              className="hover:bg-red-50 text-red-600 transition-colors p-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
