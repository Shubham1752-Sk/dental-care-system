
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface AppointmentFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
}

export function AppointmentFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter
}: AppointmentFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
