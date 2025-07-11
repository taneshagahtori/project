
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Teacher, ScheduleSlot } from '@/types/teacher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeacherProfile from './TeacherProfile';
import ScheduleCalendar from './ScheduleCalendar';
import StudentsTab from './StudentsTab';
import AnalyticsTab from './AnalyticsTab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Star,
  Clock
} from 'lucide-react';

interface TeacherDetailViewProps {
  teacher: Teacher;
  onUpdate: (teacher: Teacher) => void;
}

const TeacherDetailView: React.FC<TeacherDetailViewProps> = ({ teacher, onUpdate }) => {
  const stats = [
    {
      title: 'Total Students',
      value: '24',
      icon: Users,
      trend: '+2.1%',
      color: 'text-blue-600'
    },
    {
      title: 'Monthly Revenue',
      value: '₹3,240',
      icon: DollarSign,
      trend: '+15.3%',
      color: 'text-green-600'
    },
    {
      title: 'Hours This Week',
      value: '28h',
      icon: Clock,
      trend: '+4h',
      color: 'text-purple-600'
    },
    {
      title: 'Rating',
      value: '4.9',
      icon: Star,
      trend: '+0.2',
      color: 'text-yellow-600'
    }
  ];

  const handleAddSlot = (slot: ScheduleSlot | Omit<ScheduleSlot, 'id'>) => {
    // Special case for deletion (hacky but works with our current setup)
    if ('id' in slot && slot.id === 'delete') {
      // Create a copy of the slot without the id
      const { id, ...slotWithoutId } = slot;
      
      const updatedTeacher = {
        ...teacher,
        schedule: teacher.schedule.filter(s => {
          // Check if this slot matches all properties of the slot to delete
          return !Object.entries(slotWithoutId).every(([key, value]) => {
            return s[key as keyof typeof s] === value;
          });
        })
      };
      
      onUpdate(updatedTeacher);
      return;
    }

    // Handle update or add
    const slotWithId = 'id' in slot ? slot : { ...slot, id: uuidv4() };
    
    const isUpdate = teacher.schedule.some(s => s.id === slotWithId.id);
    
    const updatedTeacher = {
      ...teacher,
      schedule: isUpdate 
        ? teacher.schedule.map(s => s.id === slotWithId.id ? slotWithId : s)
        : [...teacher.schedule, slotWithId as ScheduleSlot]
    };
    
    onUpdate(updatedTeacher);
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs font-medium ${stat.color} flex items-center mt-1`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.trend}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <TeacherProfile teacher={teacher} onUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <ScheduleCalendar 
            schedule={teacher.schedule} 
            editable={true}
            onSlotClick={(slot) => console.log('Slot clicked:', slot)}
            onAddSlot={handleAddSlot}
          />
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <StudentsTab />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDetailView;
