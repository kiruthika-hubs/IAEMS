import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  Timestamp, 
  doc, 
  getDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { PlacementDrive, Application, User, Certificate } from '../types';

/**
 * Placement Service
 */
export const placementService = {
  // Admin: Create Drive
  createDrive: async (driveData: Omit<PlacementDrive, 'id' | 'createdAt'>) => {
    const drivesRef = collection(db, 'placementDrives');
    return await addDoc(drivesRef, {
      ...driveData,
      createdAt: Timestamp.now()
    });
  },

  // Admin & Student: Get Drives
  getDrives: async (onlyOpen: boolean = false) => {
    const drivesRef = collection(db, 'placementDrives');
    let q = query(drivesRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    let drives = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PlacementDrive[];

    if (onlyOpen) {
      const now = Timestamp.now();
      drives = drives.filter(d => 
        d.status === 'open' && 
        (d.lastDateToApply instanceof Timestamp ? d.lastDateToApply.toMillis() >= now.toMillis() : new Date(d.lastDateToApply).getTime() >= now.toMillis())
      );
    }

    return drives;
  },

  // Student: Apply for Drive
  applyForDrive: async (uid: string, driveId: string) => {
    // 1. Fetch student data
    const studentDoc = await getDoc(doc(db, 'users', uid));
    if (!studentDoc.exists()) throw new Error("Student not found");
    const student = { id: uid, ...studentDoc.data() } as User;

    // 2. Fetch drive data
    const driveDoc = await getDoc(doc(db, 'placementDrives', driveId));
    if (!driveDoc.exists()) throw new Error("Drive not found");
    const drive = { id: driveId, ...driveDoc.data() } as PlacementDrive;

    // 3. Prevent duplicate application
    const appsRef = collection(db, 'applications');
    const qDuplicate = query(appsRef, where('driveId', '==', driveId), where('studentId', '==', uid));
    const duplicateSnapshot = await getDocs(qDuplicate);
    if (!duplicateSnapshot.empty) throw new Error("You have already applied for this drive");

    // 4. Validate eligibility
    const cgpa = student.cgpa || 0;
    const arrears = student.arrears || 0;
    const dept = student.department || "";

    if (cgpa < drive.minCGPA) throw new Error(`Minimum CGPA required is ${drive.minCGPA}`);
    if (arrears > drive.maxArrears) throw new Error(`Maximum arrears allowed is ${drive.maxArrears}`);
    if (!drive.allowedDepartments.includes(dept)) throw new Error("Your department is not eligible for this drive");

    // 5. If Resume required, check if "Resume" certificate exists
    if (drive.requiredDocs.includes('Resume')) {
      const certsRef = collection(db, 'certificates');
      const qResume = query(certsRef, where('studentId', '==', uid), where('type', '==', 'Resume'));
      const resumeSnapshot = await getDocs(qResume);
      if (resumeSnapshot.empty) throw new Error("Please upload your Resume in the Certificate Vault before applying");
    }

    // 6. Create application
    return await addDoc(appsRef, {
      driveId,
      studentId: uid,
      status: 'Applied',
      appliedAt: Timestamp.now()
    });
  },

  // Admin: Get Applicants for a Drive
  getApplicants: async (driveId: string) => {
    const appsRef = collection(db, 'applications');
    const q = query(appsRef, where('driveId', '==', driveId));
    const querySnapshot = await getDocs(q);
    
    const applications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Application[];

    // Fetch student details for each application
    const applicantsWithDetails = await Promise.all(applications.map(async (app) => {
      const studentDoc = await getDoc(doc(db, 'users', app.studentId));
      return {
        ...app,
        student: studentDoc.exists() ? { id: studentDoc.id, ...studentDoc.data() } : null
      };
    }));

    return applicantsWithDetails;
  }
};
