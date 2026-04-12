import { Timestamp } from 'firebase/firestore';

export type UserRole = 'student' | 'admin' | 'seating' | 'club';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registerNumber?: string;
  department?: string;
  semester?: number;
  // Student specific fields for categorization
  cgpa?: number;
  arrears?: number;
  certificateCount?: number;
  certificateLevel?: 'High' | 'Medium' | 'Low';
  cgpaLevel?: 'Excellent' | 'Good' | 'Average';
}

export interface Exam {
  id?: string;
  title: string;
  courseCode: string;
  courseName: string;
  date: any; // Date or Timestamp
  time: string;
  type: 'internal' | 'external';
  status: 'upcoming' | 'completed';
}

export interface Room {
  id?: string;
  roomNumber: string;
  block: string;
  capacity: number;
  availableSeats: number;
  facilities: string[];
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  clubId: string;
  clubName: string;
  date: any;
  venue: string;
  status: 'pending' | 'approved' | 'rejected';
  posterUrl?: string;
}

export interface Syllabus {
  id?: string;
  courseCode: string;
  courseName: string;
  department: string;
  semester: number;
  units: {
    title: string;
    topics: string[];
  }[];
  fileUrl?: string;
}

export interface HallTicket {
  id?: string;
  studentId: string;
  studentName: string;
  registerNumber: string;
  examId: string;
  examTitle: string;
  seatingInfo: {
    roomNumber: string;
    seatNumber: string;
  };
  generatedAt: any;
}

export type CertificateType = 'Resume' | 'Internship' | 'Course' | 'Workshop' | 'Hackathon' | 'Other';

export interface Certificate {
  id?: string;
  studentId: string;
  title: string;
  type: CertificateType;
  fileURL: string;
  uploadedAt: any;
}

export interface PlacementDrive {
  id?: string;
  companyName: string;
  tier: string;
  package: string;
  role: string;
  location: string;
  driveDate: any;
  minCGPA: number;
  maxArrears: number;
  allowedDepartments: string[];
  requiredDocs: string[];
  lastDateToApply: any;
  description: string;
  status: 'open' | 'closed';
  createdAt: any;
}

export interface Application {
  id?: string;
  driveId: string;
  studentId: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected' | 'Selected';
  appliedAt: any;
}
