
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Patient } from '@/types';

interface PatientFormModalProps {
  patient?: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> | Patient) => void;
}

export function PatientFormModal({ patient, isOpen, onClose, onSubmit }: PatientFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(),
    address: '',
    emergencyContact: '',
    healthInfo: ''
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: new Date(patient.dateOfBirth),
        address: patient.address,
        emergencyContact: patient.emergencyContact,
        healthInfo: patient.healthInfo
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: new Date(),
        address: '',
        emergencyContact: '',
        healthInfo: ''
      });
    }
  }, [patient, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patient) {
      onSubmit({
        ...patient,
        ...formData
      });
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {patient ? 'Edit Patient' : 'Add New Patient'}
          </DialogTitle>
          <DialogDescription>
            {patient ? 'Update patient information below.' : 'Enter patient information to create a new record.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => date && setFormData({ ...formData, dateOfBirth: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              placeholder="Name - Phone Number"
              required
            />
          </div>

          <div>
            <Label htmlFor="healthInfo">Health Information</Label>
            <Textarea
              id="healthInfo"
              value={formData.healthInfo}
              onChange={(e) => setFormData({ ...formData, healthInfo: e.target.value })}
              placeholder="Allergies, medications, medical conditions..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {patient ? 'Update Patient' : 'Add Patient'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
