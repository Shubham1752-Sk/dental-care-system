
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, DollarSign, Edit, Trash2, Eye } from 'lucide-react';
import { Appointment } from '@/types';
import { format } from 'date-fns';
import { usePatients } from '@/hooks/usePatients';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (appointmentId: string, newStatus: string) => void;
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointmentId: string) => void;
}

export function AppointmentCard({ appointment, onStatusChange, onView, onEdit, onDelete }: AppointmentCardProps) {
  const { patients } = usePatients();
  const patient = patients.find(p => p.id === appointment.patientId);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <Card className="w-full h-full hover:shadow-lg transition-all duration-200 border-slate-200 group hover:border-blue-200">
      <CardContent className="h-full p-4 sm:p-6">
        <div className="h-full flex flex-col justify-between space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
              {appointment.title}
            </h3>
            <Badge className={`${statusColors[appointment.status]} whitespace-nowrap`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Badge>
          </div>

          {/* Patient Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-600 text-sm">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{patient?.name || 'Unknown Patient'}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600 text-sm">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{format(new Date(appointment.appointmentDateTime), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600 text-sm">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{format(new Date(appointment.appointmentDateTime), 'h:mm a')}</span>
            </div>
            {appointment.cost && (
              <div className="flex items-center space-x-2 text-slate-600 text-sm">
                <DollarSign className="h-4 w-4 flex-shrink-0" />
                <span>${appointment.cost}</span>
              </div>
            )}
          </div>

          {/* Treatment */}
          {appointment.treatment && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-800">{appointment.treatment}</p>
            </div>
          )}

          {/* Status Update */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
              <Select
                value={appointment.status}
                onValueChange={(value) => onStatusChange(appointment.id, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="sm"
                onClick={() => onView(appointment)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs sm:text-sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(appointment)}
                className="flex-1 hover:bg-gray-50 transition-colors text-xs sm:text-sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 transition-colors text-xs sm:text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this appointment? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(appointment.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
