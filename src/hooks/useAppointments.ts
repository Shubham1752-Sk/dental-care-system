
import { useState, useEffect } from 'react';
import { Appointment } from '@/types';

// Enhanced mock data with more appointments including past ones
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
