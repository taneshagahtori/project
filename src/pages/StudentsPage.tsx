import React, { useState } from "react";
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockStudents = [
  { id: '1', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', phone: '+91 98765 43210', subject: 'Hindustani Classical', level: 'Intermediate', joinDate: new Date('2023-09-15'), lastLesson: new Date('2024-01-05'), totalLessons: 24, hourlyRate: 800, status: 'active', nextLesson: new Date('2024-01-12'), avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '+91 98765 43211', subject: 'Carnatic Music', level: 'Advanced', joinDate: new Date('2023-08-20'), lastLesson: new Date('2024-01-04'), totalLessons: 32, hourlyRate: 1000, status: 'active', nextLesson: new Date('2024-01-11'), avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '3', name: 'Rahul Gupta', email: 'rahul.gupta@example.com', phone: '+91 98765 43212', subject: 'Bollywood Singing', level: 'Beginner', joinDate: new Date('2023-11-10'), lastLesson: new Date('2024-01-03'), totalLessons: 12, hourlyRate: 600, status: 'active', nextLesson: new Date('2024-01-10'), avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
  { id: '4', name: 'Ananya Reddy', email: 'ananya.reddy@example.com', phone: '+91 98765 43213', subject: 'Western Classical', level: 'Intermediate', joinDate: new Date('2023-07-05'), lastLesson: new Date('2023-12-28'), totalLessons: 20, hourlyRate: 900, status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '5', name: 'Vikram Singh', email: 'vikram.singh@example.com', phone: '+91 98765 43214', subject: 'Sufi Music', level: 'Advanced', joinDate: new Date('2023-10-12'), lastLesson: new Date('2024-01-02'), totalLessons: 16, hourlyRate: 950, status: 'pending', nextLesson: new Date('2024-01-09'), avatar: 'https://randomuser.me/api/portraits/men/72.jpg' },
  { id: '6', name: 'Ishaan Mehra', email: 'ishaan.mehra@example.com', phone: '+91 98765 43215', subject: 'Tabla', level: 'Beginner', joinDate: new Date('2023-09-01'), lastLesson: new Date('2024-01-01'), totalLessons: 10, hourlyRate: 700, status: 'active', nextLesson: new Date('2024-01-13'), avatar: 'https://randomuser.me/api/portraits/men/73.jpg' },
  { id: '7', name: 'Simran Kaur', email: 'simran.kaur@example.com', phone: '+91 98765 43216', subject: 'Hindustani Classical', level: 'Intermediate', joinDate: new Date('2023-08-10'), lastLesson: new Date('2024-01-02'), totalLessons: 18, hourlyRate: 850, status: 'active', nextLesson: new Date('2024-01-14'), avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: '8', name: 'Rohan Desai', email: 'rohan.desai@example.com', phone: '+91 98765 43217', subject: 'Bollywood Singing', level: 'Advanced', joinDate: new Date('2023-07-20'), lastLesson: new Date('2024-01-03'), totalLessons: 22, hourlyRate: 950, status: 'active', nextLesson: new Date('2024-01-15'), avatar: 'https://randomuser.me/api/portraits/men/74.jpg' },
  { id: '9', name: 'Meera Joshi', email: 'meera.joshi@example.com', phone: '+91 98765 43218', subject: 'Carnatic Music', level: 'Beginner', joinDate: new Date('2023-10-05'), lastLesson: new Date('2024-01-04'), totalLessons: 8, hourlyRate: 600, status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/66.jpg' },
  { id: '10', name: 'Aditya Rao', email: 'aditya.rao@example.com', phone: '+91 98765 43219', subject: 'Tabla', level: 'Intermediate', joinDate: new Date('2023-09-25'), lastLesson: new Date('2024-01-05'), totalLessons: 14, hourlyRate: 800, status: 'active', nextLesson: new Date('2024-01-16'), avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { id: '11', name: 'Sneha Nair', email: 'sneha.nair@example.com', phone: '+91 98765 43220', subject: 'Western Classical', level: 'Advanced', joinDate: new Date('2023-08-15'), lastLesson: new Date('2024-01-06'), totalLessons: 28, hourlyRate: 1000, status: 'active', nextLesson: new Date('2024-01-17'), avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
  { id: '12', name: 'Karan Malhotra', email: 'karan.malhotra@example.com', phone: '+91 98765 43221', subject: 'Sufi Music', level: 'Beginner', joinDate: new Date('2023-11-01'), lastLesson: new Date('2024-01-07'), totalLessons: 6, hourlyRate: 700, status: 'pending', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { id: '13', name: 'Aditi Verma', email: 'aditi.verma@example.com', phone: '+91 98765 43222', subject: 'Hindustani Classical', level: 'Intermediate', joinDate: new Date('2023-09-10'), lastLesson: new Date('2024-01-08'), totalLessons: 16, hourlyRate: 850, status: 'active', nextLesson: new Date('2024-01-18'), avatar: 'https://randomuser.me/api/portraits/women/69.jpg' },
  { id: '14', name: 'Siddharth Jain', email: 'siddharth.jain@example.com', phone: '+91 98765 43223', subject: 'Carnatic Music', level: 'Advanced', joinDate: new Date('2023-08-25'), lastLesson: new Date('2024-01-09'), totalLessons: 30, hourlyRate: 1050, status: 'active', nextLesson: new Date('2024-01-19'), avatar: 'https://randomuser.me/api/portraits/men/77.jpg' },
  { id: '15', name: 'Pooja Singh', email: 'pooja.singh@example.com', phone: '+91 98765 43224', subject: 'Bollywood Singing', level: 'Beginner', joinDate: new Date('2023-10-15'), lastLesson: new Date('2024-01-10'), totalLessons: 9, hourlyRate: 650, status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/70.jpg' },
  { id: '16', name: 'Manav Kapoor', email: 'manav.kapoor@example.com', phone: '+91 98765 43225', subject: 'Tabla', level: 'Intermediate', joinDate: new Date('2023-09-05'), lastLesson: new Date('2024-01-11'), totalLessons: 13, hourlyRate: 800, status: 'active', nextLesson: new Date('2024-01-20'), avatar: 'https://randomuser.me/api/portraits/men/78.jpg' },
  { id: '17', name: 'Riya Chawla', email: 'riya.chawla@example.com', phone: '+91 98765 43226', subject: 'Western Classical', level: 'Advanced', joinDate: new Date('2023-08-30'), lastLesson: new Date('2024-01-12'), totalLessons: 26, hourlyRate: 950, status: 'active', nextLesson: new Date('2024-01-21'), avatar: 'https://randomuser.me/api/portraits/women/71.jpg' },
  { id: '18', name: 'Arjun Sethi', email: 'arjun.sethi@example.com', phone: '+91 98765 43227', subject: 'Sufi Music', level: 'Beginner', joinDate: new Date('2023-11-05'), lastLesson: new Date('2024-01-13'), totalLessons: 7, hourlyRate: 700, status: 'pending', avatar: 'https://randomuser.me/api/portraits/men/79.jpg' },
  { id: '19', name: 'Divya Pillai', email: 'divya.pillai@example.com', phone: '+91 98765 43228', subject: 'Hindustani Classical', level: 'Intermediate', joinDate: new Date('2023-09-20'), lastLesson: new Date('2024-01-14'), totalLessons: 15, hourlyRate: 850, status: 'active', nextLesson: new Date('2024-01-22'), avatar: 'https://randomuser.me/api/portraits/women/72.jpg' },
  { id: '20', name: 'Nikhil Bansal', email: 'nikhil.bansal@example.com', phone: '+91 98765 43229', subject: 'Carnatic Music', level: 'Advanced', joinDate: new Date('2023-08-05'), lastLesson: new Date('2024-01-15'), totalLessons: 29, hourlyRate: 1050, status: 'active', nextLesson: new Date('2024-01-23'), avatar: 'https://randomuser.me/api/portraits/men/80.jpg' },
  { id: '21', name: 'Tanvi Shah', email: 'tanvi.shah@example.com', phone: '+91 98765 43230', subject: 'Bollywood Singing', level: 'Beginner', joinDate: new Date('2023-10-20'), lastLesson: new Date('2024-01-16'), totalLessons: 11, hourlyRate: 650, status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/73.jpg' },
  { id: '22', name: 'Yash Agarwal', email: 'yash.agarwal@example.com', phone: '+91 98765 43231', subject: 'Tabla', level: 'Intermediate', joinDate: new Date('2023-09-15'), lastLesson: new Date('2024-01-17'), totalLessons: 12, hourlyRate: 800, status: 'active', nextLesson: new Date('2024-01-24'), avatar: 'https://randomuser.me/api/portraits/men/81.jpg' },
  { id: '23', name: 'Neha Kulkarni', email: 'neha.kulkarni@example.com', phone: '+91 98765 43232', subject: 'Western Classical', level: 'Advanced', joinDate: new Date('2023-08-10'), lastLesson: new Date('2024-01-18'), totalLessons: 27, hourlyRate: 1000, status: 'active', nextLesson: new Date('2024-01-25'), avatar: 'https://randomuser.me/api/portraits/women/74.jpg' },
  { id: '24', name: 'Saurabh Mishra', email: 'saurabh.mishra@example.com', phone: '+91 98765 43233', subject: 'Sufi Music', level: 'Beginner', joinDate: new Date('2023-11-10'), lastLesson: new Date('2024-01-19'), totalLessons: 8, hourlyRate: 700, status: 'pending', avatar: 'https://randomuser.me/api/portraits/men/82.jpg' },
];

export { mockStudents };

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

const StudentsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

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
                  <span>Students</span>
                </div>
                <Typography.H1>Students</Typography.H1>
                <Typography.Body className="mt-1">List of all enrolled students and their details.</Typography.Body>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockStudents.map((student) => (
                  <Card key={student.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg font-semibold text-foreground">{student.name}</CardTitle>
                          <div className="text-sm text-muted-foreground">{student.subject}</div>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(student.status)}>{student.status.charAt(0).toUpperCase() + student.status.slice(1)}</Badge>
                        <Badge variant="outline" className={getLevelColor(student.level)}>{student.level}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage; 