import React from 'react';
import SeatingAllocation from '../admin/SeatingAllocation';

const SeatingAllocationManager: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Seating Allocation</h1>
        <p className="text-slate-500">Generate and manage seating plans for upcoming exams.</p>
      </div>
      <SeatingAllocation />
    </div>
  );
};

export default SeatingAllocationManager;
