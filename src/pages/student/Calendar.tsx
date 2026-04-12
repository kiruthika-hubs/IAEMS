import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const StudentCalendar: React.FC = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Mock events
  const events = [
    { day: 15, type: 'exam', title: 'Math Exam' },
    { day: 17, type: 'exam', title: 'Physics Exam' },
    { day: 10, type: 'event', title: 'Tech Symposium' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Academic Calendar</h1>
          <p className="text-slate-500">Track your exams, events, and important academic dates.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronLeft size={20} /></button>
          <span className="font-bold text-slate-900 px-4">{month} {year}</span>
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-100">
            {days.map(day => (
              <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {[...Array(35)].map((_, i) => {
              const dayNum = i - 2; // Offset for May 2024
              const event = events.find(e => e.day === dayNum);
              
              return (
                <div key={i} className="min-h-[120px] p-2 border-r border-b border-slate-50 last:border-r-0 group hover:bg-slate-50 transition-all">
                  {dayNum > 0 && dayNum <= 31 && (
                    <>
                      <span className={`inline-flex items-center justify-center w-7 h-7 text-sm font-bold rounded-lg ${dayNum === date.getDate() ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>
                        {dayNum}
                      </span>
                      {event && (
                        <div className={`mt-2 p-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tighter ${event.type === 'exam' ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-blue-100 text-blue-600 border border-blue-200'}`}>
                          {event.title}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span className="text-sm text-slate-600 font-medium">Examinations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-slate-600 font-medium">College Events</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span className="text-sm text-slate-600 font-medium">Holidays</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon size={20} className="text-blue-400" />
              <h3 className="font-bold">Summary</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              You have <span className="text-white font-bold">3 exams</span> and <span className="text-white font-bold">1 event</span> scheduled for this month.
            </p>
            <button className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-bold transition-all">
              Sync to Google Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCalendar;
