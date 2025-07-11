import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, BookOpen, Calendar, User, CalendarDays } from 'lucide-react';
import { mockTeachers } from '@/data/mockData';
import { mockStudents } from '@/components/teacher/StudentsTab';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';

const monthlyEarnings = [
  { month: 'Aug', earnings: 192000 },
  { month: 'Sep', earnings: 224000 },
  { month: 'Oct', earnings: 248000 },
  { month: 'Nov', earnings: 236000 },
  { month: 'Dec', earnings: 256000 },
  { month: 'Jan', earnings: 259200 }
];

const subjectDistribution = [
  { name: 'Hindustani Classical', value: 35, color: '#8884d8' },
  { name: 'Bollywood Singing', value: 25, color: '#82ca9d' },
  { name: 'Tabla', value: 20, color: '#ffc658' },
  { name: 'Carnatic Music', value: 15, color: '#ff7c7c' },
  { name: 'Western Classical', value: 5, color: '#8dd1e1' }
];

const recentActivities = [
  {
    type: 'student',
    name: 'Aarav Sharma',
    action: 'Booked a lesson in Hindustani Classical',
    time: '2 hours ago',
    icon: User,
  },
  {
    type: 'payment',
    name: 'Priya Patel',
    action: 'Paid ₹1,000 for Carnatic Music lesson',
    time: '4 hours ago',
    icon: DollarSign,
  },
  {
    type: 'teacher',
    name: 'Rahul Verma',
    action: 'Added new subject: Pakhawaj',
    time: '1 day ago',
    icon: BookOpen,
  },
  {
    type: 'student',
    name: 'Ananya Reddy',
    action: 'Completed 20th lesson',
    time: '2 days ago',
    icon: CalendarDays,
  },
  {
    type: 'student',
    name: 'Vikram Singh',
    action: 'Joined Sufi Music class',
    time: '3 days ago',
    icon: Users,
  },
];

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const totalTeachers = mockTeachers.length;
  const totalStudents = mockStudents.length;
  const totalLessons = mockStudents.reduce((sum, s) => sum + s.totalLessons, 0);
  const totalRevenue = monthlyEarnings.reduce((sum, m) => sum + m.earnings, 0);

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
                  <span>Dashboard</span>
                </div>
                <Typography.H1>Dashboard</Typography.H1>
                <Typography.Body className="mt-1">
                  Overview of teachers, students, lessons, and revenue
                </Typography.Body>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">Total Teachers</CardTitle>
                    <Users className="h-6 w-6 text-blue-600" />
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-foreground">{totalTeachers}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">Total Students</CardTitle>
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-foreground">{totalStudents}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">Total Lessons</CardTitle>
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-foreground">{totalLessons}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">Total Revenue</CardTitle>
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString('en-IN')}</CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Monthly Earnings (INR)</CardTitle>
                  </CardHeader>
                  <CardContent style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyEarnings}>
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={v => `₹${v/1000}k`} />
                        <Tooltip formatter={v => `₹${v.toLocaleString('en-IN')}`} />
                        <Bar dataKey="earnings" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Subject Distribution</CardTitle>
                  </CardHeader>
                  <CardContent style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectDistribution}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {subjectDistribution.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="divide-y divide-gray-200">
                      {recentActivities.map((activity, idx) => (
                        <li key={idx} className="py-3 flex items-center space-x-4">
                          <span className="bg-primary/10 rounded-full p-2">
                            <activity.icon className="h-6 w-6 text-primary" />
                          </span>
                          <div className="flex-1">
                            <div className="font-medium text-base text-foreground">{activity.name}</div>
                            <div className="text-sm text-muted-foreground">{activity.action}</div>
                          </div>
                          <div className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <div className="hidden md:block" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 