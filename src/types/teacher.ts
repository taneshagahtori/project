
export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode?: string;
  };
  privateQualifications: Qualification[];
  groupQualifications: Qualification[];
  schedule: ScheduleSlot[];
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: Date;
  subjects: string[];
  experience: number;
}

export interface Qualification {
  id: string;
  name: string;
  rate: number;
  currency: string;
  type: 'private' | 'group';
  description?: string;
}

export interface ScheduleSlot {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  subject?: string;
  studentCount?: number;
  type: 'available' | 'booked' | 'break';
  color?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface TeacherFilters {
  search: string;
  subject: string;
  status: string;
  experience: number;
  sortBy: 'name' | 'experience' | 'rating' | 'joinDate';
  sortOrder: 'asc' | 'desc';
}
