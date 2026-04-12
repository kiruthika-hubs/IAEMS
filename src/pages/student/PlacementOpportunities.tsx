import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  Info,
  ShieldCheck,
  X,
  FileText,
  User,
  Clock,
  ChevronDown,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Mock Data ---

const MOCK_DRIVES = [
  {
    id: '1',
    companyName: 'Google',
    role: 'Software Development Engineer',
    tier: 'Tier 1',
    package: '32.5 LPA',
    location: 'Bangalore / Hyderabad',
    driveDate: new Date(Date.now() + 86400000 * 7),
    lastDateToApply: new Date(Date.now() + 86400000 * 3),
    minCGPA: 8.5,
    allowedDepartments: ['CSE', 'IT', 'ECE'],
  },
  {
    id: '2',
    companyName: 'Microsoft',
    role: 'Data Scientist Intern',
    tier: 'Tier 1',
    package: '28.0 LPA',
    location: 'Hyderabad',
    driveDate: new Date(Date.now() + 86400000 * 10),
    lastDateToApply: new Date(Date.now() + 86400000 * 5),
    minCGPA: 8.0,
    allowedDepartments: ['CSE', 'IT', 'AI/ML', 'DS'],
  },
  {
    id: '3',
    companyName: 'Amazon',
    role: 'Cloud Support Associate',
    tier: 'Tier 2',
    package: '18.0 LPA',
    location: 'Chennai / Remote',
    driveDate: new Date(Date.now() + 86400000 * 14),
    lastDateToApply: new Date(Date.now() + 86400000 * 8),
    minCGPA: 7.5,
    allowedDepartments: ['CSE', 'IT', 'ECE', 'EEE'],
  },
];

// --- Mock Contexts & Services ---

const AuthContext = createContext(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const placementService = {
  getDrives: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_DRIVES;
  },
  applyForDrive: async (userId, driveId, formData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { 
      success: true,
      applicationData: {
        appliedAt: new Date(),
        status: 'In Progress',
        rounds: [
          { name: 'Application Screening', status: 'completed' },
          { name: 'Online Assessment', status: 'current' },
          { name: 'Technical Interview', status: 'pending' },
          { name: 'HR Round', status: 'pending' }
        ]
      }
    };
  }
};

// --- Components ---

const ApplicationForm = ({ drive, isOpen, onClose, onApply, isApplying }) => {
  const [resumeLink, setResumeLink] = useState('');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Apply for {drive.companyName}</h3>
            <p className="text-xs text-slate-500">{drive.role}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <Info size={20} className="text-blue-600 shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                By applying, your profile details (CGPA, Department, Arrears) will be shared with the recruiter.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Resume Link (Drive/Cloud)</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="url"
                  placeholder="https://drive.google.com/..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => onApply(resumeLink)}
            disabled={isApplying || !resumeLink}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isApplying ? <Loader2 size={20} className="animate-spin" /> : 'Confirm & Submit Application'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ProgressTracker = ({ rounds }) => {
  return (
    <div className="mt-6 pt-6 border-t border-slate-100">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">Recruitment Progress</p>
      <div className="flex flex-col gap-4">
        {rounds.map((round, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="relative flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                round.status === 'completed' ? 'bg-emerald-500 text-white' : 
                round.status === 'current' ? 'bg-blue-500 text-white animate-pulse' : 
                'bg-slate-200 text-slate-500'
              }`}>
                {round.status === 'completed' ? <CheckCircle2 size={14} /> : idx + 1}
              </div>
              {idx !== rounds.length - 1 && (
                <div className={`w-[2px] h-6 absolute top-6 ${
                  round.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-200'
                }`} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-bold ${round.status === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>
                  {round.name}
                </p>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  round.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 
                  round.status === 'current' ? 'bg-blue-50 text-blue-600' : 
                  'text-slate-300'
                }`}>
                  {round.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

const PlacementOpportunities = () => {
  const { user } = useAuth();
  const [drives, setDrives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(null);
  const [message, setMessage] = useState(null);
  
  // Track applied drives and their status
  const [applications, setApplications] = useState({});
  const [selectedDrive, setSelectedDrive] = useState(null);

  const fetchDrives = async () => {
    try {
      setIsLoading(true);
      const data = await placementService.getDrives();
      setDrives(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const handleApplyClick = (drive) => {
    if (applications[drive.id]) return;
    setSelectedDrive(drive);
  };

  const submitApplication = async (resumeLink) => {
    if (!user || !selectedDrive) return;
    setIsApplying(selectedDrive.id);
    setMessage(null);
    try {
      const response = await placementService.applyForDrive(user.id, selectedDrive.id, { resumeLink });
      setApplications(prev => ({
        ...prev,
        [selectedDrive.id]: response.applicationData
      }));
      setMessage({ text: `Successfully applied to ${selectedDrive.companyName}!`, type: 'success' });
      setSelectedDrive(null);
    } catch (err) {
      setMessage({ text: err.message || 'Failed to apply', type: 'error' });
    } finally {
      setIsApplying(null);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Placement Opportunities</h1>
          <p className="text-slate-500 mt-1">Explore and apply for recruitment drives matching your profile.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-3">
            <ShieldCheck className="text-emerald-600" size={20} />
            <div>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Eligibility Status</p>
              <p className="text-xs font-bold text-slate-700">CGPA: {user?.cgpaLevel || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`p-4 rounded-2xl border flex items-center gap-3 shadow-lg fixed top-6 left-1/2 -translate-x-1/2 z-[100] min-w-[300px] ${
              message.type === 'success' ? 'bg-white border-emerald-100 text-emerald-700' : 'bg-white border-rose-100 text-rose-700'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 size={20} className="text-emerald-500" /> : <AlertCircle size={20} className="text-rose-500" />}
            <p className="font-bold text-sm">{message.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Loader2 className="animate-spin mb-4 text-blue-500" size={40} />
              <p className="font-medium">Finding opportunities for you...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {drives.map((drive) => {
                const application = applications[drive.id];
                return (
                  <motion.div 
                    layout
                    key={drive.id} 
                    className={`bg-white p-6 md:p-8 rounded-3xl border transition-all group ${
                      application ? 'border-emerald-100 shadow-emerald-100/20 shadow-xl' : 'border-slate-200 shadow-sm hover:shadow-xl'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex items-start gap-5">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-colors shrink-0 ${
                          application ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-100 group-hover:bg-blue-50'
                        }`}>
                          <Building2 size={32} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-xl font-bold text-slate-900">{drive.companyName}</h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              application ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {application ? 'Applied' : drive.tier}
                            </span>
                          </div>
                          <p className="text-slate-500 font-medium">{drive.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="flex items-center gap-1 text-emerald-600 font-bold">
                          <Coins size={18} className="text-emerald-500" />
                          <span className="text-xl">{drive.package}</span>
                        </div>
                        {application ? (
                          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                            <Clock size={14} />
                            Applied on {application.appliedAt.toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">
                            Apply by {drive.lastDateToApply.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {!application && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-8 py-6 border-y border-slate-50">
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Location</p>
                          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                            <MapPin size={16} className="text-slate-300" />
                            {drive.location}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Drive Date</p>
                          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                            <Calendar size={16} className="text-slate-300" />
                            {drive.driveDate.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Min CGPA</p>
                          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                            <CheckCircle2 size={16} className="text-slate-300" />
                            {drive.minCGPA}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-6">
                      <div className="flex flex-wrap gap-2">
                        {drive.allowedDepartments.map((dept, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-bold border border-slate-100">
                            {dept}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleApplyClick(drive)}
                        disabled={!!application}
                        className={`px-8 py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2 min-w-[160px] ${
                          application 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95'
                        }`}
                      >
                        {application ? (
                          <><CheckCircle2 size={18} /> Applied</>
                        ) : (
                          <>Apply Now <ChevronRight size={18} /></>
                        )}
                      </button>
                    </div>

                    {/* Round Tracker - Shown only after applying */}
                    {application && (
                      <ProgressTracker rounds={application.rounds} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Info size={24} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold">Application Guide</h3>
            </div>
            <div className="space-y-8">
              <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-500/30">
                <h4 className="text-sm font-bold text-blue-400 mb-1">Process Overview</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  After applying, your dashboard will update with a round-by-round progress tracker.
                </p>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-emerald-500/30">
                <h4 className="text-sm font-bold text-emerald-400 mb-1">Updates & Alerts</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You will receive real-time updates when you are cleared for the next recruitment round.
                </p>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-amber-500/30">
                <h4 className="text-sm font-bold text-amber-400 mb-1">Selection Finality</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Once Selected, you may be restricted from applying to further drives depending on policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApplicationForm 
        isOpen={!!selectedDrive}
        drive={selectedDrive || {}}
        onClose={() => setSelectedDrive(null)}
        onApply={submitApplication}
        isApplying={isApplying === selectedDrive?.id}
      />
    </div>
  );
};

// --- App Entry Point ---

export default function App() {
  const [user] = useState({
    id: 'user_123',
    name: 'Jane Doe',
    cgpaLevel: '9.2 / 10.0',
    department: 'CSE'
  });

  return (
    <AuthContext.Provider value={{ user }}>
      <PlacementOpportunities />
    </AuthContext.Provider>
  );
} 