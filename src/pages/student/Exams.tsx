import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Exams: React.FC = () => {
  const exams = [
    { id: '1', subject: 'Mathematics IV', code: 'MAT401', date: 'May 15, 2024', time: '10:00 AM - 01:00 PM', room: 'LH-101' },
    { id: '2', subject: 'Operating Systems', code: 'CS402', date: 'May 17, 2024', time: '02:00 PM - 05:00 PM', room: 'LH-102' },
    { id: '3', subject: 'Database Management', code: 'CS403', date: 'May 20, 2024', time: '10:00 AM - 01:00 PM', room: 'AUD-1' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Examination Schedule</h1>
        <p className="text-slate-500">Your upcoming semester examinations.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{exam.subject}</h3>
                <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">{exam.code}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 max-w-2xl">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Date</p>
                  <p className="text-sm font-semibold text-slate-700">{exam.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Time</p>
                  <p className="text-sm font-semibold text-slate-700">{exam.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Room</p>
                  <p className="text-sm font-semibold text-slate-700">{exam.room}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">Upcoming</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
