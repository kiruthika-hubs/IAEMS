import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  Timestamp, 
  deleteDoc, 
  doc, 
  updateDoc, 
  getDoc,
  getCountFromServer
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/firebaseConfig';
import { Certificate, CertificateType } from '../types';

/**
 * Certificate Service
 */
export const certificateService = {
  uploadCertificate: async (uid: string, file: File, title: string, type: CertificateType) => {
    // 1. Upload to Firebase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `certificates/${uid}/${fileName}`);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);

    // 2. Store metadata in Firestore
    const certificatesRef = collection(db, 'certificates');
    const newCert = await addDoc(certificatesRef, {
      studentId: uid,
      title,
      type,
      fileURL,
      uploadedAt: Timestamp.now()
    });

    // 3. Trigger auto-categorization
    await certificateService.updateStudentCategorization(uid);

    return newCert;
  },

  deleteCertificate: async (uid: string, certificateId: string, fileURL: string) => {
    // 1. Delete from Storage
    const storageRef = ref(storage, fileURL);
    await deleteObject(storageRef);

    // 2. Delete from Firestore
    await deleteDoc(doc(db, 'certificates', certificateId));

    // 3. Trigger auto-categorization
    await certificateService.updateStudentCategorization(uid);
  },

  getStudentCertificates: async (uid: string) => {
    const certificatesRef = collection(db, 'certificates');
    const q = query(certificatesRef, where('studentId', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Certificate[];
  },

  updateStudentCategorization: async (uid: string) => {
    const certificatesRef = collection(db, 'certificates');
    const q = query(certificatesRef, where('studentId', '==', uid));
    const snapshot = await getCountFromServer(q);
    const count = snapshot.data().count;

    let level: 'High' | 'Medium' | 'Low' = 'Low';
    if (count >= 6) level = 'High';
    else if (count >= 3) level = 'Medium';

    const studentRef = doc(db, 'users', uid);
    await updateDoc(studentRef, {
      certificateCount: count,
      certificateLevel: level
    });
  }
};
