import React, { useState } from 'react';
import StatCard from '../../components/StatCard';
import { Users, FileText, Calendar, DoorOpen, Database, Loader2, CheckCircle2 } from 'lucide-react';
import { examService, roomService, eventService } from '../../services/dataService';

const AdminDashboard: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const initializeSampleData = async () => {
    setIsInitializing(true);
    setInitStatus('idle');
    try {
      // Add a sample exam
      await examService.addExam({
        title: "Mid-Term Examination",
        courseCode: "CS101",
        courseName: "Introduction to Computer Science",
        date: new Date(),
        time: "09:00 AM",
        type: "internal",
        status: "upcoming"
      });

      // Add a sample room
      await roomService.addRoom({
        roomNumber: "LH-101",
        block: "Main Block",
        capacity: 60,
        availableSeats: 60,
        facilities: ["Projector", "AC"]
      });

      setInitStatus('success');
      setTimeout(() => setInitStatus('idle'), 3000);
    } catch (error) {
      console.error("Initialization error:", error);
      setInitStatus('error');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">System overview and management control center.</p>
        </div>
        <button 
          onClick={initializeSampleData}
          disabled={isInitializing}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            initStatus === 'success' ? 'bg-emerald-100 text-emerald-600' :
            initStatus === 'error' ? 'bg-red-100 text-red-600' :
            'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isInitializing ? <Loader2 className="animate-spin" size={18} /> : 
           initStatus === 'success' ? <CheckCircle2 size={18} /> : 
           <Database size={18} />}
          {isInitializing ? 'Initializing...' : 
           initStatus === 'success' ? 'Data Initialized' : 
           initStatus === 'error' ? 'Init Failed' :
           'Initialize Sample Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="1,240" 
          icon={Users} 
          color="bg-blue-600" 
          trend={{ value: '12%', isUp: true }}
        />
        <StatCard 
          title="Total Exams" 
          value="48" 
          icon={FileText} 
          color="bg-violet-600" 
        />
        <StatCard 
          title="Pending Events" 
          value="7" 
          icon={Calendar} 
          color="bg-amber-600" 
          trend={{ value: '3', isUp: false }}
        />
        <StatCard 
          title="Total Rooms" 
          value="32" 
          icon={DoorOpen} 
          color="bg-emerald-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { user: 'Alice Admin', action: 'Created new exam schedule', time: '10 mins ago' },
              { user: 'Bob Seating', action: 'Generated seating plan for LH-101', time: '45 mins ago' },
              { user: 'Charlie Club', action: 'Submitted event proposal: Tech Symposium', time: '2 hours ago' },
              { user: 'System', action: 'Automated database backup completed', time: '5 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{activity.user}</p>
                    <p className="text-xs text-slate-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl text-white">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all">Add New User</button>
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all">Schedule Exam</button>
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all">Approve Events</button>
            <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold transition-all">Generate Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
