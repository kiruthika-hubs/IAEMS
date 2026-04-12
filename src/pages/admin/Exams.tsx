import React from 'react';
import { Plus, Calendar, Clock, BookOpen, Trash2 } from 'lucide-react';

const AdminExams: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Exam Management</h1>
          <p className="text-slate-500">Schedule examinations and manage subject details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Schedule New Exam</h3>
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Subject</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Mathematics IV</option>
                  <option>Operating Systems</option>
                  <option>Database Management</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Exam Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="date" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="time" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Duration (Hrs)</label>
                  <input type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="3" />
                </div>
              </div>
              <button type="button" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                <Plus size={20} />
                Schedule Exam
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Scheduled Examinations</h3>
          {[
            { sub: 'Mathematics IV', code: 'MAT401', date: 'May 15, 2024', time: '10:00 AM' },
            { sub: 'Operating Systems', code: 'CS402', date: 'May 17, 2024', time: '02:00 PM' },
            { sub: 'Database Management', code: 'CS403', date: 'May 20, 2024', time: '10:00 AM' },
          ].map((exam, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{exam.sub}</h4>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar size={12} /> {exam.date}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12} /> {exam.time}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminExams;
