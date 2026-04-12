import React from 'react';
import { MapPin, Grid, Info } from 'lucide-react';

const StudentSeating: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Seating Arrangement</h1>
        <p className="text-slate-500">Find your assigned room and bench for upcoming exams.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Current Assignment</h3>
              <p className="text-sm text-slate-500">Next Exam: Mathematics IV</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Room Number</p>
              <p className="text-3xl font-black text-blue-600">LH-101</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bench Number</p>
              <p className="text-3xl font-black text-blue-600">A-12</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-sm text-blue-700">
            <Info size={20} className="shrink-0" />
            <p>Please arrive at your assigned room at least 15 minutes before the exam start time.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
              <Grid size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Room Layout</h3>
          </div>
          
          <div className="aspect-square bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-8">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${i === 4 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-white text-slate-300 border border-slate-200'}`}
                >
                  {i === 4 ? 'YOU' : i + 1}
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Entrance / Board</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSeating;
