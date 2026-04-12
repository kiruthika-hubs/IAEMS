import React from 'react';
import AdminRooms from '../admin/Rooms';

const SeatingRooms: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Room Management</h1>
        <p className="text-slate-500">Add and manage examination rooms for seating allocation.</p>
      </div>
      <AdminRooms />
    </div>
  );
};

export default SeatingRooms;
