
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, DollarSign, Phone, Mail } from 'lucide-react';
import { Appointment } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (id: string, status: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function AppointmentCard({ appointment, onStatusChange }: AppointmentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-slate-200 group hover:border-blue-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                {appointment.patientName}
              </h4>
              <p className="text-sm text-slate-600">{appointment.treatmentType}</p>
            </div>
          </div>
          
          <Badge className={`${getStatusColor(appointment.status)} border font-medium`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-slate-600">
            <Calendar className="h-4 w-4" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <Clock className="h-4 w-4" />
            <span>{appointment.time}</span>
          </div>
          {appointment.cost && (
            <div className="flex items-center space-x-2 text-slate-600">
              <DollarSign className="h-4 w-4" />
              <span>${appointment.cost}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-slate-600">
            <Phone className="h-4 w-4" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
        
        {appointment.status === 'pending' && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => onStatusChange(appointment.id, 'confirmed')}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors flex-1"
            >
              Confirm
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(appointment.id, 'cancelled')}
              className="border-red-200 text-red-600 hover:bg-red-50 transition-colors flex-1"
            >
              Cancel
            </Button>
          </div>
        )}
        
        {appointment.status === 'confirmed' && (
          <Button
            size="sm"
            onClick={() => onStatusChange(appointment.id, 'completed')}
            className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            Mark Complete
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
