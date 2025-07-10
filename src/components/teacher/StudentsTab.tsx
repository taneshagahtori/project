
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Plus
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

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
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '(416) 555-0101',
    subject: 'Vocal Jazz',
    level: 'Intermediate',
    joinDate: new Date('2023-09-15'),
    lastLesson: new Date('2024-01-05'),
    totalLessons: 24,
    hourlyRate: 30,
    status: 'active',
    nextLesson: new Date('2024-01-09')
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(416) 555-0102',
    subject: 'Vocal Contemporary',
    level: 'Beginner',
    joinDate: new Date('2023-11-20'),
    lastLesson: new Date('2024-01-04'),
    totalLessons: 12,
    hourlyRate: 30,
    status: 'active',
    nextLesson: new Date('2024-01-11')
  },
  {
    id: '3',
    name: 'Sarah Davis',
    email: 'sarah.davis@email.com',
    phone: '(416) 555-0103',
    subject: 'Vocal Pop',
    level: 'Advanced',
    joinDate: new Date('2023-06-10'),
    lastLesson: new Date('2024-01-03'),
    totalLessons: 36,
    hourlyRate: 30,
    status: 'active'
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '(416) 555-0104',
    subject: 'Vocal RnB',
    level: 'Intermediate',
    joinDate: new Date('2023-08-05'),
    lastLesson: new Date('2023-12-28'),
    totalLessons: 18,
    hourlyRate: 30,
    status: 'inactive'
  }
];

const StudentsTab: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');

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
        <Button className="flex items-center space-x-2">
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
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Lesson</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
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
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">${student.hourlyRate}/hour</span>
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

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-1" />
                  Message
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

export default StudentsTab;
