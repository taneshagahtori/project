
import { Teacher } from '@/types/teacher';

export const mockTeacher: Teacher = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  address: {
    street: '123 MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    pincode: '400001'
  },
  privateQualifications: [
    { id: '1', name: 'Hindustani Classical Vocal', rate: 1500.00, currency: 'INR', type: 'private' },
    { id: '2', name: 'Semi-Classical', rate: 1200.00, currency: 'INR', type: 'private' },
    { id: '3', name: 'Bollywood Singing', rate: 1000.00, currency: 'INR', type: 'private' },
    { id: '4', name: 'Bhajans & Devotionals', rate: 1000.00, currency: 'INR', type: 'private' },
    { id: '5', name: 'Music Theory', rate: 800.00, currency: 'INR', type: 'private' }
  ],
  groupQualifications: [
    { id: '6', name: 'Group Vocal Training', rate: 600.00, currency: 'INR', type: 'group' }
  ],
  schedule: [
    { id: '1', day: 'Monday', startTime: '10:00', endTime: '12:00', type: 'booked', subject: 'Hindustani Classical', color: '#10B981' },
    { id: '2', day: 'Wednesday', startTime: '15:00', endTime: '17:00', type: 'booked', subject: 'Bollywood Singing', color: '#10B981' },
    { id: '3', day: 'Friday', startTime: '09:00', endTime: '12:00', type: 'available', color: '#94A3B8' },
    { id: '4', day: 'Saturday', startTime: '10:00', endTime: '15:00', type: 'available', color: '#94A3B8' }
  ],
  status: 'active',
  joinDate: new Date('2022-06-10'),
  subjects: ['Hindustani Classical', 'Semi-Classical', 'Bollywood', 'Devotional'],
  experience: 10
};

export const mockTeachers: Teacher[] = [
  mockTeacher,
  {
    id: '2',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 98765 12340',
    address: {
      street: '456 Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      pincode: '110001'
    },
    privateQualifications: [
      { id: '6', name: 'Tabla', rate: 1200.00, currency: 'INR', type: 'private' },
      { id: '7', name: 'Pakhawaj', rate: 1500.00, currency: 'INR', type: 'private' }
    ],
    groupQualifications: [
      { id: '8', name: 'Percussion Ensemble', rate: 800.00, currency: 'INR', type: 'group' }
    ],
    schedule: [
      { id: '5', day: 'Tuesday', startTime: '14:00', endTime: '16:00', type: 'booked', subject: 'Tabla', color: '#10B981' },
      { id: '6', day: 'Thursday', startTime: '16:00', endTime: '18:00', type: 'booked', subject: 'Percussion Ensemble', color: '#10B981' }
    ],
    status: 'active',
    joinDate: new Date('2021-11-15'),
    subjects: ['Tabla', 'Pakhawaj', 'Percussion'],
    experience: 8
  }
];
