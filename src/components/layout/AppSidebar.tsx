
import { Users, Calendar, FileText, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: BarChart3 },
  { title: 'Patients', url: '/patients', icon: Users },
  { title: 'Appointments', url: '/appointments', icon: FileText },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out`} collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 shadow-sm">
        {/* Header Section */}
        <div className="p-4 border-b border-slate-200 bg-white/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              {!isCollapsed && (
                <div className="transition-opacity duration-200">
                  <h2 className="font-bold text-slate-800">Dental Center</h2>
                  <p className="text-xs text-slate-500">Management System</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-6 w-6 p-0 hover:bg-slate-100 transition-colors duration-200"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-slate-600" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-slate-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation Section */}
        <SidebarGroup className="px-3 py-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive: linkIsActive }) =>
                        `flex items-center px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group relative ${
                          linkIsActive
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-[1.02]'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600 hover:shadow-md hover:transform hover:scale-[1.01]'
                        }`
                      }
                    >
                      <item.icon className={`h-5 w-5 transition-transform duration-200 ${isActive(item.url) ? 'scale-110' : 'group-hover:scale-110'}`} />
                      {!isCollapsed && (
                        <span className="ml-3 font-medium transition-all duration-200">
                          {item.title}
                        </span>
                      )}
                      {isActive(item.url) && !isCollapsed && (
                        <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer Section */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="text-xs text-slate-600 text-center">
              <div className="font-medium">DentalCare Pro</div>
              <div className="text-slate-500">v2.0.1</div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
