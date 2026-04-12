import React from 'react';
import { Upload, FileText, Trash2, ExternalLink } from 'lucide-react';

const AdminSyllabus: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Syllabus Management</h1>
          <p className="text-slate-500">Upload and manage academic curriculum files.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Upload New Syllabus</h3>
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Subject Name</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Quantum Physics" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Subject Code</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. PHY301" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Semester</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s}>Semester {s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">PDF File</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-all cursor-pointer group">
                  <Upload className="mx-auto text-slate-400 group-hover:text-blue-500 mb-2" size={32} />
                  <p className="text-xs text-slate-500 font-medium">Click to upload or drag and drop PDF</p>
                </div>
              </div>
              <button type="button" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
                Upload Syllabus
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Recent Uploads</h3>
          {[
            { name: 'Mathematics IV', code: 'MAT401', sem: '4', date: '2 days ago' },
            { name: 'Operating Systems', code: 'CS402', sem: '4', date: '5 days ago' },
            { name: 'Database Management', code: 'CS403', sem: '4', date: '1 week ago' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.code} • Semester {item.sem} • Uploaded {item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <ExternalLink size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSyllabus;
