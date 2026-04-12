import React from 'react';
import { Plus, DoorOpen, Users, LayoutGrid, Trash2 } from 'lucide-react';

const AdminRooms: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Room Management</h1>
          <p className="text-slate-500">Manage examination halls and classroom capacities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Add New Room</h3>
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Room Number / Name</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. LH-101" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Total Benches</label>
                  <input type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Capacity</label>
                  <input type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="60" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Block / Floor</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Main Block, 1st Floor" />
              </div>
              <button type="button" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                <Plus size={20} />
                Add Room
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'LH-101', capacity: 60, benches: 30, block: 'Main Block' },
            { name: 'LH-102', capacity: 50, benches: 25, block: 'Main Block' },
            { name: 'AUD-1', capacity: 100, benches: 50, block: 'Admin Block' },
            { name: 'LAB-3', capacity: 40, benches: 20, block: 'Science Block' },
          ].map((room, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <DoorOpen size={24} />
                </div>
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 size={18} />
                </button>
              </div>
              <h4 className="text-xl font-bold text-slate-900">{room.name}</h4>
              <p className="text-sm text-slate-500 mb-6">{room.block}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">{room.capacity} <span className="text-slate-400 font-normal">Cap.</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <LayoutGrid size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">{room.benches} <span className="text-slate-400 font-normal">Benches</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;
