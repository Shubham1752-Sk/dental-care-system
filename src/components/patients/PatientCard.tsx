
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { Patient } from '@/types';

interface PatientCardProps {
  patient: Patient;
  onEdit?: (patient: Patient) => void;
  onView?: (patient: Patient) => void;
}

export function PatientCard({ patient, onEdit, onView }: PatientCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-slate-200 group hover:border-blue-200 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                {patient.name}
              </h4>
              <p className="text-sm text-slate-600">ID: {patient.id}</p>
            </div>
          </div>
          
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Active
          </Badge>
        </div>
        
        <div className="space-y-3 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-slate-600">
            <Phone className="h-4 w-4" />
            <span>{patient.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <Mail className="h-4 w-4" />
            <span>{patient.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <Calendar className="h-4 w-4" />
            <span>Age: {patient.age}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <MapPin className="h-4 w-4" />
            <span>{patient.address}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={() => onView?.(patient)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            View Details
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit?.(patient)}
            className="flex-1 border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
