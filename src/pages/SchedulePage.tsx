import React, { useState } from "react";
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTeachers } from '@/data/mockData';
import { mockStudents } from '@/pages/StudentsPage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface ScheduleSlotDisplay {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  subject?: string;
  type: 'available' | 'booked' | 'break';
  color?: string;
  teacherId: string;
  teacherName: string;
  studentName?: string;
}

const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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
  const [allSlots, setAllSlots] = useState<ScheduleSlotDisplay[]>(() =>
    mockTeachers.flatMap(teacher =>
      teacher.schedule.map(slot => ({ ...slot, teacherId: teacher.id, teacherName: teacher.name }))
    )
  );

  // Modal state for adding a slot
  const [addModal, setAddModal] = useState<{ open: boolean; day: string; time: string } | null>(null);
  const [form, setForm] = useState({
    teacherId: '',
    subject: '',
    studentId: '',
    startTime: '',
    endTime: '',
    type: 'booked',
  });

  // When modal opens, reset form
  React.useEffect(() => {
    if (addModal && addModal.open) {
      setForm({
        teacherId: '',
        subject: '',
        studentId: '',
        startTime: addModal.time,
        endTime: '',
        type: 'booked',
      });
    }
  }, [addModal]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Get teacher and subject options
  const teacherOptions = mockTeachers.map(t => ({ id: t.id, name: t.name }));
  const subjectOptions = form.teacherId
    ? mockTeachers.find(t => t.id === form.teacherId)?.subjects || []
    : [];
  const studentOptions = form.subject
    ? mockStudents.filter(s => s.subject === form.subject)
    : mockStudents;

  const handleAddSlot = () => {
    if (!form.teacherId || !form.subject || !form.studentId || !form.startTime || !form.endTime) return;
    const teacher = mockTeachers.find(t => t.id === form.teacherId);
    const student = mockStudents.find(s => s.id === form.studentId);
    setAllSlots(prev => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        day: addModal.day as DayOfWeek,
        startTime: form.startTime,
        endTime: form.endTime,
        subject: form.subject,
        type: form.type as 'booked' | 'available' | 'break',
        color: form.type === 'booked' ? '#10B981' : '#94A3B8',
        teacherId: form.teacherId,
        teacherName: teacher?.name || '',
        studentName: student?.name || '',
      } as ScheduleSlotDisplay,
    ]);
    setAddModal(null);
  };

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
                                <span
                                  className="text-xs text-muted-foreground cursor-pointer hover:underline"
                                  onClick={() => setAddModal({ open: true, day, time })}
                                >
                                  Available (Click to add)
                                </span>
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
                                          <div className="text-xs">Student: {slot.studentName || getStudentNameBySubject(slot.subject, slot.teacherId)}</div>
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
              {/* Add Slot Modal */}
              <Dialog open={!!addModal} onOpenChange={open => !open && setAddModal(null)}>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Add Lesson/Slot</DialogTitle>
                    <DialogDescription>
                      Select teacher, subject, student, and time for the new slot.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Label>Teacher</Label>
                    <Select value={form.teacherId} onValueChange={v => handleSelectChange('teacherId', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherOptions.map(t => (
                          <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Subject</Label>
                    <Select value={form.subject} onValueChange={v => handleSelectChange('subject', v)} disabled={!form.teacherId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map(subj => (
                          <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Student</Label>
                    <Select value={form.studentId} onValueChange={v => handleSelectChange('studentId', v)} disabled={!form.subject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {studentOptions.map(s => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name} ({s.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Start Time</Label>
                        <Input name="startTime" value={form.startTime} onChange={handleFormChange} type="time" />
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Input name="endTime" value={form.endTime} onChange={handleFormChange} type="time" />
                      </div>
                    </div>
                    <Label>Status</Label>
                    <Select value={form.type} onValueChange={v => handleSelectChange('type', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booked">Booked</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="break">Break</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full mt-2" onClick={handleAddSlot} disabled={!form.teacherId || !form.subject || !form.studentId || !form.startTime || !form.endTime}>Add Slot</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage; 