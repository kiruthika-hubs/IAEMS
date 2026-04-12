import React from 'react';
import { Download, Printer, Search } from 'lucide-react';

const SeatingChart: React.FC = () => {
  const rooms = ['LH-101', 'LH-102', 'AUD-1', 'LAB-3'];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Seating Chart</h1>
          <p className="text-slate-500">Visual representation of seating arrangements by room.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
            <Printer size={18} />
            Print Charts
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input type="text" placeholder="Search student or room..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none" />
        </div>
        <select className="px-4 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl outline-none">
          {rooms.map(room => <option key={room}>{room}</option>)}
        </select>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900">Room: LH-101</h3>
          <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">Capacity: 60/60</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="aspect-square p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bench {i + 1}</span>
              <p className="text-xs font-bold text-slate-700 group-hover:text-blue-600">REG123{45 + i}</p>
              <p className="text-[10px] text-slate-400 mt-1 truncate w-full">Student Name</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-12">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span className="text-sm text-slate-500 font-medium">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-slate-200 rounded"></div>
            <span className="text-sm text-slate-500 font-medium">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-100 border border-rose-200 rounded"></div>
            <span className="text-sm text-slate-500 font-medium">Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;
