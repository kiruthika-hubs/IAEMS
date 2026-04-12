import React from 'react';
import { Check, X, Calendar, User, Clock } from 'lucide-react';

const AdminEvents: React.FC = () => {
  const events = [
    { id: '1', title: 'Tech Symposium 2024', coordinator: 'Charlie Club', date: 'June 10, 2024', time: '09:00 AM', status: 'pending' },
    { id: '2', title: 'Annual Cultural Fest', coordinator: 'Jane Arts', date: 'June 15, 2024', time: '05:00 PM', status: 'pending' },
    { id: '3', title: 'Coding Marathon', coordinator: 'Dev Society', date: 'May 25, 2024', time: '10:00 AM', status: 'approved' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Event Approvals</h1>
        <p className="text-slate-500">Review and approve event proposals from various clubs and societies.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                event.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <User size={14} className="text-slate-400" />
                    {event.coordinator}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar size={14} className="text-slate-400" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock size={14} className="text-slate-400" />
                    {event.time}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {event.status === 'pending' ? (
                <>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-all">
                    <X size={18} />
                    Reject
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all">
                    <Check size={18} />
                    Approve
                  </button>
                </>
              ) : (
                <span className="px-4 py-2 bg-emerald-100 text-emerald-600 text-sm font-bold rounded-full flex items-center gap-2">
                  <Check size={16} />
                  Approved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
