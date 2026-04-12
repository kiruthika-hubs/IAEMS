import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  CreditCard, 
  MapPin, 
  Calendar, 
  Users, 
  CalendarDays, 
  DoorOpen, 
  Grid, 
  BarChart3, 
  UserCircle, 
  PlusSquare, 
  LogOut,
  X,
  Award,
  Briefcase,
  PieChart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();

  const studentLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/student' },
    { name: 'My Certificates', icon: Award, path: '/student/certificates' },
    { name: 'Placement Opportunities', icon: Briefcase, path: '/student/placements' },
    { name: 'Syllabus', icon: BookOpen, path: '/student/syllabus' },
    { name: 'Exams', icon: FileText, path: '/student/exams' },
    { name: 'Hall Ticket', icon: CreditCard, path: '/student/hall-ticket' },
    { name: 'Seating', icon: MapPin, path: '/student/seating' },
    { name: 'Calendar', icon: Calendar, path: '/student/calendar' },
  ];

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Certificate Analytics', icon: PieChart, path: '/admin/certificate-analytics' },
    { name: 'Placement Drives', icon: Briefcase, path: '/admin/placements' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Syllabus', icon: BookOpen, path: '/admin/syllabus' },
    { name: 'Events', icon: CalendarDays, path: '/admin/events' },
    { name: 'Exams', icon: FileText, path: '/admin/exams' },
    { name: 'Rooms', icon: DoorOpen, path: '/admin/rooms' },
    { name: 'Seating', icon: Grid, path: '/admin/seating' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  ];

  const seatingLinks = [
    { name: 'Rooms', icon: DoorOpen, path: '/seating/rooms' },
    { name: 'Allocation', icon: Grid, path: '/seating/allocation' },
    { name: 'Seating Chart', icon: MapPin, path: '/seating/chart' },
  ];

  const clubLinks = [
    { name: 'Profile', icon: UserCircle, path: '/club' },
    { name: 'Create Event', icon: PlusSquare, path: '/club/create-event' },
    { name: 'My Events', icon: CalendarDays, path: '/club/my-events' },
    { name: 'Calendar', icon: Calendar, path: '/club/calendar' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'student': return studentLinks;
      case 'admin': return adminLinks;
      case 'seating': return seatingLinks;
      case 'club': return clubLinks;
      default: return [];
    }
  };

  const links = getLinks();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">IA</div>
              <span className="font-bold text-lg tracking-tight">IAEMS</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path.split('/').length <= 2}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
              >
                <link.icon size={20} className={cn(
                  "transition-transform duration-200 group-hover:scale-110"
                )} />
                <span className="font-medium">{link.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
