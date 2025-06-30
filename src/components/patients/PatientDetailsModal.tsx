
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail, Calendar, MapPin, AlertCircle, Edit } from 'lucide-react';
import { Patient } from '@/types';
import { format, differenceInYears } from 'date-fns';

interface PatientDetailsModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (patient: Patient) => void;
}

export function PatientDetailsModal({ patient, isOpen, onClose, onEdit }: PatientDetailsModalProps) {
  if (!patient) return null;

  const age = differenceInYears(new Date(), new Date(patient.dateOfBirth));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{patient.name}</h3>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Age {age}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete patient information and medical history
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{patient.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span className="text-sm">Born {format(new Date(patient.dateOfBirth), 'PPP')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{patient.address}</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 mb-3">Emergency Contact</h4>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-sm">{patient.emergencyContact}</span>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 mb-3">Health Information</h4>
            <p className="text-sm text-slate-600">{patient.healthInfo}</p>
          </div>

          {/* Record Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 mb-3">Record Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <span className="font-medium">Created:</span> {format(new Date(patient.createdAt), 'PPP')}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span> {format(new Date(patient.updatedAt), 'PPP')}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(patient)} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Patient
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
