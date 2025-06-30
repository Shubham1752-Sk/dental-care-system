
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Phone, Mail, Calendar, Edit, Eye } from 'lucide-react';
import { Patient } from '@/types';
import { format, differenceInYears } from 'date-fns';

interface PatientCardProps {
  patient: Patient;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
}

export function PatientCard({ patient, onView, onEdit }: PatientCardProps) {
  const age = differenceInYears(new Date(), new Date(patient.dateOfBirth));
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-slate-200 group hover:border-blue-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
          
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                {patient.name}
              </h3>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 whitespace-nowrap">
                Age {age}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-slate-600 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 text-sm">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>Born {format(new Date(patient.dateOfBirth), 'MMM dd, yyyy')}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="sm"
                onClick={() => onView(patient)}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs sm:text-sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(patient)}
                className="hover:bg-gray-50 transition-colors text-xs sm:text-sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
