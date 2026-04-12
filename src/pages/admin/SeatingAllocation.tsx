import React, { useState } from 'react';
import { Grid, Sparkles, Download, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const SeatingAllocation: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowTable(true);
    }, 2000);
  };

  const mockData = [
    { student: 'John Student', reg: 'REG12345', room: 'LH-101', bench: 'A-12' },
    { student: 'Jane Doe', reg: 'REG12346', room: 'LH-101', bench: 'A-13' },
    { student: 'Alex Smith', reg: 'REG12347', room: 'LH-101', bench: 'A-14' },
    { student: 'Sarah Connor', reg: 'REG12348', room: 'LH-102', bench: 'B-01' },
    { student: 'Mike Ross', reg: 'REG12349', room: 'LH-102', bench: 'B-02' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Seating Allocation</h1>
          <p className="text-slate-500">Automated seating plan generator for examinations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Sparkles size={18} />
            )}
            Generate Seating Plan
          </button>
        </div>
      </div>

      {isGenerating && (
        <div className="bg-blue-50 border border-blue-100 p-12 rounded-3xl flex flex-col items-center justify-center text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6"
          >
            <Grid size={32} />
          </motion.div>
          <h3 className="text-xl font-bold text-blue-900">Generating Optimal Seating Plan...</h3>
          <p className="text-blue-600 mt-2">Our algorithm is processing student data and room capacities.</p>
        </div>
      )}

      {showTable && !isGenerating && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Search by student or room..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none" />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl">
              <Filter size={20} />
              Filter by Room
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-bold text-slate-700">Student Name</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700">Register No.</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700">Room</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700">Bench No.</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockData.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.student}</td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-sm">{item.reg}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">{item.room}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">{item.bench}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-emerald-600">Assigned</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SeatingAllocation;
