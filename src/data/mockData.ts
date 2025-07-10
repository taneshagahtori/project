
import { Teacher } from '@/types/teacher';

export const mockTeacher: Teacher = {
  id: '1',
  name: 'Alynia Allan',
  email: 'alyniaallan@example.com',
  phone: '(416) 658-9677',
  address: {
    street: '123 University Ave',
    city: 'North York, Ontario',
    state: 'ON',
    country: 'Canada'
  },
  privateQualifications: [
    { id: '1', name: 'Vocal Contemporary', rate: 30.00, currency: 'CAD', type: 'private' },
    { id: '2', name: 'Vocal Core', rate: 30.00, currency: 'CAD', type: 'private' },
    { id: '3', name: 'Vocal Jazz', rate: 30.00, currency: 'CAD', type: 'private' },
    { id: '4', name: 'Vocal Pop', rate: 30.00, currency: 'CAD', type: 'private' },
    { id: '5', name: 'Vocal RnB', rate: 30.00, currency: 'CAD', type: 'private' }
  ],
  groupQualifications: [],
  schedule: [
    { id: '1', day: 'Tuesday', startTime: '16:00', endTime: '17:00', type: 'booked', subject: 'Vocal Jazz', color: '#10B981' },
    { id: '2', day: 'Wednesday', startTime: '15:00', endTime: '16:30', type: 'booked', subject: 'Vocal Contemporary', color: '#10B981' },
    { id: '3', day: 'Friday', startTime: '09:00', endTime: '12:00', type: 'available', color: '#94A3B8' },
    { id: '4', day: 'Saturday', startTime: '10:00', endTime: '15:00', type: 'available', color: '#94A3B8' }
  ],
  status: 'active',
  joinDate: new Date('2023-01-15'),
  subjects: ['Vocal Contemporary', 'Vocal Jazz', 'Vocal Pop', 'Vocal RnB'],
  experience: 8
};

export const mockTeachers: Teacher[] = [
  mockTeacher,
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(416) 555-0123',
    address: {
      street: '456 Music Lane',
      city: 'Toronto, Ontario',
      state: 'ON',
      country: 'Canada'
    },
    privateQualifications: [
      { id: '6', name: 'Piano Classical', rate: 45.00, currency: 'CAD', type: 'private' },
      { id: '7', name: 'Piano Jazz', rate: 50.00, currency: 'CAD', type: 'private' }
    ],
    groupQualifications: [
      { id: '8', name: 'Group Piano Basics', rate: 25.00, currency: 'CAD', type: 'group' }
    ],
    schedule: [],
    status: 'active',
    joinDate: new Date('2022-09-10'),
    subjects: ['Piano', 'Music Theory'],
    experience: 12
  }
];
