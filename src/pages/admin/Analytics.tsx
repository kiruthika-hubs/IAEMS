import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance %',
        data: [85, 88, 92, 90, 94, 95],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Avg Marks %',
        data: [72, 75, 78, 76, 82, 85],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Math', 'Physics', 'CS', 'English', 'History', 'Bio'],
    datasets: [
      {
        label: 'Pass Rate',
        data: [92, 88, 95, 98, 90, 93],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ['Present', 'Absent', 'On Leave'],
    datasets: [
      {
        data: [850, 120, 30],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Academic Analytics</h1>
        <p className="text-slate-500">Data-driven insights into student performance and attendance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Avg Attendance', value: '92.4%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Active Students', value: '1,120', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'Pass Percentage', value: '88.2%', icon: Award, color: 'text-violet-600', bg: 'bg-violet-50' },
          { title: 'Avg Study Time', value: '6.4h', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Attendance vs Performance Trends</h3>
          <div className="h-[300px]">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Subject-wise Pass Rates</h3>
          <div className="h-[300px]">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Daily Attendance Split</h3>
          <div className="h-[250px] flex items-center justify-center">
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-3xl text-white">
          <h3 className="text-lg font-bold mb-6">Top Performing Departments</h3>
          <div className="space-y-6">
            {[
              { name: 'Computer Science', score: 94, color: 'bg-blue-500' },
              { name: 'Mechanical Engineering', score: 82, color: 'bg-emerald-500' },
              { name: 'Electrical Engineering', score: 78, color: 'bg-amber-500' },
              { name: 'Civil Engineering', score: 72, color: 'bg-rose-500' },
            ].map((dept, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{dept.name}</span>
                  <span>{dept.score}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${dept.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full ${dept.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
