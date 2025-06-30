
import { useState, useEffect } from 'react';
import { Patient } from '@/types';

const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    email: 'john@entnt.in',
    phone: '1234567890',
    dateOfBirth: new Date('1990-05-10'),
    address: '123 Main St, City',
    emergencyContact: 'Jane Doe - +1234567891',
    healthInfo: 'No allergies',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'p2',
    name: 'Jane Smith',
    email: 'jane@entnt.in',
    phone: '9876543210',
    dateOfBirth: new Date('1985-08-15'),
    address: '456 Oak Ave, City',
    emergencyContact: 'Bob Smith - +1234567893',
    healthInfo: 'Allergic to penicillin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'p3',
    name: 'Mike Johnson',
    email: 'mike@entnt.in',
    phone: '5555555555',
    dateOfBirth: new Date('1992-12-03'),
    address: '789 Pine St, City',
    emergencyContact: 'Sarah Johnson - +5555555556',
    healthInfo: 'Diabetes, regular medication',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'p4',
    name: 'Sarah Wilson',
    email: 'sarah@entnt.in',
    phone: '1111111111',
    dateOfBirth: new Date('1988-03-22'),
    address: '321 Elm St, City',
    emergencyContact: 'Tom Wilson - +1111111112',
    healthInfo: 'No known allergies',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const STORAGE_KEY = 'dental_patients';

let globalPatients: Patient[] = [];
let patientListeners: (() => void)[] = [];

const notifyPatientListeners = () => {
  patientListeners.forEach(listener => listener());
};

const initializePatients = () => {
  if (globalPatients.length === 0) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        globalPatients = JSON.parse(stored);
      } else {
        globalPatients = [...MOCK_PATIENTS];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(globalPatients));
      }
    } catch (error) {
      console.error('Error loading patients from localStorage:', error);
      globalPatients = [...MOCK_PATIENTS];
    }
  }
};

const savePatientsToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalPatients));
  } catch (error) {
    console.error('Error saving patients to localStorage:', error);
  }
};

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializePatients();
    setPatients([...globalPatients]);

    const updateState = () => {
      setPatients([...globalPatients]);
    };
    patientListeners.push(updateState);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      patientListeners = patientListeners.filter(listener => listener !== updateState);
    };
  }, []);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString()
    };
    globalPatients = [...globalPatients, newPatient];
    savePatientsToStorage();
    notifyPatientListeners();
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    globalPatients = globalPatients.map(patient =>
      patient.id === id
        ? { ...patient, ...updates }
        : patient
    );
    savePatientsToStorage();
    notifyPatientListeners();
  };

  const deletePatient = (id: string) => {
    globalPatients = globalPatients.filter(patient => patient.id !== id);
    savePatientsToStorage();
    notifyPatientListeners();
  };

  return {
    patients,
    loading,
    addPatient,
    updatePatient,
    deletePatient
  };
}