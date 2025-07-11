import React, { useState } from "react";
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockTeachers } from '@/data/mockData';
import { mockStudents } from '@/pages/StudentsPage';
import { DollarSign, Clock, CheckCircle, FileText, ArrowUpDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

// Mock payment/invoice data
const mockInvoices = [
  { id: '1', student: 'Aarav Sharma', subject: 'Hindustani Classical', date: '2024-01-10', hours: 2, rate: 800, amount: 1600, status: 'unpaid' },
  { id: '2', student: 'Priya Patel', subject: 'Carnatic Music', date: '2024-01-09', hours: 1, rate: 1000, amount: 1000, status: 'paid' },
  { id: '3', student: 'Rahul Gupta', subject: 'Bollywood Singing', date: '2024-01-08', hours: 1, rate: 600, amount: 600, status: 'paid' },
  { id: '4', student: 'Ananya Reddy', subject: 'Western Classical', date: '2024-01-07', hours: 1.5, rate: 900, amount: 1350, status: 'unpaid' },
  { id: '5', student: 'Vikram Singh', subject: 'Sufi Music', date: '2024-01-06', hours: 2, rate: 950, amount: 1900, status: 'paid' },
];

const mockHistory = [
  { id: 'h1', date: '2024-01-09', description: 'Payment received from Priya Patel', amount: 1000, status: 'paid' },
  { id: 'h2', date: '2024-01-08', description: 'Payment received from Rahul Gupta', amount: 600, status: 'paid' },
  { id: 'h3', date: '2024-01-06', description: 'Payment received from Vikram Singh', amount: 1900, status: 'paid' },
];

const totalOwed = mockInvoices.filter(i => i.status === 'unpaid').reduce((sum, i) => sum + i.amount, 0);
const totalPaid = mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
const totalEarnings = totalPaid + totalOwed;

// Calculate quick summary values
const thisMonth = '2024-01';
const earningsThisMonth = mockInvoices.filter(i => i.date.startsWith(thisMonth) && i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
const pendingPayments = mockInvoices.filter(i => i.status === 'unpaid').length;
const totalPaidCount = mockInvoices.filter(i => i.status === 'paid').length;
const upcomingInvoices = mockInvoices.filter(i => i.status === 'unpaid' && i.date >= '2024-01-08').length;

const lessonTypes = ['Private', 'Group'];

const mockInvoiceRecords = [
  { id: 'INV-001', issued: '2024-01-05', paid: '2024-01-09', method: 'UPI', amount: 1000, status: 'Paid' },
  { id: 'INV-002', issued: '2024-01-06', paid: '', method: 'Bank Transfer', amount: 1350, status: 'Pending' },
  { id: 'INV-003', issued: '2024-01-07', paid: '2024-01-10', method: 'Cash', amount: 1600, status: 'Paid' },
  { id: 'INV-004', issued: '2024-01-08', paid: '', method: 'UPI', amount: 1900, status: 'Pending' },
];

const PaymentsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [sortBy, setSortBy] = useState<'date' | 'student' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);

  const handleLessonSelect = (id: string) => {
    setSelectedLessonIds(prev => prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]);
  };
  const selectedLessons = invoices.filter(inv => selectedLessonIds.includes(inv.id));
  const totalSelected = selectedLessons.reduce((sum, l) => sum + l.amount, 0);

  const markAsPaid = (id: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'paid' } : inv));
  };
  const markAsUnpaid = (id: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'unpaid' } : inv));
  };

  // Sorting and filtering logic
  const sortedInvoices = [...invoices]
    .filter(inv => filterStatus === 'all' ? true : inv.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
      } else if (sortBy === 'student') {
        return sortOrder === 'asc' ? a.student.localeCompare(b.student) : b.student.localeCompare(a.student);
      } else if (sortBy === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });

  const handleSort = (col: 'date' | 'student' | 'amount') => {
    if (sortBy === col) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('asc');
    }
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
                  <span>Payments</span>
                </div>
                <Typography.H1>Payments & Invoices</Typography.H1>
                <Typography.Body className="mt-1">Track payments, view invoices, and see your earnings summary.</Typography.Body>
              </div>
              {/* Quick summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <Card className="flex flex-row items-center gap-4 p-4">
                  <div className="bg-blue-100 text-blue-700 rounded-full p-2"><DollarSign className="h-6 w-6" /></div>
                  <div>
                    <div className="text-xs text-muted-foreground">Earnings This Month</div>
                    <div className="text-lg font-bold text-foreground">₹{earningsThisMonth.toLocaleString('en-IN')}</div>
                  </div>
                </Card>
                <Card className="flex flex-row items-center gap-4 p-4">
                  <div className="bg-yellow-100 text-yellow-700 rounded-full p-2"><Clock className="h-6 w-6" /></div>
                  <div>
                    <div className="text-xs text-muted-foreground">Pending Payments</div>
                    <div className="text-lg font-bold text-foreground">{pendingPayments}</div>
                  </div>
                </Card>
                <Card className="flex flex-row items-center gap-4 p-4">
                  <div className="bg-green-100 text-green-700 rounded-full p-2"><CheckCircle className="h-6 w-6" /></div>
                  <div>
                    <div className="text-xs text-muted-foreground">Total Paid</div>
                    <div className="text-lg font-bold text-foreground">{totalPaidCount}</div>
                  </div>
                </Card>
                <Card className="flex flex-row items-center gap-4 p-4">
                  <div className="bg-purple-100 text-purple-700 rounded-full p-2"><FileText className="h-6 w-6" /></div>
                  <div>
                    <div className="text-xs text-muted-foreground">Upcoming Invoices</div>
                    <div className="text-lg font-bold text-foreground">{upcomingInvoices}</div>
                  </div>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">Total Owed</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-yellow-700">₹{totalOwed.toLocaleString('en-IN')}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">Total Paid</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-green-700">₹{totalPaid.toLocaleString('en-IN')}</CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold text-blue-700">₹{totalEarnings.toLocaleString('en-IN')}</CardContent>
                </Card>
              </div>
              <div className="mb-8">
                <Typography.H2>Lesson Invoices</Typography.H2>
                <div className="flex items-center gap-4 mt-4 mb-2">
                  <label className="text-sm">Filter:</label>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value as 'all' | 'paid' | 'unpaid')}
                  >
                    <option value="all">All</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr>
                        <th className="border px-2 py-1 bg-muted cursor-pointer" onClick={() => handleSort('student')}>
                          Student Name <ArrowUpDown className="inline h-4 w-4 ml-1 align-text-bottom" />
                        </th>
                        <th className="border px-2 py-1 bg-muted cursor-pointer" onClick={() => handleSort('date')}>
                          Date & Time <ArrowUpDown className="inline h-4 w-4 ml-1 align-text-bottom" />
                        </th>
                        <th className="border px-2 py-1 bg-muted">Lesson Type</th>
                        <th className="border px-2 py-1 bg-muted">Duration</th>
                        <th className="border px-2 py-1 bg-muted">Hourly Rate</th>
                        <th className="border px-2 py-1 bg-muted cursor-pointer" onClick={() => handleSort('amount')}>
                          Total Amount <ArrowUpDown className="inline h-4 w-4 ml-1 align-text-bottom" />
                        </th>
                        <th className="border px-2 py-1 bg-muted">Status</th>
                        <th className="border px-2 py-1 bg-muted">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedInvoices.map(inv => (
                        <tr key={inv.id}>
                          <td className="border px-2 py-1">{inv.student}</td>
                          <td className="border px-2 py-1">{inv.date} 10:00</td>
                          <td className="border px-2 py-1">{lessonTypes[Number(inv.id) % lessonTypes.length]}</td>
                          <td className="border px-2 py-1">{inv.hours}h</td>
                          <td className="border px-2 py-1">₹{inv.rate}</td>
                          <td className="border px-2 py-1 font-semibold">₹{inv.amount}</td>
                          <td className="border px-2 py-1">
                            <Badge className={inv.status === 'paid' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}>
                              {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="border px-2 py-1 flex gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="secondary">Send</Button>
                            {inv.status === 'unpaid' ? (
                              <Button size="sm" onClick={() => markAsPaid(inv.id)}>Mark Paid</Button>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => markAsUnpaid(inv.id)}>Mark Unpaid</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mb-8">
                <Typography.H2>Payment History</Typography.H2>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr>
                        <th className="border px-2 py-1 bg-muted">Date</th>
                        <th className="border px-2 py-1 bg-muted">Description</th>
                        <th className="border px-2 py-1 bg-muted">Amount</th>
                        <th className="border px-2 py-1 bg-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockHistory.map(h => (
                        <tr key={h.id}>
                          <td className="border px-2 py-1">{h.date}</td>
                          <td className="border px-2 py-1">{h.description}</td>
                          <td className="border px-2 py-1 font-semibold">₹{h.amount}</td>
                          <td className="border px-2 py-1">
                            <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mb-8">
                <Typography.H2>Earnings Summary</Typography.H2>
                <ul className="mt-4 space-y-2">
                  {mockInvoices.map(inv => (
                    <li key={inv.id} className="flex items-center gap-4 text-sm">
                      <span className="font-medium">{inv.student}</span>
                      <span className="text-muted-foreground">{inv.subject}</span>
                      <span>{inv.hours}h × ₹{inv.rate}/hr = <span className="font-semibold">₹{inv.amount}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <Typography.H2>Generate/Send Invoice</Typography.H2>
                <Button variant="secondary" onClick={() => setGenerateModalOpen(true)}>Generate Invoice</Button>
                <Dialog open={generateModalOpen} onOpenChange={setGenerateModalOpen}>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Generate Invoice</DialogTitle>
                      <DialogDescription>Select lessons, confirm rates, and preview before sending or downloading.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium mb-2">Select Lessons</div>
                        <div className="max-h-40 overflow-y-auto border rounded p-2">
                          {invoices.map(inv => (
                            <label key={inv.id} className="flex items-center gap-2 py-1">
                              <Checkbox checked={selectedLessonIds.includes(inv.id)} onCheckedChange={() => handleLessonSelect(inv.id)} />
                              <span className="text-sm">{inv.student} - {inv.subject} ({inv.date}) - ₹{inv.amount}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-2">Confirm Rates</div>
                        <ul className="text-sm space-y-1">
                          {selectedLessons.map(lesson => (
                            <li key={lesson.id}>
                              {lesson.student}: {lesson.hours}h × ₹{lesson.rate}/hr = <span className="font-semibold">₹{lesson.amount}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium mb-2">Preview Invoice</div>
                        <div className="bg-muted rounded p-3">
                          <div className="text-sm">Lessons: {selectedLessons.length}</div>
                          <div className="text-sm">Total: <span className="font-bold">₹{totalSelected.toLocaleString('en-IN')}</span></div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" onClick={() => alert('Mock PDF download')}>Download PDF</Button>
                        <Button onClick={() => alert('Mock email sent')}>Send via Email</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mb-8">
                <Typography.H2>Invoice Records</Typography.H2>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr>
                        <th className="border px-2 py-1 bg-muted">Invoice #</th>
                        <th className="border px-2 py-1 bg-muted">Date Issued</th>
                        <th className="border px-2 py-1 bg-muted">Date Paid</th>
                        <th className="border px-2 py-1 bg-muted">Payment Method</th>
                        <th className="border px-2 py-1 bg-muted">Total Amount</th>
                        <th className="border px-2 py-1 bg-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockInvoiceRecords.map(rec => (
                        <tr key={rec.id}>
                          <td className="border px-2 py-1 font-medium">{rec.id}</td>
                          <td className="border px-2 py-1">{rec.issued}</td>
                          <td className="border px-2 py-1">{rec.paid || <span className='text-muted-foreground'>-</span>}</td>
                          <td className="border px-2 py-1">{rec.method}</td>
                          <td className="border px-2 py-1 font-semibold">₹{rec.amount}</td>
                          <td className="border px-2 py-1">
                            <Badge className={rec.status === 'Paid' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}>
                              {rec.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage; 