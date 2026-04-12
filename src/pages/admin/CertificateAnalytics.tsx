import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Download, 
  ChevronRight, 
  X,
  FileText,
  BarChart3,
  GraduationCap,
  CheckCircle2,
  Loader2,
  FolderArchive,
  HardDrive,
  CloudDownload
} from 'lucide-react';

// --- TYPES ---

interface Student {
  id: string;
  name: string;
  regNo: string;
  dept: string;
  cgpa: number;
  certs: number;
  readiness: number;
  level: 'High' | 'Medium' | 'Low';
}

interface DeptStat {
  name: string;
  avgCerts: number;
  highCertStudents: number;
  avgCGPA: number;
}

interface DistributionItem {
  name: string;
  percentage: number;
  color: string;
}

// --- MOCK DATA ---

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Arjun Sharma', regNo: '2021CSE001', dept: 'CSE', cgpa: 8.9, certs: 8, readiness: 92, level: 'High' },
  { id: '2', name: 'Priya Patel', regNo: '2021ECE045', dept: 'ECE', cgpa: 7.2, certs: 4, readiness: 65, level: 'Medium' },
  { id: '3', name: 'Rahul Varma', regNo: '2021ME012', dept: 'MECH', cgpa: 6.8, certs: 1, readiness: 30, level: 'Low' },
  { id: '4', name: 'Sneha Reddy', regNo: '2021CSE089', dept: 'CSE', cgpa: 9.1, certs: 12, readiness: 98, level: 'High' },
  { id: '5', name: 'Ananya Iyer', regNo: '2021IT034', dept: 'IT', cgpa: 8.4, certs: 6, readiness: 85, level: 'High' },
  { id: '6', name: 'Vikram Singh', regNo: '2021EEE022', dept: 'EEE', cgpa: 7.8, certs: 3, readiness: 55, level: 'Medium' },
  { id: '7', name: 'Karthik Raja', regNo: '2021CSE102', dept: 'CSE', cgpa: 7.5, certs: 5, readiness: 72, level: 'Medium' },
  { id: '8', name: 'Meera Das', regNo: '2021CE009', dept: 'CIVIL', cgpa: 6.5, certs: 0, readiness: 15, level: 'Low' },
];

const DEPT_STATS: DeptStat[] = [
  { name: 'CSE', avgCerts: 6.5, highCertStudents: 45, avgCGPA: 8.2 },
  { name: 'ECE', avgCerts: 4.2, highCertStudents: 28, avgCGPA: 7.8 },
  { name: 'IT', avgCerts: 5.8, highCertStudents: 35, avgCGPA: 8.0 },
  { name: 'MECH', avgCerts: 2.5, highCertStudents: 12, avgCGPA: 7.1 },
  { name: 'EEE', avgCerts: 3.1, highCertStudents: 15, avgCGPA: 7.4 },
];

const DISTRIBUTION_DATA: DistributionItem[] = [
  { name: 'High', percentage: 35, color: '#22c55e' },   // Green
  { name: 'Medium', percentage: 45, color: '#f97316' }, // Orange
  { name: 'Low', percentage: 20, color: '#ef4444' }    // Red
];

// --- CUSTOM SVG CHART COMPONENTS (No Dependencies) ---

const CustomDonutChart = ({ data }: { data: DistributionItem[] }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.2
  
  let currentOffset = 0;

  return (
    <div className="relative flex flex-col items-center justify-center h-full pb-4">
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-56 h-56 transform -rotate-90">
          {/* Background Gray Circle */}
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
          
          {data.map((item, index) => {
            const strokeDash = (item.percentage / 100) * circumference;
            const offset = currentOffset;
            currentOffset += strokeDash;
            
            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth="10"
                strokeDasharray={`${strokeDash} ${circumference}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                className="transition-all duration-1000"
              />
            );
          })}
        </svg>
        <div className="absolute flex flex-col items-center justify-center bg-white rounded-full w-32 h-32 shadow-inner">
          <span className="text-3xl font-black text-slate-800">1,248</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Students</span>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2" style={{ color: item.color }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
            {item.name} ({item.percentage}%)
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomBarChart = ({ data }: { data: DeptStat[] }) => {
  const maxVal = Math.max(...data.map(d => d.avgCerts));
  
  return (
    <div className="flex items-end justify-around h-full w-full px-2 pb-10 pt-6">
      {data.map((dept) => {
        const heightPercent = (dept.avgCerts / maxVal) * 100;
        return (
          <div key={dept.name} className="flex flex-col items-center group w-full h-full justify-end">
            <div 
              className="relative w-10 bg-blue-50 rounded-t-xl transition-all group-hover:bg-blue-100 flex flex-col justify-end overflow-hidden" 
              style={{ height: `${heightPercent}%` }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                {dept.avgCerts}
              </div>
              <div className="w-full bg-blue-600 rounded-t-xl transition-all" style={{ height: '40%' }}></div>
              <div className="w-full bg-blue-400 opacity-40" style={{ height: '60%' }}></div>
            </div>
            <span className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-tighter">{dept.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const CustomRankChart = ({ data }: { data: DeptStat[] }) => (
  <div className="flex flex-col justify-center h-full gap-6 px-4 py-4">
    {data.sort((a, b) => b.highCertStudents - a.highCertStudents).slice(0, 5).map((dept, idx) => (
      <div key={dept.name} className="space-y-2">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-slate-300">0{idx + 1}</span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{dept.name}</span>
          </div>
          <span className="text-[10px] font-black text-emerald-600">{dept.highCertStudents} Students</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-1000" 
            style={{ width: `${(dept.highCertStudents / 50) * 100}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
);

// --- DASHBOARD UI COMPONENTS ---

const SummaryCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className="text-slate-700" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {trend === 'up' ? <TrendingUp size={16} className="text-green-500 mr-1" /> : <TrendingDown size={16} className="text-red-500 mr-1" />}
      <span className={`text-xs font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{trendValue}%</span>
      <span className="text-slate-400 text-xs ml-2">vs last sem</span>
    </div>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <h4 className="text-slate-800 font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
    <div className="w-2 h-2 rounded-sm bg-blue-600 rotate-45"></div>
    {title}
  </h4>
);

const DetailModal = ({ student, onClose }: { student: Student | null; onClose: () => void }) => {
  if (!student) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center bg-blue-600 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl shadow-lg">{student.name.charAt(0)}</div>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-blue-100 text-sm">{student.regNo} • {student.dept}</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full transition-colors"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-2">Academic Standing</p>
            <div className="text-3xl font-black text-slate-800 mb-4">{student.cgpa} <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">CGPA</span></div>
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] tracking-widest hover:bg-blue-100 transition-colors uppercase">
              <HardDrive size={14} /> View Student Drive
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-2">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-tight"><FileText size={16} className="text-blue-600" /> Recent Certificates</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">Full Stack Web Development</span>
                <span className="px-2 py-1 rounded bg-blue-100 text-[10px] font-black text-blue-700 uppercase">TECHNICAL</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">Cloud Internship</span>
                <span className="px-2 py-1 rounded bg-indigo-100 text-[10px] font-black text-indigo-700 uppercase">INTERNSHIP</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t bg-white flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border rounded-xl text-slate-600 font-bold text-sm">Close</button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl shadow-blue-100"><Download size={16} /> DOWNLOAD TRANSCRIPT</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function CertificateAnalytics() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ dept: 'All', cgpa: 'All' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [genSuccess, setGenSuccess] = useState(false);
  const [isVaulting, setIsVaulting] = useState(false);
  const [vaultSuccess, setVaultSuccess] = useState(false);

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.regNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filters.dept === 'All' || s.dept === filters.dept;
      let matchesCGPA = true;
      if (filters.cgpa === '8+') matchesCGPA = s.cgpa >= 8;
      else if (filters.cgpa === '7-8') matchesCGPA = s.cgpa >= 7 && s.cgpa < 8;
      else if (filters.cgpa === '<7') matchesCGPA = s.cgpa < 7;
      return matchesSearch && matchesDept && matchesCGPA;
    });
  }, [searchTerm, filters]);

  const exportCSV = () => {
    const csv = `Name,RegNo,Dept,CGPA,Certs\n${filteredStudents.map(s => `${s.name},${s.regNo},${s.dept},${s.cgpa},${s.certs}`).join('\n')}`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    link.download = `IAEMS_Report_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  const runVaultDownload = () => {
    setIsVaulting(true);
    setTimeout(() => {
      setIsVaulting(false);
      setVaultSuccess(true);
      const blob = new Blob([`Zip Simulation for ${filteredStudents.length} Students`], { type: 'application/zip' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `IAEMS_Certificate_Vault.zip`;
      link.click();
      setTimeout(() => setVaultSuccess(false), 3000);
    }, 2000);
  };

  const runReportGen = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenSuccess(true);
      setTimeout(() => setGenSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 flex">
      {/* Sidebar Mockup */}
      <aside className="w-20 bg-white border-r border-slate-200 hidden lg:flex flex-col items-center py-8 gap-8 sticky top-0 h-screen">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">I</div>
        <div className="flex flex-col gap-6 text-slate-300">
          <BarChart3 size={22} className="hover:text-blue-600 cursor-pointer transition-colors" />
          <Award size={22} className="text-blue-600 bg-blue-50 p-1.5 rounded-lg" />
          <Users size={22} className="hover:text-blue-600 cursor-pointer" />
          <GraduationCap size={22} className="hover:text-blue-600 cursor-pointer" />
        </div>
      </aside>

      <main className="flex-1 min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-8 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Certificate Analytics</h1>
            <p className="text-slate-400 text-sm font-medium">Academic Performance Intelligence Dashboard</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={runVaultDownload} disabled={isVaulting} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border ${vaultSuccess ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'}`}>
              {isVaulting ? <Loader2 className="animate-spin" size={18} /> : vaultSuccess ? <CheckCircle2 size={18} /> : <FolderArchive size={18} className="text-blue-600" />}
              {isVaulting ? 'Zipping...' : vaultSuccess ? 'Vault Exported' : 'Download All Drives'}
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1 hidden lg:block"></div>
            <button onClick={exportCSV} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2">
              <Download size={18} /> EXPORT CSV
            </button>
          </div>
        </header>

        <div className="p-8 lg:p-10 max-w-[1600px] mx-auto space-y-8">
          
          {/* Summary */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard title="Total Students" value="1,248" icon={Users} trend="up" trendValue="12" colorClass="bg-blue-500" />
            <SummaryCard title="High Cert (6+)" value="342" icon={Award} trend="up" trendValue="8" colorClass="bg-green-500" />
            <SummaryCard title="Med Cert (3-5)" value="580" icon={Award} trend="down" trendValue="2" colorClass="bg-orange-500" />
            <SummaryCard title="Low Cert (0-2)" value="326" icon={Award} trend="down" trendValue="15" colorClass="bg-red-500" />
          </section>

          {/* Charts (3 Columns) - Fixed Position & Data Mapping */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-[420px] flex flex-col">
              <SectionHeader title="Distribution Breakdown" />
              <div className="flex-1 min-h-0">
                <CustomDonutChart data={DISTRIBUTION_DATA} />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-[420px] flex flex-col">
              <SectionHeader title="Dept Avg Certificates" />
              <div className="flex-1 min-h-0">
                <CustomBarChart data={DEPT_STATS} />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-[420px] flex flex-col">
              <SectionHeader title="High Performance Ranking" />
              <div className="flex-1 min-h-0">
                <CustomRankChart data={DEPT_STATS} />
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-6 items-end">
            <div className="flex-1 w-full space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input type="text" placeholder="Search name or reg no..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="flex-[2] grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dept Filter</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-medium" value={filters.dept} onChange={(e) => setFilters(f => ({ ...f, dept: e.target.value }))}>
                  <option>All</option><option>CSE</option><option>ECE</option><option>IT</option><option>MECH</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CGPA Grade</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-medium" value={filters.cgpa} onChange={(e) => setFilters(f => ({ ...f, cgpa: e.target.value }))}>
                  <option>All</option><option>8+</option><option>7-8</option><option value="<7">&lt;7</option>
                </select>
              </div>
              <button onClick={() => {setFilters({dept:'All', cgpa:'All'}); setSearchTerm('')}} className="py-3 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors uppercase tracking-widest">RESET ALL</button>
            </div>
          </section>

          {/* Table */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">Student Details</th>
                    <th className="p-5 font-black text-slate-400 text-[10px] uppercase tracking-widest text-center">Department</th>
                    <th className="p-5 font-black text-slate-400 text-[10px] uppercase tracking-widest text-center">CGPA</th>
                    <th className="p-5 font-black text-slate-400 text-[10px] uppercase tracking-widest text-center">Certs</th>
                    <th className="p-5 font-black text-slate-400 text-[10px] uppercase tracking-widest text-center">Vault Drive</th>
                    <th className="p-5 font-black text-slate-400 text-[10px] uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">{student.name.charAt(0)}</div>
                          <div>
                            <div className="font-bold text-slate-800">{student.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono tracking-tighter">{student.regNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-center text-sm text-slate-600 font-bold">{student.dept}</td>
                      <td className="p-5 text-center font-black text-slate-800">{student.cgpa}</td>
                      <td className="p-5 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-slate-100 font-black text-xs text-slate-600">{student.certs}</span>
                      </td>
                      <td className="p-5 text-center">
                        <button className="p-2.5 text-slate-300 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm" title="Open Cloud Drive">
                          <CloudDownload size={22} />
                        </button>
                      </td>
                      <td className="p-5 text-right">
                        <button onClick={() => setSelectedStudent(student)} className="text-blue-600 hover:text-blue-800 font-black text-[10px] tracking-widest flex items-center justify-end gap-1 ml-auto">
                          VIEW PROFILE <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer Actions */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between group">
              <div>
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2 tracking-tight uppercase text-sm"><CloudDownload size={20} className="text-blue-600" /> Certificate Backup Center</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">Instantly archive all digital documents for the current semester. Files are sorted automatically by Registration Number for NAAC file compliance.</p>
              </div>
              <button onClick={runVaultDownload} disabled={isVaulting} className={`w-full font-black text-xs tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all border shadow-sm ${vaultSuccess ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-50 hover:bg-blue-600 hover:text-white border-slate-100 group-hover:border-blue-200'}`}>
                {isVaulting ? <Loader2 className="animate-spin" size={20} /> : vaultSuccess ? <CheckCircle2 size={20} /> : <FolderArchive size={20} />}
                {isVaulting ? 'PREPARING ZIP ARCHIVE...' : vaultSuccess ? 'DOWNLOAD COMPLETED' : 'BULK EXPORT ALL DRIVES (ZIP)'}
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white relative overflow-hidden shadow-2xl shadow-blue-200">
              <div className="relative z-10">
                <h3 className="text-sm font-black uppercase tracking-widest mb-3 opacity-60">Academic Intelligence</h3>
                <h3 className="text-xl font-bold mb-3">Academic Compliance Report</h3>
                <p className="text-blue-100 text-sm mb-10 max-sm leading-relaxed opacity-80">Generate verified performance reports including CGPA trends and certificate distribution for management analysis.</p>
                <button disabled={isGenerating} onClick={runReportGen} className={`px-8 py-3.5 rounded-xl font-black text-xs tracking-widest transition-all shadow-xl flex items-center gap-2 ${genSuccess ? 'bg-emerald-500 text-white' : 'bg-white text-blue-700 hover:scale-105 active:scale-95'}`}>
                  {isGenerating ? <Loader2 className="animate-spin" size={18} /> : genSuccess ? <CheckCircle2 size={18} /> : <FileText size={18} />}
                  {isGenerating ? 'GENERATING PDF...' : genSuccess ? 'REPORT DOWNLOADED' : 'COMPILE SEMESTER REPORT'}
                </button>
              </div>
              <BarChart3 className="absolute right-[-40px] bottom-[-40px] opacity-10" size={240} />
            </div>
          </section>
        </div>
      </main>

      <DetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
}