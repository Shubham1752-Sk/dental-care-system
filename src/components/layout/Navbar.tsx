
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          {user?.role === 'admin' && (
            <SidebarTrigger className="lg:hidden hover:bg-slate-100 transition-colors duration-200 rounded-lg p-2" />
          )}
          {user?.role === 'patient' && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                DentalCare Pro
              </h1>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="hover:bg-slate-100 transition-colors duration-200 rounded-lg p-2">
              <Bell className="h-5 w-5 text-slate-600" />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
              3
            </Badge>
          </div>
          
          {/* User Info */}
          <div className="flex items-center space-x-3 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-slate-800">{user?.name}</div>
              <div className="text-slate-500 capitalize text-xs">{user?.role}</div>
            </div>
          </div>
          
          {/* Logout Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="border-slate-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="ml-2">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
