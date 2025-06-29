
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // This shouldn't happen due to auth guard in App.tsx
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <PatientDashboard />
      )}
    </div>
  );
};

export default Index;
