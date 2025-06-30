
import { useState, useMemo } from 'react';
import { usePatients } from '@/hooks/usePatients';
import { PatientCard } from '@/components/patients/PatientCard';
import { PatientStats } from '@/components/patients/PatientStats';
import { PatientDetailsModal } from '@/components/patients/PatientDetailsModal';
import { PatientFormModal } from '@/components/patients/PatientFormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Patient } from '@/types';
import { toast } from '@/hooks/use-toast';

const Patients = () => {
  const { patients, addPatient, updatePatient } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setIsFormModalOpen(true);
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> | Patient) => {
    if ('id' in patientData) {
      updatePatient(patientData.id, patientData);
      toast({
        title: "Patient updated",
        description: `${patientData.name}'s information has been updated successfully.`,
      });
    } else {
      addPatient(patientData);
      toast({
        title: "Patient added",
        description: `${patientData.name} has been added successfully.`,
      });
    }
  };

  const handleEditFromDetails = (patient: Patient) => {
    setIsDetailsModalOpen(false);
    setEditingPatient(patient);
    setIsFormModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Patients</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">Manage patient records and information</p>
          </div>
          <Button 
            onClick={handleAddPatient}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>

        {/* Stats */}
        <PatientStats patients={patients} />

        {/* Search */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 sm:h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onView={handleViewPatient}
                onEdit={handleEditPatient}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-400 text-base sm:text-lg">No patients found</div>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <PatientDetailsModal
        patient={selectedPatient}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={handleEditFromDetails}
      />

      <PatientFormModal
        patient={editingPatient}
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Patients;
