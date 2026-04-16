# Integrated Academic & Examination Management System (IAEMS)

A centralized, intelligent platform designed to automate academic operations, streamline examination workflows, manage certifications, and optimize placement processes through a secure role-based architecture.

---

## Table of Contents

- Overview  
- Features  
- Unique Highlights  
- Tech Stack  
- Project Structure  
- Installation & Setup  

---

## Overview  

The Integrated Academic & Examination Management System (IAEMS) is a full-stack web application developed to digitize and enhance academic and administrative processes within educational institutions.

It provides a unified interface for:

- Students  
- Administrators  
- Placement Coordinators  

By consolidating multiple workflows into a single platform, IAEMS significantly reduces manual effort, improves operational efficiency, and ensures transparency across all academic activities.

---

## Features  

### Placement Drive Management  
- Create and manage placement drives  
- Define eligibility criteria (CGPA, department, batch)  
- Automatically filter eligible students  
- Track student applications in real time  

### Certificate Management and Analysis  
- Upload and manage student certificates  
- Categorize students based on certification strength  
- Enable efficient and data-driven shortlisting  

### Academic Filtering System  
- Filter students based on CGPA  
- Identify high-performing candidates instantly  
- Generate dynamic eligibility lists  

### Role-Based Authentication  
- Secure authentication using Firebase  
- Role-specific dashboards:
  - Administrator  
  - Student  
  - Placement Coordinator  
- Protected routes and controlled access  

### Real-Time Database Integration  
- Powered by Firebase Firestore  
- Instant updates without page reload  
- Secure and scalable cloud-based data storage  

### User Interface and Experience  
- Clean and responsive design  
- Optimized for both desktop and mobile devices  
- Intuitive dashboard and navigation  

---

## Unique Highlights  

- Automated placement eligibility filtering system  
- Intelligent certificate-based student categorization  
- Secure role-based system architecture  
- Real-time data synchronization using Firestore  
- Data-driven academic and placement decision support  
- Scalable and production-ready system design  

---

## Tech Stack  

### Frontend  
- React.js  
- TypeScript  

### Backend and Database  
- Firebase Authentication  
- Firebase Firestore  

### Tools and Environment  
- Vite  
- Git and GitHub  

---

## 📁 Project Structure  
```
src/
├── components/
├── pages/
├── layouts/
├── routes/
├── services/
├── firebase/
```

---

## Installation and Setup  

### Clone the Repository  
```bash
git clone https://github.com/your-username/iaems.git

Navigate to Project Folder
cd iaems

Install Dependencies
npm install

Setup Firebase
1.Go to Firebase Console
2.Create a new project
3.Copy your Firebase configuration and replace it in:
src/firebase/config.ts

Example configuration:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

Run the Application
npm run dev

Open in Browser
http://localhost:3000

