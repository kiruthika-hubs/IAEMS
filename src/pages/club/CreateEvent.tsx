import React from 'react';
import { Plus, Calendar, FileText, Upload, Info } from 'lucide-react';

const CreateEvent: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create New Event</h1>
        <p className="text-slate-500">Submit a proposal for your upcoming club event or workshop.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Event Title</label>
                <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. AI & Machine Learning Workshop" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Description</label>
                <textarea rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the event goals, target audience, and expected outcomes..."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Event Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type="date" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Expected Attendance</label>
                  <input type="number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="100" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Proposal Document (PDF)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-blue-400 transition-all cursor-pointer group bg-slate-50/50">
                  <Upload className="mx-auto text-slate-400 group-hover:text-blue-500 mb-4" size={48} />
                  <h4 className="font-bold text-slate-900 mb-1">Upload Proposal PDF</h4>
                  <p className="text-sm text-slate-500">Include budget details, speaker profiles, and agenda.</p>
                </div>
              </div>

              <button type="button" className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2">
                <Plus size={24} />
                Submit Proposal for Approval
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <Info size={24} className="text-blue-400" />
              <h3 className="text-lg font-bold">Approval Process</h3>
            </div>
            <ul className="space-y-6 relative">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-800"></div>
              {[
                { title: 'Submission', desc: 'Submit your detailed proposal' },
                { title: 'Admin Review', desc: 'Academic board reviews the content' },
                { title: 'Venue Check', desc: 'Availability of rooms is verified' },
                { title: 'Final Approval', desc: 'Event is added to the calendar' },
              ].map((step, i) => (
                <li key={i} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-900"></div>
                  <h4 className="text-sm font-bold">{step.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tips for Success</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={16} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Ensure your budget is detailed and realistic to speed up approval.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar size={16} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Submit at least 15 days before the planned event date.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
