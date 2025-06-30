import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

export const statCards = [
    {
      title: 'Total Appointments',
      value: 'total',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Pending',
      value: 'pending',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100'
    },
    {
      title: 'Completed',
      value: 'completed',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'Cancelled',
      value: 'cancelled',
      icon: XCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100'
    }
  ];