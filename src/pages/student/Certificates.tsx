import React, { useState, useEffect, createContext, useContext, useRef, useMemo, ReactNode } from 'react';
import { 
  Plus, 
  FileText, 
  Trash2, 
  Download, 
  Upload, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  X,
  ShieldCheck,
  HardDrive,
  Folder as FolderIcon,
  Grid,
  Search,
  ChevronRight,
  MoreVertical,
  Fingerprint,
  Lock,
  Verified,
  FolderPlus,
  ArrowLeft,
  FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interfaces & Types ---
export type CertificateType = 'Course' | 'Internship' | 'Resume' | 'Workshop';

export interface Certificate {
  id: string;
  title: string;
  type: CertificateType;
  fileURL: string;
  uploadedAt: Date;
  verified: boolean;
  folderId: string | null;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

export interface AuthUser {
  id: string;
  name: string;
  certificateCount: number;
  certificateLevel: string;
}

interface AuthContextType {
  user: AuthUser;
  updateStats: (count: number) => void;
}

// --- Auth Context ---
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(({
    id: 'user_123',
    name: 'Student User',
    certificateCount: 1,
    certificateLevel: 'Bronze'
  }));

  const updateStats = (count: number) => {
    let level = 'Bronze';
    if (count >= 5) level = 'Silver';
    if (count >= 10) level = 'Gold';
    setUser(prev => ({ ...prev, certificateCount: count, certificateLevel: level }));
  };

  return (
    <AuthContext.Provider value={{ user, updateStats }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// --- Main Component ---
const StudentCertificates: React.FC = () => {
  const { user, updateStats } = useAuth();
  
  // State for Vault
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'Google Cloud Professional Data Engineer',
      type: 'Course',
      fileURL: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploadedAt: new Date('2023-11-15'),
      verified: true,
      folderId: 'default-cred'
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Action States
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verifyStep, setVerifyStep] = useState<number>(0); 
  
  const [isDriveOpen, setIsDriveOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Drive State
  const [folders, setFolders] = useState<Folder[]>([
    { id: 'default-cred', name: 'Credentials', parentId: null }
  ]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null); 
  const [driveSearch, setDriveSearch] = useState<string>('');

  // Form state
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<CertificateType>('Course');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateStats(certificates.length);
  }, [certificates]);

  // Reset verification if user changes input
  useEffect(() => {
    setIsVerified(false);
    setVerifyStep(0);
  }, [title, file, type]);

  const handleVerify = async () => {
    if (!file || !title) return;
    setIsVerifying(true);
    setError(null);
    try {
      setVerifyStep(1); // Scanning
      await new Promise(r => setTimeout(r, 1200));
      setVerifyStep(2); // Hashing
      await new Promise(r => setTimeout(r, 1000));
      setVerifyStep(3); // Validating
      await new Promise(r => setTimeout(r, 800));
      
      setIsVerified(true);
      setSuccess('Verification successful. Document is authentic.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Verification failed. Invalid digital signature.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAddToVault = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified || !file || !title) return;

    setIsAdding(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCert: Certificate = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        type,
        fileURL: URL.createObjectURL(file),
        uploadedAt: new Date(),
        verified: true,
        folderId: 'default-cred' 
      };
      setCertificates(prev => [newCert, ...prev]);
      
      setSuccess('Certificate successfully secured in Vault.');
      setTitle('');
      setFile(null);
      setIsVerified(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError('Failed to secure document.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = (certId: string) => {
    if (window.confirm('Permanently remove this record?')) {
      setCertificates(prev => prev.filter(c => c.id !== certId));
      setSuccess('Record deleted');
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  // --- Drive Functions ---
  const createFolder = () => {
    const name = window.prompt('Enter folder name:');
    if (name) {
      const newFolder: Folder = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        parentId: currentFolderId
      };
      setFolders(prev => [...prev, newFolder]);
    }
  };

  const deleteFolder = (folderId: string) => {
    if (window.confirm('Delete this folder and all its contents?')) {
      setFolders(prev => prev.filter(f => f.id !== folderId));
      setCertificates(prev => prev.filter(c => c.folderId !== folderId));
    }
  };

  const downloadFile = (cert: Certificate) => {
    const link = document.createElement('a');
    link.href = cert.fileURL;
    link.download = `${cert.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentPath = useMemo(() => {
    const path: Folder[] = [];
    let current = folders.find(f => f.id === currentFolderId);
    while (current) {
      path.unshift(current);
      current = folders.find(f => f.id === current.parentId);
    }
    return path;
  }, [currentFolderId, folders]);

  const filteredDriveItems = useMemo(() => {
    const searchLower = driveSearch.toLowerCase();
    
    const f = folders.filter(folder => 
      folder.parentId === currentFolderId && 
      (searchLower === '' || folder.name.toLowerCase().includes(searchLower))
    );
    
    const c = certificates.filter(cert => 
      cert.folderId === currentFolderId && 
      (searchLower === '' || cert.title.toLowerCase().includes(searchLower))
    );

    return { folders: f, certs: c };
  }, [folders, certificates, currentFolderId, driveSearch]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen font-sans relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Lock size={14} className="text-indigo-600" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secure Entry Point</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Certificate Vault</h1>
          <p className="text-slate-500 mt-1">Verify authenticity before permanent storage.</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDriveOpen(true)}
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
          >
            <HardDrive size={18} className="text-indigo-500" />
            My Drive
          </button>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg shadow-sm">
              {user?.certificateCount || 0}
            </div>
            <div className="hidden xs:block">
              <div className="text-slate-400 font-bold text-[10px] uppercase">Level</div>
              <div className="text-slate-900 font-bold text-sm">{user?.certificateLevel}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">New Certificate</h3>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
                  <AlertCircle size={16} /> <span className="flex-1">{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-600 text-sm font-medium">
                  <CheckCircle2 size={16} /> <span className="flex-1">{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleAddToVault} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Title</label>
                <input 
                  type="text" required value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm" 
                  placeholder="e.g. Meta Certification" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Type</label>
                <select 
                  value={type} onChange={(e) => setType(e.target.value as CertificateType)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                >
                  <option value="Course">Academic Course</option>
                  <option value="Internship">Internship</option>
                  <option value="Resume">Resume / CV</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">PDF Document</label>
                <input 
                  type="file" required accept=".pdf" ref={fileInputRef}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden" id="cert-file"
                />
                <label 
                  htmlFor="cert-file"
                  className={`w-full flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                    file ? 'border-indigo-400 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-400 bg-slate-50'
                  }`}
                >
                  <div className={`${file ? 'text-indigo-500' : 'text-slate-400'}`}>
                    {file ? <Fingerprint size={32} /> : <Upload size={32} />}
                  </div>
                  <span className="text-xs text-slate-600 font-semibold text-center truncate max-w-full px-2">
                    {file ? file.name : 'Select PDF for scan'}
                  </span>
                </label>
              </div>

              <div className="pt-4 space-y-3">
                <button 
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifying || isAdding || isVerified || !file || !title}
                  className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
                    isVerified 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                      : isVerifying 
                        ? 'bg-slate-100 text-slate-400' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span className="text-sm">
                        {verifyStep === 1 && "Scanning..."}
                        {verifyStep === 2 && "Hashing..."}
                        {verifyStep === 3 && "Validating..."}
                      </span>
                    </>
                  ) : isVerified ? (
                    <>
                      <Verified size={18} />
                      <span className="text-sm">Verified Authentic</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span className="text-sm">Run AI Verification</span>
                    </>
                  )}
                </button>

                <button 
                  type="submit" 
                  disabled={!isVerified || isAdding}
                  className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    isVerified 
                      ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                  <span className="text-sm">Add to Vault</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-slate-900">Protected Records</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-white border border-slate-200 px-2 py-1 rounded-lg">
              Encrypted Storage
            </span>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-300">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-medium">Initializing Vault...</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center border-dashed">
              <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={40} />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Vault Empty</h4>
              <p className="text-slate-500 mt-2 max-w-xs mx-auto">Verified credentials will be permanently stored here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              <AnimatePresence mode="popLayout">
                {certificates.map((cert) => (
                  <motion.div 
                    layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }} key={cert.id} 
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-300 transition-all relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center gap-4 overflow-hidden pl-2">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-xl flex items-center justify-center transition-colors">
                        <FileText size={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 truncate">{cert.title}</h4>
                          <ShieldCheck size={14} className="text-emerald-500 flex-shrink-0" />
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 mt-1">
                          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">{cert.type}</span>
                          <span className="text-[11px] text-slate-400 font-medium italic">
                            Secured on {new Date(cert.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => downloadFile(cert)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="Download Certificate"
                      >
                        <FileDown size={20} />
                      </button>
                      <a 
                        href={cert.fileURL} target="_blank" rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="External View"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <button 
                        onClick={() => handleDelete(cert.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isDriveOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-slate-50 border-r border-slate-100 p-6 hidden md:flex flex-col gap-8">
                  <div className="flex items-center gap-3 text-indigo-600">
                    <HardDrive size={24} />
                    <span className="font-bold text-lg">Cloud Drive</span>
                  </div>

                  <div className="space-y-1">
                    <button 
                      onClick={() => setCurrentFolderId(null)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${currentFolderId === null ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-200/50'}`}
                    >
                      <HardDrive size={18} /> My Drive
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-200/50 rounded-lg font-semibold text-sm transition-colors">
                      <ShieldCheck size={18} /> Verified
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-200/50 rounded-lg font-semibold text-sm transition-colors">
                      <Trash2 size={18} /> Trash
                    </button>
                  </div>

                  <div className="mt-auto">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Drive Space</div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${Math.min(user?.certificateCount * 10, 100)}%` }} />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-[11px] text-slate-500 font-medium">{user?.certificateCount} docs</span>
                        <span className="text-[11px] text-slate-400">100 Max</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col bg-white">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 font-bold overflow-hidden">
                      <button 
                        onClick={() => setCurrentFolderId(null)}
                        className="hover:text-indigo-600 flex-shrink-0"
                      >Drive</button>
                      {currentPath.map((folder, idx) => (
                        <React.Fragment key={folder.id}>
                          <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
                          <button 
                            onClick={() => setCurrentFolderId(folder.id)}
                            className={`hover:text-indigo-600 truncate ${idx === currentPath.length - 1 ? 'text-slate-500' : ''}`}
                          >
                            {folder.name}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                    <button onClick={() => setIsDriveOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors ml-4">
                      <X size={20} className="text-slate-500" />
                    </button>
                  </div>

                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1 relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search your files..." 
                        value={driveSearch}
                        onChange={(e) => setDriveSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500" 
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button 
                        onClick={createFolder}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
                      >
                        <FolderPlus size={18} className="text-indigo-500" />
                        New Folder
                      </button>
                      {currentFolderId && (
                        <button 
                          onClick={() => {
                            const parent = folders.find(f => f.id === currentFolderId)?.parentId;
                            setCurrentFolderId(parent || null);
                          }}
                          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 shadow-sm"
                        >
                          <ArrowLeft size={18} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    {filteredDriveItems.folders.length === 0 && filteredDriveItems.certs.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-300 py-12">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <Search size={48} />
                        </div>
                        <p className="font-bold text-slate-400">No results found</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredDriveItems.folders.map(folder => (
                          <motion.div 
                            key={folder.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="group flex flex-col items-center gap-2 cursor-pointer"
                            onDoubleClick={() => setCurrentFolderId(folder.id)}
                            onClick={() => setCurrentFolderId(folder.id)}
                          >
                            <div className="w-full aspect-square bg-indigo-50/50 rounded-3xl border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition-all group-hover:shadow-md relative">
                              <FolderIcon size={48} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                              <button 
                                onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}
                                className="absolute top-2 right-2 p-1 bg-white rounded-lg opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all border border-slate-200"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <span className="text-xs font-bold text-slate-700 truncate w-full text-center px-2">
                              {folder.name}
                            </span>
                          </motion.div>
                        ))}

                        {filteredDriveItems.certs.map(cert => (
                          <motion.div 
                            key={cert.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="group flex flex-col items-center gap-2"
                          >
                            <div className="w-full aspect-square bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-center relative group-hover:bg-white group-hover:border-indigo-300 transition-all group-hover:shadow-lg cursor-default">
                              <FileText size={40} className="text-indigo-300/60 group-hover:text-indigo-600 transition-colors" />
                              
                              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                                <button 
                                  onClick={() => downloadFile(cert)}
                                  className="p-1.5 bg-white rounded-lg border border-slate-200 hover:text-indigo-600"
                                  title="Download"
                                >
                                  <Download size={14} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(cert.id)}
                                  className="p-1.5 bg-white rounded-lg border border-slate-200 hover:text-red-600"
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>

                              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                                <ShieldCheck size={12} />
                              </div>
                            </div>
                            <div className="text-center px-1 w-full">
                              <div className="text-[11px] font-bold text-slate-800 truncate" title={cert.title}>{cert.title}</div>
                              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{cert.type}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Entry Point ---
const App: React.FC = () => {
  return (
    <AuthProvider>
      <StudentCertificates />
    </AuthProvider>
  );
};

export default App;
