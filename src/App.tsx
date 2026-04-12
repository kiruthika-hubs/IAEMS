import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AlertCircle } from 'lucide-react';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import Syllabus from './pages/student/Syllabus';
import StudentExams from './pages/student/Dashboard'; // Reusing dashboard for now or create separate
import HallTicket from './pages/student/HallTicket';
import Seating from './pages/student/Seating';
import CalendarPage from './pages/student/Calendar';
import StudentCertificates from './pages/student/Certificates';
import PlacementOpportunities from './pages/student/PlacementOpportunities';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UsersPage from './pages/admin/Users';
import AdminEvents from './pages/admin/Events';
import AdminSyllabus from './pages/admin/Syllabus';
import AdminExams from './pages/admin/Exams';
import SeatingAllocation from './pages/admin/SeatingAllocation';
import Analytics from './pages/admin/Analytics';
import CertificateAnalytics from './pages/admin/CertificateAnalytics';
import PlacementDrives from './pages/admin/PlacementDrives';

// Seating Manager Pages
import RoomsPage from './pages/seating/Rooms';

// Club Pages
import ClubProfile from './pages/club/Profile';
import CreateEvent from './pages/club/CreateEvent';
import MyEvents from './pages/club/MyEvents';

const AppRoutes = () => {
  const { user, isLoading, authError, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading IAEMS...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Authentication Error</h1>
          <p className="text-slate-600 mb-8">{authError}</p>
          <button 
            onClick={() => logout()}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key={user?.id || 'guest'} className="min-h-screen">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<RootRedirect />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/certificates" element={<ProtectedRoute allowedRoles={['student']}><StudentCertificates /></ProtectedRoute>} />
          <Route path="/student/placements" element={<ProtectedRoute allowedRoles={['student']}><PlacementOpportunities /></ProtectedRoute>} />
          <Route path="/student/syllabus" element={<ProtectedRoute allowedRoles={['student']}><Syllabus /></ProtectedRoute>} />
          <Route path="/student/exams" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/hall-ticket" element={<ProtectedRoute allowedRoles={['student']}><HallTicket /></ProtectedRoute>} />
          <Route path="/student/seating" element={<ProtectedRoute allowedRoles={['student']}><Seating /></ProtectedRoute>} />
          <Route path="/student/calendar" element={<ProtectedRoute allowedRoles={['student']}><CalendarPage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/certificate-analytics" element={<ProtectedRoute allowedRoles={['admin']}><CertificateAnalytics /></ProtectedRoute>} />
          <Route path="/admin/placements" element={<ProtectedRoute allowedRoles={['admin']}><PlacementDrives /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UsersPage /></ProtectedRoute>} />
          <Route path="/admin/syllabus" element={<ProtectedRoute allowedRoles={['admin']}><AdminSyllabus /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute allowedRoles={['admin']}><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={['admin']}><AdminExams /></ProtectedRoute>} />
          <Route path="/admin/rooms" element={<ProtectedRoute allowedRoles={['admin']}><RoomsPage /></ProtectedRoute>} />
          <Route path="/admin/seating" element={<ProtectedRoute allowedRoles={['admin']}><SeatingAllocation /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><Analytics /></ProtectedRoute>} />

          {/* Seating Manager Routes */}
          <Route path="/seating/rooms" element={<ProtectedRoute allowedRoles={['seating', 'admin']}><RoomsPage /></ProtectedRoute>} />
          <Route path="/seating/allocation" element={<ProtectedRoute allowedRoles={['seating', 'admin']}><SeatingAllocation /></ProtectedRoute>} />
          <Route path="/seating/chart" element={<ProtectedRoute allowedRoles={['seating', 'admin']}><SeatingAllocation /></ProtectedRoute>} />

          {/* Club Routes */}
          <Route path="/club" element={<ProtectedRoute allowedRoles={['club']}><ClubProfile /></ProtectedRoute>} />
          <Route path="/club/create-event" element={<ProtectedRoute allowedRoles={['club']}><CreateEvent /></ProtectedRoute>} />
          <Route path="/club/my-events" element={<ProtectedRoute allowedRoles={['club']}><MyEvents /></ProtectedRoute>} />
          <Route path="/club/calendar" element={<ProtectedRoute allowedRoles={['club']}><CalendarPage /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const RootRedirect = () => {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'student': return <Navigate to="/student" replace />;
    case 'admin': return <Navigate to="/admin" replace />;
    case 'seating': return <Navigate to="/seating/rooms" replace />;
    case 'club': return <Navigate to="/club" replace />;
    default:
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid User Role</h1>
          <p className="text-slate-600 mb-6">Your account does not have a valid role assigned ({user.role || 'none'}). Please contact support.</p>
          <button 
            onClick={() => logout()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
          >
            Sign Out
          </button>
        </div>
      );
  }
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
