
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, DollarSign, FileText, Edit } from 'lucide-react';
import { Appointment } from '@/types';
import { format } from 'date-fns';
import { usePatients } from '@/hooks/usePatients';

interface AppointmentDetailsModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (appointment: Appointment) => void;
}

export function AppointmentDetailsModal({ appointment, isOpen, onClose, onEdit }: AppointmentDetailsModalProps) {
  const { patients } = usePatients();
  
  if (!appointment) return null;

  const patient = patients.find(p => p.id === appointment.patientId);
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{appointment.title}</h3>
              <Badge className={statusColors[appointment.status]}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete appointment details and information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Information */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 mb-3">Patient Information</h4>
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-slate-500" />
              <span className="text-sm">{patient?.name || 'Unknown Patient'}</span>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 mb-3">Appointment Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{format(new Date(appointment.appointmentDateTime), 'PPP')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{format(new Date(appointment.appointmentDateTime), 'p')}</span>
              </div>
              {appointment.treatment && (
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{appointment.treatment}</span>
                </div>
              )}
              {appointment.cost && (
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">${appointment.cost}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {appointment.description && (
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-slate-800 mb-3">Description</h4>
              <p className="text-sm text-slate-600">{appointment.description}</p>
            </div>
          )}

          {/* Comments */}
          {appointment.comment && (
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-medium text-slate-800 mb-3">Comments</h4>
              <p className="text-sm text-slate-600">{appointment.comment}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(appointment)} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
