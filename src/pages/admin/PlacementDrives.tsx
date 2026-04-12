import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Plus, 
  Filter, 
  Search, 
  MoreVertical, 
  FileText, 
  Download, 
  ChevronRight, 
  ArrowLeft,
  MapPin,
  Calendar,
  BarChart3,
  Layers,
  UserCheck, 
  Trophy,
  X,
  Upload,
  AlertCircle,
  LucideIcon
} from 'lucide-react';

/**
 * TYPES & INTERFACES
 */
interface Eligibility {
  minCgpa: number;
  maxArrears: number;
  departments: string[];
  tenPercent: number;
  twelvePercent: number;
}

interface DriveCounts {
  eligible: number;
  applied: number;
  shortlisted: number;
  selected: number;
}

interface Drive {
  id: string;
  company: string;
  role: string;
  ctc: number;
  location: string;
  type: string;
  status: 'Open' | 'Closed' | 'Completed' | string;
  deadline: string;
  eligibility: Eligibility;
  counts: DriveCounts;
  rounds: string[];
}

interface Student {
  id: string;
  name: string;
  regNo: string;
  dept: string;
  cgpa: number;
  status: 'Shortlisted' | 'Applied' | 'Rejected' | 'Selected' | string;
  round: string;
}

interface AnalyticsData {
  name: string;
  applied: number;
  selected: number;
}

interface Notification {
  type: 'success' | 'error';
  message: string;
}

/**
 * MOCK DATA & CONSTANTS
 */
const DEPARTMENTS = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "AI&DS"];

const MOCK_DRIVES: Drive[] = [
  {
    id: "DRV-001",
    company: "Google",
    role: "Software Engineer",
    ctc: 42.5,
    location: "Bangalore / Hybrid",
    type: "Full-time",
    status: "Open",
    deadline: "2026-12-25",
    eligibility: {
      minCgpa: 8.5,
      maxArrears: 0,
      departments: ["CSE", "IT", "AI&DS"],
      tenPercent: 85,
      twelvePercent: 85,
    },
    counts: { eligible: 450, applied: 320, shortlisted: 85, selected: 0 },
    rounds: ["Aptitude", "Technical 1", "Technical 2", "HR"]
  },
  {
    id: "DRV-002",
    company: "J.P. Morgan Chase",
    role: "Financial Analyst",
    ctc: 18.0,
    location: "Mumbai",
    type: "Full-time",
    status: "Closed",
    deadline: "2026-11-10",
    eligibility: {
      minCgpa: 7.5,
      maxArrears: 0,
      departments: ["CSE", "ECE", "EEE", "IT"],
      tenPercent: 75,
      twelvePercent: 75,
    },
    counts: { eligible: 800, applied: 650, shortlisted: 120, selected: 15 },
    rounds: ["Aptitude", "Group Discussion", "Interview"]
  },
  {
    id: "DRV-003",
    company: "Microsoft",
    role: "Cloud Intern",
    ctc: 12.0,
    location: "Hyderabad",
    type: "Internship",
    status: "Completed",
    deadline: "2026-10-05",
    eligibility: {
      minCgpa: 8.0,
      maxArrears: 1,
      departments: ["CSE", "IT"],
      tenPercent: 80,
      twelvePercent: 80,
    },
    counts: { eligible: 300, applied: 280, shortlisted: 40, selected: 12 },
    rounds: ["Online Assessment", "Technical Interview", "AA Interview"]
  }
];

const MOCK_STUDENTS: Student[] = [
  { id: "STU001", name: "Arjun Sharma", regNo: "2026CSE001", dept: "CSE", cgpa: 9.2, status: "Shortlisted", round: "Technical 2" },
  { id: "STU002", name: "Priya Patel", regNo: "2026IT045", dept: "IT", cgpa: 8.8, status: "Applied", round: "Aptitude" },
  { id: "STU003", name: "Rahul Verma", regNo: "2026ECE012", dept: "ECE", cgpa: 8.4, status: "Rejected", round: "Aptitude" },
  { id: "STU004", name: "Sneha Reddy", regNo: "2026AI005", dept: "AI&DS", cgpa: 9.5, status: "Selected", round: "HR" },
  { id: "STU005", name: "Vikram Singh", regNo: "2026ME088", dept: "MECH", cgpa: 7.9, status: "Applied", round: "Aptitude" },
];

const ANALYTICS_DATA: AnalyticsData[] = [
  { name: 'CSE', applied: 120, selected: 45 },
  { name: 'IT', applied: 98, selected: 38 },
  { name: 'ECE', applied: 86, selected: 20 },
  { name: 'AI&DS', applied: 75, selected: 32 },
  { name: 'MECH', applied: 40, selected: 5 },
];

/**
 * LIGHTWEIGHT INTERNAL CHART COMPONENTS (Fixes Recharts dependency error)
 */

const SimpleBarChart = ({ data }: { data: AnalyticsData[] }) => {
  const maxVal = Math.max(...data.map(d => d.applied), 1);
  return (
    <div className="flex items-end justify-between h-48 w-full gap-2 px-2 border-b border-slate-100">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
          <div className="w-full flex justify-center gap-1 items-end h-32">
            <div 
              className="w-3 bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600" 
              style={{ height: `${(d.applied / maxVal) * 100}%` }}
              title={`Applied: ${d.applied}`}
            />
            <div 
              className="w-3 bg-emerald-500 rounded-t-sm transition-all hover:bg-emerald-600" 
              style={{ height: `${(d.selected / maxVal) * 100}%` }}
              title={`Selected: ${d.selected}`}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-400 rotate-45 sm:rotate-0 mt-2">{d.name}</span>
        </div>
      ))}
    </div>
  );
};

const SimplePieChart = ({ data }: { data: { name: string, value: number }[] }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const colors = ['#ef4444', '#f59e0b', '#6366f1', '#94a3b8'];
  let currentPos = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
      <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
        {data.map((d, i) => {
          const percentage = (d.value / total) * 100;
          const strokeDasharray = `${percentage} ${100 - percentage}`;
          const strokeDashoffset = -currentPos;
          currentPos += percentage;
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r="15.915"
              fill="transparent"
              stroke={colors[i % colors.length]}
              strokeWidth="12"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
            />
          );
        })}
      </svg>
      <div className="flex flex-col gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            <span className="text-xs font-medium text-slate-600">{d.name}: <span className="font-bold">{d.value}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * REUSABLE UI COMPONENTS
 */

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'red' | 'orange' | 'gray';
  onClick?: () => void;
  active?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'gray', onClick, active }) => {
  const styles = {
    green: 'bg-green-100 text-green-700 border-green-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const activeStyles = active ? 'ring-2 ring-blue-500 ring-offset-1 shadow-sm' : '';

  return (
    <span 
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all select-none ${styles[variant]} ${activeStyles} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
    >
      {children}
    </span>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className} ${onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}
  >
    {children}
  </div>
);

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'blue' | 'green' | 'purple' | 'amber';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color = "blue" }) => {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-emerald-600 bg-emerald-50",
    purple: "text-purple-600 bg-purple-50",
    amber: "text-amber-600 bg-amber-50"
  };
  return (
    <Card className="p-5 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
        {trend && <p className="text-xs text-emerald-600 mt-1 font-medium">{trend}</p>}
      </div>
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
    </Card>
  );
};

// --- MODAL COMPONENT ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDriveModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-800">Configure New Placement Drive</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Briefcase size={16} /> Company Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input type="text" placeholder="e.g. Google India" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role / Designation</label>
                <input type="text" placeholder="e.g. Frontend Engineer" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CTC (LPA)</label>
                <input type="number" placeholder="0.00" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" placeholder="e.g. Remote, Bangalore" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} /> Eligibility Rules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Min CGPA</label>
                <input type="number" step="0.1" placeholder="7.5" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Max Arrears</label>
                <input type="number" placeholder="0" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">10th / 12th Min %</label>
                <input type="number" placeholder="75" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Eligible Departments</label>
              <div className="flex flex-wrap gap-2">
                {DEPARTMENTS.map(dept => (
                  <label key={dept} className="flex items-center gap-2 px-3 py-1.5 border rounded-full cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-slate-600 font-medium">{dept}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-between items-center z-10">
          <div className="text-sm text-slate-500">
            <span className="font-bold text-blue-600">~450</span> students meet criteria.
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors text-sm">Cancel</button>
            <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all text-sm">Launch Drive</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 */
const App: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailTab, setDetailTab] = useState('overview');
  const [notification, setNotification] = useState<Notification | null>(null);
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Notification Auto-dismiss
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const filteredDrives = useMemo(() => {
    return MOCK_DRIVES.filter(drive => {
      const matchesSearch = 
        drive.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drive.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || drive.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const openDriveDetail = (drive: Drive) => {
    setSelectedDrive(drive);
    setView('detail');
    setDetailTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDriveDetail = () => {
    setSelectedDrive(null);
    setView('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * EXPORT LOGIC
   */
  const handleExport = (data: any[], fileName: string) => {
    if (!data || data.length === 0) {
      setNotification({ type: 'error', message: 'No data to export' });
      return;
    }

    try {
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => {
        return Object.values(row).map(val => {
          if (typeof val === 'object' && val !== null) {
            return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
          }
          if (typeof val === 'string' && val.includes(',')) {
            return `"${val}"`;
          }
          return val;
        }).join(',');
      }).join('\n');

      const csvContent = `${headers}\n${rows}`;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setNotification({ type: 'success', message: `Exported ${fileName} successfully` });
    } catch (error) {
      setNotification({ type: 'error', message: 'Export failed' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-10 duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${
            notification.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'
          }`}>
            {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-bold">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-60"><X size={14} /></button>
          </div>
        </div>
      )}

      {/* Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="cursor-pointer group" onClick={closeDriveDetail}>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">Placement Drive Management</h1>
          <p className="text-sm text-slate-500">IAEMS &bull; Academic Year 2026-2027</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleExport(MOCK_DRIVES, 'Placement_Drives_Report')}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <Download size={16} /> Export Reports
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            <Plus size={16} /> Create New Drive
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'list' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Active Drives" value="12" icon={Briefcase} color="blue" />
              <StatCard title="Total Applied" value="2,450" icon={Users} color="purple" />
              <StatCard title="Total Placed" value="482" icon={CheckCircle2} color="green" />
              <StatCard title="Highest Package" value="42.5 LPA" icon={Trophy} color="amber" />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by company or role..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {['All', 'Open', 'Closed', 'Completed'].map(status => (
                    <Badge 
                      key={status}
                      variant={statusFilter === status ? (status === 'Open' ? 'green' : status === 'Closed' ? 'orange' : 'blue') : 'gray'} 
                      active={statusFilter === status}
                      onClick={() => setStatusFilter(status)}
                    >{status}{status === 'All' ? ' Status' : ''}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrives.length > 0 ? (
                  filteredDrives.map((drive) => (
                    <Card key={drive.id} className="group hover:border-blue-400" onClick={() => openDriveDetail(drive)}>
                      <div className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200 text-xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                              {drive.company.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{drive.company}</h4>
                              <p className="text-xs text-slate-500 font-medium">{drive.role}</p>
                            </div>
                          </div>
                          <Badge variant={drive.status === 'Open' ? 'green' : drive.status === 'Closed' ? 'orange' : 'blue'}>
                            {drive.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 py-2 border-y border-slate-100">
                          <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CTC Package</p><p className="text-sm font-bold text-emerald-600">{drive.ctc} LPA</p></div>
                          <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</p><p className="text-sm font-medium text-slate-700 truncate">{drive.location}</p></div>
                          <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Eligibility</p><p className="text-sm font-medium text-slate-700">{drive.eligibility.minCgpa} CGPA+</p></div>
                          <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Deadline</p><p className="text-sm font-medium text-slate-700">{drive.deadline}</p></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold">{i}</div>)}
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-50 text-blue-600 flex items-center justify-center text-[8px] font-bold">+{drive.counts.applied}</div>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); openDriveDetail(drive); }} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                            View Full Details <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-slate-500 font-medium">No drives found matching your criteria.</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* DRIVE DETAIL VIEW */
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <button onClick={closeDriveDetail} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors p-1">
                <ArrowLeft size={18} /> Back to Drives
              </button>
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => handleExport(MOCK_STUDENTS, `Applicants_${selectedDrive?.company}`)}
                  className="px-4 py-1.5 text-xs font-bold bg-slate-800 text-white rounded-lg shadow hover:bg-slate-900 flex items-center gap-2 transition-colors"
                >
                  <Download size={14} /> Export Applicants
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-3xl shrink-0">
                {selectedDrive?.company.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-slate-900">{selectedDrive?.company}</h2>
                  <Badge variant={selectedDrive?.status === 'Open' ? 'green' : 'gray'}>{selectedDrive?.status}</Badge>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Briefcase size={16} /> {selectedDrive?.role}</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold"><Trophy size={16} /> {selectedDrive?.ctc} LPA</span>
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> {selectedDrive?.location}</span>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-200 overflow-x-auto scroll-hide">
              <nav className="flex gap-8 whitespace-nowrap min-w-max px-2">
                {['Overview', 'Applicants', 'Rounds', 'Analytics'].map(label => (
                  <button
                    key={label}
                    onClick={() => setDetailTab(label.toLowerCase())}
                    className={`flex items-center gap-2 py-4 px-1 text-sm font-bold border-b-2 transition-all ${
                      detailTab === label.toLowerCase() ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="min-h-[400px]">
              {detailTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
                  <div className="md:col-span-2 space-y-6">
                    <Card className="p-6">
                      <h3 className="font-bold text-slate-800 mb-4">Job Description</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Hiring for {selectedDrive?.role} at {selectedDrive?.company}. 
                        Requirements include expertise in core domains and high problem-solving skills.
                      </p>
                    </Card>
                    <Card className="p-6">
                      <h3 className="font-bold text-slate-800 mb-4">Eligibility</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Min CGPA</p>
                          <p className="text-lg font-bold">{selectedDrive?.eligibility.minCgpa}+</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Max Arrears</p>
                          <p className="text-lg font-bold">{selectedDrive?.eligibility.maxArrears}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {detailTab === 'applicants' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <Card className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-wider">Student Name</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-wider">Reg No</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-wider">Dept</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-wider">CGPA</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-wider">Status</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-wider text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {MOCK_STUDENTS.map(student => (
                          <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-800 text-sm">{student.name}</td>
                            <td className="px-6 py-4 text-slate-500 text-sm">{student.regNo}</td>
                            <td className="px-6 py-4"><Badge variant="blue">{student.dept}</Badge></td>
                            <td className="px-6 py-4 font-mono font-bold text-slate-700">{student.cgpa}</td>
                            <td className="px-6 py-4">
                              <Badge variant={student.status === 'Selected' ? 'green' : student.status === 'Rejected' ? 'red' : 'orange'}>
                                {student.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
                                <MoreVertical size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </div>
              )}

              {detailTab === 'rounds' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4 scrollbar-hide animate-in fade-in duration-300">
                  {['Applications', 'Aptitude', 'Technical', 'HR / Selected'].map((col, i) => (
                    <div key={col} className="min-w-[280px] bg-slate-100 p-3 rounded-xl border border-slate-200 h-fit">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">{col}</h4>
                        <button className="text-slate-400 hover:text-blue-600 transition-colors"><Plus size={16} /></button>
                      </div>
                      <div className="space-y-3">
                        {MOCK_STUDENTS.slice(0, Math.max(1, 3 - i)).map(s => (
                          <div key={s.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 transition-colors group">
                            <p className="text-sm font-bold text-slate-800">{s.name}</p>
                            <p className="text-[10px] text-slate-500">{s.regNo} &bull; {s.dept}</p>
                            <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                <CheckCircle2 size={12} /> Passed
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {detailTab === 'analytics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                  <Card className="p-6">
                    <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <BarChart3 size={18} className="text-blue-500" /> Dept-wise Participation
                    </h4>
                    <SimpleBarChart data={ANALYTICS_DATA} />
                  </Card>
                  
                  <Card className="p-6">
                    <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Layers size={18} className="text-purple-500" /> Round Dropout Analysis
                    </h4>
                    <SimplePieChart data={[
                      { name: 'Aptitude Fail', value: 400 },
                      { name: 'Technical Fail', value: 300 },
                      { name: 'HR Rejection', value: 100 },
                      { name: 'Withdrawn', value: 50 },
                    ]} />
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <CreateDriveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <footer className="mt-12 py-8 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest px-4">
          IAEMS Placement Management Module &copy; 2026 Enterprise Solutions &bull; Supporting Higher Education
        </p>
      </footer>
    </div>
  );
}

export default App;