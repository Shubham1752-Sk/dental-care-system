
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">
              DentalCare Pro
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                ({user?.role})
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
