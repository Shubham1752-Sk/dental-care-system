
// Core types for the dental clinic management system

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  emergencyContact: string;
  healthInfo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  title: string;
  description: string;
  comment: string;
  appointmentDateTime: Date;
  cost?: number;
  treatment?: string;
  status: 'pending' | 'completed' | 'cancelled';
  nextAppointmentDate?: Date;
  files?: FileAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'patient';
  patientId?: string; // For patient users
}

export interface KPIData {
  totalPatients: number;
  totalAppointments: number;
  totalRevenue: number;
  completedTreatments: number;
  pendingTreatments: number;
}
