import React, { useState } from "react";
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, BookOpen, Calendar, Clock, TrendingUp, TrendingDown, Star, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { mockTeachers } from '@/data/mockData';
import { mockStudents } from './StudentsPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Download } from 'lucide-react';

// Mock data for reports (combine from Dashboard, Payments, AnalyticsTab)
const monthlyEarnings = [
  { month: 'Aug', earnings: 192000, lessons: 20 },
  { month: 'Sep', earnings: 224000, lessons: 23 },
  { month: 'Oct', earnings: 248000, lessons: 26 },
  { month: 'Nov', earnings: 236000, lessons: 24 },
  { month: 'Dec', earnings: 256000, lessons: 27 },
  { month: 'Jan', earnings: 259200, lessons: 28 }
];
const subjectDistribution = [
  { name: 'Hindustani Classical', value: 35, color: '#8884d8' },
  { name: 'Bollywood Singing', value: 25, color: '#82ca9d' },
  { name: 'Tabla', value: 20, color: '#ffc658' },
  { name: 'Carnatic Music', value: 15, color: '#ff7c7c' },
  { name: 'Western Classical', value: 5, color: '#8dd1e1' }
];
const weeklyHours = [
  { day: 'Mon', hours: 4 },
  { day: 'Tue', hours: 6 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 2 }
];
const attendanceData = [
  { month: 'Aug', attendance: 95 },
  { month: 'Sep', attendance: 97 },
  { month: 'Oct', attendance: 96 },
  { month: 'Nov', attendance: 98 },
  { month: 'Dec', attendance: 97 },
  { month: 'Jan', attendance: 99 }
];
const engagementData = [
  { month: 'Aug', engagement: 80 },
  { month: 'Sep', engagement: 85 },
  { month: 'Oct', engagement: 88 },
  { month: 'Nov', engagement: 90 },
  { month: 'Dec', engagement: 92 },
  { month: 'Jan', engagement: 95 }
];

const totalLessons = mockStudents.reduce((sum, s) => sum + (s.totalLessons || 0), 0);
const totalHours = totalLessons * 1; // Assume 1 hour per lesson for mock
const totalStudents = mockStudents.length;
const totalTeachers = mockTeachers.length;
const totalEarnings = monthlyEarnings.reduce((sum, m) => sum + m.earnings, 0);
const avgAttendance = attendanceData.reduce((sum, m) => sum + m.attendance, 0) / attendanceData.length;
const avgEngagement = engagementData.reduce((sum, m) => sum + m.engagement, 0) / engagementData.length;

const lessonTypes = ['All', 'Private', 'Group'];
const studentsList = mockStudents.map(s => s.name);

function filterDataByDateAndType(data, start, end, type) {
  // Always return at least sample/mock data
  if (!data || data.length === 0) {
    return [
      { month: 'Sample', earnings: 100000, lessons: 10 },
      { month: 'Sample2', earnings: 120000, lessons: 12 }
    ];
  }
  return data;
}

function exportCSV(data, filename) {
  const csvRows = [Object.keys(data[0]).join(',')];
  for (const row of data) {
    csvRows.push(Object.values(row).join(','));
  }
  const csv = csvRows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

function exportPDF() {
  window.print(); // Simple mock for PDF export
}

const ReportsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedType, setSelectedType] = useState('All');

  // Filtered data (mock: no real filtering)
  const filteredMonthly = filterDataByDateAndType(monthlyEarnings, dateRange.start, dateRange.end, selectedType);

  // Breakdown by student (mock)
  const lessonsByStudent = mockStudents.length > 0 ? mockStudents.map(s => ({
    name: s.name,
    lessons: s.totalLessons || 0,
    subject: s.subject,
    type: ['Private', 'Group'][Math.floor(Math.random()*2)],
    earnings: (s.totalLessons || 0) * (s.hourlyRate || 0)
  })) : [
    { name: 'Sample Student', lessons: 10, subject: 'Sample Subject', type: 'Private', earnings: 10000 }
  ];

  // Breakdown by type (mock)
  const lessonsByType = [
    { type: 'Private', lessons: 120, earnings: 120000 },
    { type: 'Group', lessons: 80, earnings: 80000 }
  ];

  // For subjectDistribution, engagementData, attendanceData, weeklyHours, always provide sample data if empty
  const safeSubjectDistribution = subjectDistribution.length > 0 ? subjectDistribution : [
    { name: 'Sample Subject', value: 10, color: '#8884d8' }
  ];
  const safeEngagementData = engagementData.length > 0 ? engagementData : [
    { month: 'Sample', engagement: 80 }
  ];
  const safeAttendanceData = attendanceData.length > 0 ? attendanceData : [
    { month: 'Sample', attendance: 95 }
  ];
  const safeWeeklyHours = weeklyHours.length > 0 ? weeklyHours : [
    { day: 'Sample', hours: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={toggleSidebar} isMobile={isMobile} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <span>Reports</span>
                  </div>
                  <Typography.H1>Reports & Insights</Typography.H1>
                  <Typography.Body className="mt-1">Insights and summaries about lessons, hours, payments, engagement, attendance, and performance over time.</Typography.Body>
                </div>
                {/* Filters */}
                <div className="flex flex-wrap gap-2 items-end">
                  <div>
                    <label className="block text-xs mb-1">Start Date</label>
                    <Input type="date" value={dateRange.start} onChange={e => setDateRange(r => ({ ...r, start: e.target.value }))} className="w-32" />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">End Date</label>
                    <Input type="date" value={dateRange.end} onChange={e => setDateRange(r => ({ ...r, end: e.target.value }))} className="w-32" />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Lesson Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {lessonTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="flex gap-2" onClick={() => exportCSV(lessonsByStudent, 'lessons-by-student.csv')}><Download className="h-4 w-4" />Export CSV</Button>
                  <Button variant="outline" className="flex gap-2" onClick={exportPDF}><Download className="h-4 w-4" />Export PDF</Button>
                </div>
              </div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">Lessons Taught</CardTitle>
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </CardHeader>
                  <CardContent className="text-xl font-bold text-foreground">{totalLessons}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">Hours Worked</CardTitle>
                    <Clock className="h-5 w-5 text-purple-600" />
                  </CardHeader>
                  <CardContent className="text-xl font-bold text-foreground">{totalHours}h</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">Total Earnings</CardTitle>
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </CardHeader>
                  <CardContent className="text-xl font-bold text-foreground">₹{totalEarnings.toLocaleString('en-IN')}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">Students</CardTitle>
                    <Users className="h-5 w-5 text-orange-600" />
                  </CardHeader>
                  <CardContent className="text-xl font-bold text-foreground">{totalStudents}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">Teachers</CardTitle>
                    <Star className="h-5 w-5 text-yellow-600" />
                  </CardHeader>
                  <CardContent className="text-xl font-bold text-foreground">{totalTeachers}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">Avg. Attendance</CardTitle>
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </CardHeader>
                  <CardContent className="text-xl font-bold text-foreground">{avgAttendance}%</CardContent>
                </Card>
              </div>
              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Lessons & Earnings Over Time</CardTitle>
                  </CardHeader>
                  <CardContent style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredMonthly}>
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" tickFormatter={v => `${v}`} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={v => `₹${v/1000}k`} />
                        <Tooltip formatter={v => typeof v === 'number' ? v.toLocaleString('en-IN') : v} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="lessons" fill="#8884d8" name="Lessons" />
                        <Bar yAxisId="right" dataKey="earnings" fill="#82ca9d" name="Earnings" />
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
                          data={safeSubjectDistribution}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {safeSubjectDistribution.map((entry, idx) => (
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
              {/* Breakdown by type and student */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Lessons by Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Lessons</th>
                          <th className="text-left p-2">Earnings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lessonsByType.map(row => (
                          <tr key={row.type}>
                            <td className="p-2 font-medium">{row.type}</td>
                            <td className="p-2">{row.lessons}</td>
                            <td className="p-2">₹{row.earnings.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Lessons by Student</CardTitle>
                  </CardHeader>
                  <CardContent style={{ maxHeight: 300, overflowY: 'auto' }}>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Student</th>
                          <th className="text-left p-2">Subject</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Lessons</th>
                          <th className="text-left p-2">Earnings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lessonsByStudent.map(row => (
                          <tr key={row.name}>
                            <td className="p-2 font-medium">{row.name}</td>
                            <td className="p-2">{row.subject}</td>
                            <td className="p-2">{row.type}</td>
                            <td className="p-2">{row.lessons}</td>
                            <td className="p-2">₹{row.earnings.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
              {/* Engagement & Attendance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Student Engagement Over Time</CardTitle>
                  </CardHeader>
                  <CardContent style={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={safeEngagementData}>
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={v => `${v}%`} />
                        <Line type="monotone" dataKey="engagement" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Attendance Rate Over Time</CardTitle>
                  </CardHeader>
                  <CardContent style={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={safeAttendanceData}>
                        <XAxis dataKey="month" />
                        <YAxis domain={[90, 100]} />
                        <Tooltip formatter={v => `${v}%`} />
                        <Line type="monotone" dataKey="attendance" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              {/* Weekly Hours */}
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Weekly Teaching Hours</CardTitle>
                  </CardHeader>
                  <CardContent style={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={safeWeeklyHours}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip formatter={v => `${v} hours`} />
                        <Bar dataKey="hours" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 