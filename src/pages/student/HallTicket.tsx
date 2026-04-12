import React from 'react';
import QRCode from 'react-qr-code';
import { Download, Printer, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const HallTicket: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hall Ticket</h1>
          <p className="text-slate-500">Download or print your examination hall ticket.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">
            <Printer size={18} />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl">IA</div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Integrated Academic University</h2>
              <p className="text-slate-400 text-sm">Semester End Examination - May 2024</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-2 text-sm font-bold">
            <ShieldCheck size={16} />
            Verified Hall Ticket
          </div>
        </div>

        {/* Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Student Name</p>
                <p className="text-lg font-bold text-slate-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Register Number</p>
                <p className="text-lg font-bold text-slate-900">{user?.registerNumber || 'REG12345'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Department</p>
                <p className="text-lg font-bold text-slate-900">Computer Science</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Semester</p>
                <p className="text-lg font-bold text-slate-900">4th Semester</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Exam Details</h4>
              <div className="space-y-3">
                {[
                  { sub: 'Mathematics IV', date: '15/05/2024', room: 'LH-101', bench: 'A-12' },
                  { sub: 'Operating Systems', date: '17/05/2024', room: 'LH-102', bench: 'B-04' },
                  { sub: 'Database Systems', date: '20/05/2024', room: 'AUD-1', bench: 'C-22' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-700">{item.sub}</span>
                    <div className="flex gap-6 text-sm">
                      <span className="text-slate-500"><span className="font-bold text-slate-400">Date:</span> {item.date}</span>
                      <span className="text-slate-500"><span className="font-bold text-slate-400">Room:</span> {item.room}</span>
                      <span className="text-slate-500"><span className="font-bold text-slate-400">Bench:</span> {item.bench}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl border border-slate-100 h-fit">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
              <QRCode value={`IAEMS-${user?.registerNumber || 'REG12345'}`} size={160} />
            </div>
            <p className="text-center text-xs text-slate-400 font-medium leading-relaxed">
              Scan this QR code at the exam hall entrance for automated attendance verification.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-medium">
          <p>Generated on: {new Date().toLocaleDateString()}</p>
          <p>IAEMS Digital Verification System</p>
        </div>
      </div>
    </div>
  );
};

export default HallTicket;
