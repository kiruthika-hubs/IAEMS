import React from 'react';
import StudentCalendar from '../student/Calendar';

const ClubCalendar: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Club Event Calendar</h1>
        <p className="text-slate-500">View all approved events and academic schedules.</p>
      </div>
      <StudentCalendar />
    </div>
  );
};

export default ClubCalendar;
