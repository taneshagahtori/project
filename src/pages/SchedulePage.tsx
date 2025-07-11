import React, { useState } from "react";
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTeachers } from '@/data/mockData';
import { mockStudents } from '@/pages/StudentsPage';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

function getStudentNameBySubject(subject, teacherId) {
  // Find a student for this subject and teacher (mock logic)
  const teacher = mockTeachers.find(t => t.id === teacherId);
  if (!teacher) return '';
  const student = mockStudents.find(s => s.subject === subject);
  return student ? student.name : '';
}

const SchedulePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Flatten all teacher schedules into a single array of slots
  const allSlots = mockTeachers.flatMap(teacher =>
    teacher.schedule.map(slot => ({ ...slot, teacherId: teacher.id, teacherName: teacher.name }))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={toggleSidebar} isMobile={isMobile} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <span>Schedule</span>
                </div>
                <Typography.H1>Schedule</Typography.H1>
                <Typography.Body className="mt-1">View and manage all teachers' weekly schedules, lessons, and availability.</Typography.Body>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 bg-muted">Time</th>
                      {daysOfWeek.map(day => (
                        <th key={day} className="border px-2 py-1 bg-muted">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(time => (
                      <tr key={time}>
                        <td className="border px-2 py-1 font-medium bg-muted/50">{time}</td>
                        {daysOfWeek.map(day => {
                          // Find all slots for this day/time
                          const slots = allSlots.filter(slot => slot.day === day && slot.startTime === time);
                          return (
                            <td key={day} className="border px-1 py-1 align-top min-w-[180px]">
                              {slots.length === 0 ? (
                                <span className="text-xs text-muted-foreground">Available</span>
                              ) : (
                                slots.map(slot => (
                                  <Card key={slot.teacherId + slot.subject + slot.startTime} className="mb-2">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm font-semibold text-foreground">
                                        {slot.subject || 'Unavailable'}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-1 pt-0">
                                      <div className="text-xs text-muted-foreground">Teacher: {slot.teacherName}</div>
                                      {slot.type === 'booked' && (
                                        <>
                                          <div className="text-xs">Student: {getStudentNameBySubject(slot.subject, slot.teacherId)}</div>
                                          <div className="text-xs">Duration: {slot.startTime} - {slot.endTime}</div>
                                          <Badge className="bg-green-100 text-green-800 border-green-200">Booked</Badge>
                                        </>
                                      )}
                                      {slot.type === 'available' && (
                                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Available</Badge>
                                      )}
                                    </CardContent>
                                  </Card>
                                ))
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage; 