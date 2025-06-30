
import { Home, Users, Calendar, CalendarDays, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

const items = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Patients', url: '/patients', icon: Users },
  { title: 'Appointments', url: '/appointments', icon: Calendar },
  { title: 'Calendar', url: '/calendar', icon: CalendarDays },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  // console.log('Sidebar state:', state);

  return (
    <Sidebar collapsible="icon" className="border-r bg-white">
      <SidebarHeader className="w-full border-b p-4">
        <div className="w-full flex items-center justify-between gap-2">
          {/* <div className="max-w-8 max-h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Menu className="h-4 w-4 text-white" />
          </div> */}
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-slate-800">DentalCare</h2>
              <p className="text-xs text-slate-500">Management System</p>
            </div>
          )}
          <div className={` ${isCollapsed && "p-2"} border-t`}>
            <SidebarTrigger className="w-full justify-center" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 font-medium shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
