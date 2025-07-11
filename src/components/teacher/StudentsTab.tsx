import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar,
  DollarSign,
  Clock,
  Star,
  Plus,
  X,
  Clock3,
  CalendarDays,
  BookOpen,
  User,
  BookMarked,
  CalendarCheck2,
  Edit
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { mockStudents as allStudents } from '@/pages/StudentsPage';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  level: string;
  joinDate: Date;
  lastLesson: Date;
  totalLessons: number;
  hourlyRate: number;
  status: 'active' | 'inactive' | 'pending';
  nextLesson?: Date;
  avatar?: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    subject: 'Hindustani Classical',
    level: 'Intermediate',
    joinDate: new Date('2023-09-15'),
    lastLesson: new Date('2024-01-05'),
    totalLessons: 24,
    hourlyRate: 800,
    status: 'active',
    nextLesson: new Date('2024-01-12'),
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 98765 43211',
    subject: 'Carnatic Music',
    level: 'Advanced',
    joinDate: new Date('2023-08-20'),
    lastLesson: new Date('2024-01-04'),
    totalLessons: 32,
    hourlyRate: 1000,
    status: 'active',
    nextLesson: new Date('2024-01-11'),
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '3',
    name: 'Rahul Gupta',
    email: 'rahul.gupta@example.com',
    phone: '+91 98765 43212',
    subject: 'Bollywood Singing',
    level: 'Beginner',
    joinDate: new Date('2023-11-10'),
    lastLesson: new Date('2024-01-03'),
    totalLessons: 12,
    hourlyRate: 600,
    status: 'active',
    nextLesson: new Date('2024-01-10'),
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
  {
    id: '4',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@example.com',
    phone: '+91 98765 43213',
    subject: 'Western Classical',
    level: 'Intermediate',
    joinDate: new Date('2023-07-05'),
    lastLesson: new Date('2023-12-28'),
    totalLessons: 20,
    hourlyRate: 900,
    status: 'inactive',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 98765 43214',
    subject: 'Sufi Music',
    level: 'Advanced',
    joinDate: new Date('2023-10-12'),
    lastLesson: new Date('2024-01-02'),
    totalLessons: 16,
    hourlyRate: 950,
    status: 'pending',
    nextLesson: new Date('2024-01-09'),
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg'
  }
];

interface ScheduleLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

const ScheduleLessonModal: React.FC<ScheduleLessonModalProps> = ({ isOpen, onClose, student }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('14:00');
  const [duration, setDuration] = useState<number>(60);
  const [notes, setNotes] = useState<string>('');

  if (!student) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      console.log('Scheduling lesson:', { student: student.name, date, startTime, duration, notes });
      
      // Show success toast
      toast({
        title: 'Lesson Scheduled!',
        description: `Successfully scheduled ${student.subject} lesson with ${student.name} for ${format(new Date(`${date}T${startTime}`), 'PPPpp')}`,
      });
      
      onClose();
    } catch (error) {
      // Show error toast
      toast({
        title: 'Error',
        description: 'Failed to schedule lesson. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl">Schedule New Lesson</DialogTitle>
              <DialogDescription className="mt-1">
                For {student.name} - {student.subject}
              </DialogDescription>
            </div>
            {/* <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <div className="relative">
                <Clock3 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select 
              value={duration.toString()} 
              onValueChange={(value) => setDuration(parseInt(value))}
            >
              <SelectTrigger>
                <Clock3 className="h-4 w-4 text-muted-foreground mr-2" />
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea 
              id="notes"
              placeholder="Any special instructions or topics to cover..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <CalendarCheck2 className="h-4 w-4 mr-2" />
              Lesson Summary
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Student:</div>
              <div className="font-medium">{student.name}</div>
              
              <div className="text-muted-foreground">Subject:</div>
              <div className="font-medium">{student.subject}</div>
              
              <div className="text-muted-foreground">Level:</div>
              <div className="font-medium">{student.level}</div>
              
              <div className="text-muted-foreground">Rate:</div>
              <div className="font-medium">₹{student.hourlyRate}/hr</div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Schedule Lesson
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onSave: (updatedStudent: Student) => void;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState<Omit<Student, 'id' | 'joinDate'>>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    level: 'Beginner',
    hourlyRate: 0,
    status: 'active',
    lastLesson: new Date(),
    totalLessons: 0,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (student) {
      const { id, joinDate, ...rest } = student;
      setFormData(rest);
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    
    try {
      onSave({ ...student, ...formData });
      toast({
        title: 'Success!',
        description: 'Student details updated successfully.',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update student details. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Student Details</DialogTitle>
          <DialogDescription>
            Update the details for {student.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({...formData, level: value as 'Beginner' | 'Intermediate' | 'Advanced'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({...formData, hourlyRate: Number(e.target.value)})}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({...formData, status: value as 'active' | 'inactive' | 'pending'})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AddStudentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (student: Student) => void;
  existingStudentIds: string[];
}> = ({ isOpen, onClose, onAdd, existingStudentIds }) => {
  const availableStudents = allStudents.filter(s => !existingStudentIds.includes(s.id));
  const [selectedId, setSelectedId] = useState<string>("");
  const selectedStudent = availableStudents.find(s => s.id === selectedId);

  // Editable fields
  const [form, setForm] = useState<Partial<Student>>({});

  React.useEffect(() => {
    if (selectedStudent) {
      setForm({
        ...selectedStudent,
        hourlyRate: selectedStudent.hourlyRate ?? 0,
        email: selectedStudent.email ?? '',
        phone: selectedStudent.phone ?? '',
        totalLessons: selectedStudent.totalLessons ?? 0,
        status: selectedStudent.status as 'active' | 'inactive' | 'pending',
        level: selectedStudent.level as 'Beginner' | 'Intermediate' | 'Advanced',
      });
    } else {
      setForm({});
    }
  }, [selectedStudent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'hourlyRate' || name === 'totalLessons' ? Number(value) : value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Student</DialogTitle>
          <DialogDescription>Select a student and edit details before adding.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger>
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              {availableStudents.map(student => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name} ({student.subject})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedStudent && (
            <div className="space-y-3 mt-2">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                  <AvatarFallback>{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedStudent.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedStudent.subject} - {selectedStudent.level}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={form.email || ''} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={form.phone || ''} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="hourlyRate">Fees (INR/hour)</Label>
                <Input id="hourlyRate" name="hourlyRate" type="number" value={form.hourlyRate ?? ''} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="totalLessons">Number of Sessions</Label>
                <Input id="totalLessons" name="totalLessons" type="number" value={form.totalLessons ?? ''} onChange={handleChange} />
              </div>
            </div>
          )}
          <Button
            onClick={() => {
              if (selectedStudent && form.email && form.phone) {
                onAdd({ ...selectedStudent, ...form, status: (form.status ?? selectedStudent.status) as 'active' | 'inactive' | 'pending', level: (form.level ?? selectedStudent.level) as 'Beginner' | 'Intermediate' | 'Advanced' });
                onClose();
              }
            }}
            disabled={!selectedStudent}
            className="w-full mt-4"
          >
            Add Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const StudentsTab: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intermediate': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={student => setStudents(prev => [...prev, student])}
        existingStudentIds={students.map(s => s.id)}
      />
      <ScheduleLessonModal 
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
      
      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        onSave={(updatedStudent) => {
          setStudents(students.map(s => 
            s.id === updatedStudent.id ? updatedStudent : s
          ));
          setIsEditModalOpen(false);
        }}
      />
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter: {filterStatus === 'all' ? 'All' : filterStatus}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>All Students</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('active')}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>Inactive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('pending')}>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="flex items-center space-x-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{student.subject}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => {
                      setSelectedStudent(student);
                      setIsScheduleModalOpen(true);
                    }}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Lesson
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        window.location.href = `mailto:${student.email}?subject=Regarding ${student.subject} Lessons`;
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(student.status)}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
                <Badge variant="outline" className={getLevelColor(student.level)}>
                  {student.level}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.totalLessons} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  
                  <span className="text-muted-foreground">₹{student.hourlyRate}/hour</span>
                </div>
              </div>

              {student.nextLesson && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Next Lesson:</span>
                    <span>{student.nextLesson.toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    window.location.href = `mailto:${student.email}?subject=Regarding ${student.subject} Lessons`;
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsScheduleModalOpen(true);
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No students found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'No students match your current filters.'
                : 'You haven\'t added any students yet.'
              }
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Student
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { mockStudents };
export default StudentsTab;
