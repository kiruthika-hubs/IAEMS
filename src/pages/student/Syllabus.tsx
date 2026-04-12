import React from 'react';
import { Download, Eye, FileText } from 'lucide-react';

const Syllabus: React.FC = () => {
  const subjects = [
    { id: '1', name: 'Mathematics IV', code: 'MAT401', semester: '4' },
    { id: '2', name: 'Operating Systems', code: 'CS402', semester: '4' },
    { id: '3', name: 'Database Management', code: 'CS403', semester: '4' },
    { id: '4', name: 'Software Engineering', code: 'CS404', semester: '4' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Academic Syllabus</h1>
          <p className="text-slate-500">View and download syllabus for your current semester.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Subject</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Code</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Semester</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={18} />
                      </div>
                      <span className="font-medium text-slate-900">{subject.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-sm">{subject.code}</td>
                  <td className="px-6 py-4 text-slate-600">{subject.semester}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Download">
                        <Download size={18} />
                      </button>
                      <button className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all">
                        Generate Notes
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;
