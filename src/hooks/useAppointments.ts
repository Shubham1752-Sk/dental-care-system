
import { useState, useEffect } from 'react';
import { Appointment } from '@/types';

// Mock data for demonstration
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    title: 'Regular Checkup',
    description: 'Routine dental examination',
    comment: 'Patient reports no pain',
    appointmentDateTime: new Date('2024-01-15T10:00:00'),
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
    appointmentDateTime: new Date('2024-01-20T14:00:00'),
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointments(MOCK_APPOINTMENTS);
      setLoading(false);
    }, 500);
  }, []);

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, ...updates, updatedAt: new Date() }
          : appointment
      )
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
  };

  return {
    appointments,
    loading,
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
}
