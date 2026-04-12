import React from 'react';
import { Calendar, Clock, MapPin, MoreVertical, ExternalLink } from 'lucide-react';

const MyEvents: React.FC = () => {
  const events = [
    { id: '1', title: 'Tech Symposium 2024', date: 'June 10, 2024', time: '09:00 AM', venue: 'AUD-1', status: 'pending' },
    { id: '2', title: 'Coding Marathon', date: 'May 25, 2024', time: '10:00 AM', venue: 'LAB-3', status: 'approved' },
    { id: '3', title: 'Web Dev Workshop', date: 'April 15, 2024', time: '02:00 PM', venue: 'LH-101', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Club Events</h1>
        <p className="text-slate-500">Track the status and details of your club's event proposals.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                event.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                event.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                'bg-slate-100 text-slate-400'
              }`}>
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar size={14} className="text-slate-400" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock size={14} className="text-slate-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin size={14} className="text-slate-400" />
                    {event.venue}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                event.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                event.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                'bg-slate-100 text-slate-500'
              }`}>
                {event.status}
              </span>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <ExternalLink size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
