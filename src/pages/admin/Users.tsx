import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Filter, MoreVertical, Edit2, Trash2, GraduationCap, Loader2, CheckCircle2 } from 'lucide-react';
import { userService } from '../../services/userService';
import { User } from '../../types';

const UsersPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [cgpa, setCgpa] = useState<number>(0);
  const [arrears, setArrears] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateCGPA = async () => {
    if (!editingUser) return;
    setIsUpdating(true);
    try {
      await userService.updateStudentCGPA(editingUser.id, cgpa, arrears);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.registerNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage all students, faculty, and administrative staff.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
        >
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search users by name, email or register number..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-bold text-slate-700">User</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-700">Role</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-700">Register No.</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-700">CGPA / Arrears</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400">
                    <Loader2 className="animate-spin mx-auto mb-2" />
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      user.role === 'student' ? 'bg-blue-100 text-blue-600' :
                      user.role === 'admin' ? 'bg-rose-100 text-rose-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-sm">{user.registerNumber || '-'}</td>
                  <td className="px-6 py-4">
                    {user.role === 'student' ? (
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">CGPA: {user.cgpa?.toFixed(2) || '0.00'}</span>
                        <span className="text-[10px] text-rose-500 font-bold uppercase">Arrears: {user.arrears || 0}</span>
                      </div>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {user.role === 'student' && (
                        <button 
                          onClick={() => {
                            setEditingUser(user);
                            setCgpa(user.cgpa || 0);
                            setArrears(user.arrears || 0);
                          }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <GraduationCap size={18} />
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update CGPA Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Update Student Stats</h3>
              <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                <MoreVertical size={20} className="rotate-45" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-blue-600">
                  {editingUser.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{editingUser.name}</p>
                  <p className="text-xs text-slate-500">{editingUser.registerNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Current CGPA</label>
                  <input 
                    type="number" step="0.01" max="10" min="0"
                    value={cgpa}
                    onChange={(e) => setCgpa(parseFloat(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Current Arrears</label>
                  <input 
                    type="number" min="0"
                    value={arrears}
                    onChange={(e) => setArrears(parseInt(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setEditingUser(null)} className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
              <button 
                onClick={handleUpdateCGPA} 
                disabled={isUpdating}
                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                Update Stats
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
