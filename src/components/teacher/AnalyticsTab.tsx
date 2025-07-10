
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar, 
  Clock, 
  Star,
  Target,
  Award,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const monthlyEarnings = [
  { month: 'Aug', earnings: 2400, lessons: 20 },
  { month: 'Sep', earnings: 2800, lessons: 23 },
  { month: 'Oct', earnings: 3100, lessons: 26 },
  { month: 'Nov', earnings: 2950, lessons: 24 },
  { month: 'Dec', earnings: 3200, lessons: 27 },
  { month: 'Jan', earnings: 3240, lessons: 28 }
];

const subjectDistribution = [
  { name: 'Vocal Jazz', value: 35, color: '#8884d8' },
  { name: 'Vocal Contemporary', value: 25, color: '#82ca9d' },
  { name: 'Vocal Pop', value: 20, color: '#ffc658' },
  { name: 'Vocal RnB', value: 15, color: '#ff7c7c' },
  { name: 'Vocal Core', value: 5, color: '#8dd1e1' }
];

const weeklySchedule = [
  { day: 'Mon', hours: 4 },
  { day: 'Tue', hours: 6 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 2 }
];

const AnalyticsTab: React.FC = () => {
  const totalEarnings = monthlyEarnings.reduce((sum, month) => sum + month.earnings, 0);
  const avgMonthlyEarnings = totalEarnings / monthlyEarnings.length;
  const totalLessons = monthlyEarnings.reduce((sum, month) => sum + month.lessons, 0);
  const avgLessonsPerMonth = totalLessons / monthlyEarnings.length;

  const performanceMetrics = [
    {
      title: 'Monthly Revenue',
      value: '$3,240',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Students',
      value: '24',
      change: '+2 this month',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Lessons This Month',
      value: '28',
      change: '+4 from last month',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Average Rating',
      value: '4.9',
      change: '+0.2 from last month',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Hours This Week',
      value: '38h',
      change: '+6h from last week',
      trend: 'up',
      icon: Clock,
      color: 'text-indigo-600'
    },
    {
      title: 'Completion Rate',
      value: '96%',
      change: '+1% from last month',
      trend: 'up',
      icon: Target,
      color: 'text-emerald-600'
    }
  ];

  const achievements = [
    { title: 'Top Performer', description: '5-star rating for 3 months', icon: Award, color: 'text-yellow-600' },
    { title: 'Student Favorite', description: '95% student retention', icon: Users, color: 'text-blue-600' },
    { title: 'Consistent Teacher', description: '100% lesson attendance', icon: Calendar, color: 'text-green-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center mt-1">
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${metric.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Monthly Earnings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                  <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Subject Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Weekly Teaching Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySchedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} hours`, 'Teaching Hours']} />
                  <Bar dataKey="hours" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className={`p-2 rounded-full bg-background ${achievement.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">${avgMonthlyEarnings.toFixed(0)}</p>
            <p className="text-sm text-muted-foreground">Average Monthly Earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{avgLessonsPerMonth.toFixed(0)}</p>
            <p className="text-sm text-muted-foreground">Average Lessons per Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">4.9</p>
            <p className="text-sm text-muted-foreground">Overall Rating</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
