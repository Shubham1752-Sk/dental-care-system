
import { useState, useEffect } from 'react';
import { Patient } from '@/types';

// Mock data for demonstration
const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    dateOfBirth: new Date('1990-01-01'),
    address: '123 Main St, City',
    emergencyContact: 'Jane Doe - +1234567891',
    healthInfo: 'No allergies, regular checkups',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'p2',
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '+1234567892',
    dateOfBirth: new Date('1985-05-15'),
    address: '456 Oak Ave, City',
    emergencyContact: 'Bob Smith - +1234567893',
    healthInfo: 'Diabetic, sensitive to certain medications',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPatients(MOCK_PATIENTS);
      setLoading(false);
    }, 500);
  }, []);

  const addPatient = (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setPatients(prev => [...prev, newPatient]);
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(prev => 
      prev.map(patient => 
        patient.id === id 
          ? { ...patient, ...updates, updatedAt: new Date() }
          : patient
      )
    );
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
  };

  return {
    patients,
    loading,
    addPatient,
    updatePatient,
    deletePatient
  };
}
