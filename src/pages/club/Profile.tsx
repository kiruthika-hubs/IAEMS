import React from 'react';
import { User, Mail, Shield, Calendar, Edit2, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ClubProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-black/10"></div>
        <button className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all">
          <Camera size={20} />
        </button>
      </div>

      <div className="px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
          <div className="w-32 h-32 bg-white p-2 rounded-3xl shadow-xl">
            <div className="w-full h-full bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black text-4xl border-4 border-white">
              {user?.name?.charAt(0)}
            </div>
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user?.name}</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Shield size={16} className="text-blue-600" />
              Club Coordinator • Tech Society
            </p>
          </div>
          <button className="mb-2 flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Edit2 size={18} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Email</p>
                    <p className="text-sm font-bold text-slate-700">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Member ID</p>
                    <p className="text-sm font-bold text-slate-700">COORD-2024-001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl text-white">
              <h3 className="text-lg font-bold mb-4">Club Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800 rounded-2xl">
                  <p className="text-2xl font-black text-blue-400">12</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Events Done</p>
                </div>
                <div className="p-4 bg-slate-800 rounded-2xl">
                  <p className="text-2xl font-black text-emerald-400">450</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Attendees</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">About the Club</h3>
              <p className="text-slate-600 leading-relaxed">
                The Tech Society is dedicated to fostering innovation and technical excellence among students. We organize workshops, hackathons, and symposiums to bridge the gap between academic learning and industry requirements.
              </p>
              
              <h4 className="text-sm font-bold text-slate-900 mt-8 mb-4 uppercase tracking-wider">Upcoming Milestones</h4>
              <div className="space-y-4">
                {[
                  { title: 'Annual Tech Fest', date: 'June 10', progress: 65 },
                  { title: 'Coding Workshop', date: 'May 25', progress: 90 },
                ].map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-slate-700">{m.title}</span>
                      <span className="text-blue-600">{m.date}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${m.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600">
                      <Calendar size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">Event Proposal Submitted</p>
                      <p className="text-xs text-slate-500">Tech Symposium 2024 proposal sent for approval.</p>
                    </div>
                    <span className="text-xs text-slate-400">Yesterday</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
