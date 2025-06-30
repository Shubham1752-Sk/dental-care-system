
import { useState, useEffect } from 'react';
import { Appointment } from '@/types';

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    title: 'Regular Checkup',
    description: 'Routine dental examination',
    comment: 'Patient reports no pain',
    appointmentDateTime: new Date('2024-12-15T10:00:00'),
    cost: 120,
    treatment: 'Cleaning and examination',
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'a2',
    patientId: 'p2',
    title: 'Filling Appointment',
    description: 'Cavity filling on upper molar',
    comment: 'Patient comfortable with procedure',
    appointmentDateTime: new Date('2024-12-20T14:00:00'),
    cost: 180,
    treatment: 'Composite filling',
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'a3',
    patientId: 'p1',
    title: 'Teeth Whitening',
    description: 'Professional teeth whitening treatment',
    comment: 'Scheduled follow-up',
    appointmentDateTime: new Date('2025-01-05T15:00:00'),
    cost: 300,
    treatment: 'Teeth whitening',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'a4',
    patientId: 'p2',
    title: 'Follow-up Checkup',
    description: 'Post-treatment checkup',
    comment: 'Healing well',
    appointmentDateTime: new Date('2025-01-10T11:00:00'),
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'a5',
    patientId: 'p3',
    title: 'Root Canal Treatment',
    description: 'Root canal therapy for infected tooth',
    comment: 'Multi-session treatment',
    appointmentDateTime: new Date('2025-01-15T09:00:00'),
    cost: 800,
    treatment: 'Root canal',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'a6',
    patientId: 'p4',
    title: 'Dental Cleaning',
    description: 'Regular dental cleaning and checkup',
    comment: 'Good oral hygiene maintained',
    appointmentDateTime: new Date('2024-11-20T14:00:00'),
    cost: 120,
    treatment: 'Professional cleaning',
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'a7',
    patientId: 'p1',
    title: 'Crown Placement',
    description: 'Ceramic crown placement',
    comment: 'Perfect fit achieved',
    appointmentDateTime: new Date('2024-10-25T13:00:00'),
    cost: 1200,
    treatment: 'Crown placement',
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'a8',
    patientId: 'p3',
    title: 'Orthodontic Consultation',
    description: 'Initial consultation for braces',
    comment: 'Treatment plan discussed',
    appointmentDateTime: new Date('2025-01-20T16:00:00'),
    cost: 150,
    treatment: 'Consultation',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const STORAGE_KEY = 'dental_appointments';

// Create a singleton state to share across all hook instances
let globalAppointments: Appointment[] = [];
let listeners: (() => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

const initializeAppointments = () => {
  if (globalAppointments.length === 0) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        globalAppointments = parsed.map((apt) => ({
          ...apt,
          appointmentDateTime: new Date(apt.appointmentDateTime),
          createdAt: new Date(apt.createdAt),
          updatedAt: new Date(apt.updatedAt)
        }));
      } else {
        globalAppointments = [...MOCK_APPOINTMENTS];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(globalAppointments));
      }
    } catch (error) {
      console.error('Error loading appointments from localStorage:', error);
      globalAppointments = [...MOCK_APPOINTMENTS];
    }
  }
};

const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalAppointments));
  } catch (error) {
    console.error('Error saving appointments to localStorage:', error);
  }
};

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize appointments on first load
    initializeAppointments();
    setAppointments([...globalAppointments]);
    
    // Add this component to listeners
    const updateState = () => {
      setAppointments([...globalAppointments]);
    };
    listeners.push(updateState);
    
    setTimeout(() => {
      setLoading(false);
    }, 500);

    // Cleanup listener on unmount
    return () => {
      listeners = listeners.filter(listener => listener !== updateState);
    };
  }, []);

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    globalAppointments = [...globalAppointments, newAppointment];
    saveToStorage();
    notifyListeners();
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    globalAppointments = globalAppointments.map(appointment => 
      appointment.id === id 
        ? { ...appointment, ...updates, updatedAt: new Date() }
        : appointment
    );
    saveToStorage();
    notifyListeners();
  };

  const deleteAppointment = (id: string) => {
    globalAppointments = globalAppointments.filter(appointment => appointment.id !== id);
    saveToStorage();
    notifyListeners();
  };

  return {
    appointments,
    loading,
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
}
