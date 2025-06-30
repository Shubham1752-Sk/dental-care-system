
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { usePatients } from '@/hooks/usePatients';
import { Appointment } from '@/types';

interface AppointmentFormModalProps {
  appointment?: Appointment | null;
  selectedDate?: Date;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'> | Appointment) => void;
}

export function AppointmentFormModal({ appointment, selectedDate, isOpen, onClose, onSubmit }: AppointmentFormModalProps) {
  const { patients } = usePatients();
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    comment: '',
    appointmentDateTime: selectedDate || new Date(),
    cost: '',
    treatment: '',
    status: 'pending' as const
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        patientId: appointment.patientId,
        title: appointment.title,
        description: appointment.description,
        comment: appointment.comment || '',
        appointmentDateTime: new Date(appointment.appointmentDateTime),
        cost: appointment.cost?.toString() || '',
        treatment: appointment.treatment || '',
        status: appointment.status
      });
    } else {
      setFormData({
        patientId: '',
        title: '',
        description: '',
        comment: '',
        appointmentDateTime: selectedDate || new Date(),
        cost: '',
        treatment: '',
        status: 'pending'
      });
    }
  }, [appointment, selectedDate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appointment) {
      onSubmit({
        ...appointment,
        ...formData,
        cost: formData.cost ? Number(formData.cost) : undefined
      });
    } else {
      onSubmit({
        ...formData,
        cost: formData.cost ? Number(formData.cost) : undefined
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {appointment ? 'Edit Appointment' : 'New Appointment'}
          </DialogTitle>
          <DialogDescription>
            {appointment ? 'Update appointment details below.' : 'Create a new appointment for a patient.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient">Patient</Label>
              <Select value={formData.patientId} onValueChange={(value) => setFormData({ ...formData, patientId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="treatment">Treatment</Label>
            <Input
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Date & Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.appointmentDateTime && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.appointmentDateTime ? format(formData.appointmentDateTime, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.appointmentDateTime}
                    onSelect={(date) => date && setFormData({ ...formData, appointmentDateTime: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              />
            </div>
          </div>

          {appointment && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'pending' | 'completed' | 'cancelled') => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="comment">Comments</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {appointment ? 'Update Appointment' : 'Create Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
