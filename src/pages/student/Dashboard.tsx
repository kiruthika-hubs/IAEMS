import React from 'react';
import StatCard from '../../components/StatCard';
import { FileText, Calendar, BookOpen, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening with your academics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Upcoming Exams" 
          value="3" 
          icon={FileText} 
          color="bg-blue-600" 
          trend={{ value: 'Next: May 15', isUp: true }}
        />
        <StatCard 
          title="Approved Events" 
          value="2" 
          icon={Calendar} 
          color="bg-emerald-600" 
        />
        <StatCard 
          title="Total Subjects" 
          value="6" 
          icon={BookOpen} 
          color="bg-violet-600" 
        />
        <StatCard 
          title="Seating Assigned" 
          value="Yes" 
          icon={MapPin} 
          color="bg-amber-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Announcements</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Exam Schedule Released</h4>
                  <p className="text-sm text-slate-500">The final semester examination schedule for May 2024 is now available.</p>
                  <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Project Submission</h4>
                    <p className="text-xs text-slate-500">Advanced Web Development</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-rose-100 text-rose-600 text-xs font-bold rounded-full">3 Days Left</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
