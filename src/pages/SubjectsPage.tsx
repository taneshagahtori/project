import React, { useState } from "react";
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import Typography from '@/components/ui/typography';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockTeachers } from '@/data/mockData';

// Flatten all qualifications from all teachers
const allPrivate = mockTeachers.flatMap(t => t.privateQualifications.map(q => ({ ...q, teacher: t.name })));
const allGroup = mockTeachers.flatMap(t => t.groupQualifications.map(q => ({ ...q, teacher: t.name })));

const SubjectsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const [privateQuals, setPrivateQuals] = useState(allPrivate);
  const [groupQuals, setGroupQuals] = useState(allGroup);
  const [modal, setModal] = useState<{ open: boolean; type: 'private' | 'group'; qual?: any } | null>(null);
  const [form, setForm] = useState({ name: '', rate: '', type: 'private', teacher: '' });

  // Open modal for add/edit
  const openModal = (type: 'private' | 'group', qual?: any) => {
    setForm(qual ? { name: qual.name, rate: qual.rate, type, teacher: qual.teacher } : { name: '', rate: '', type, teacher: '' });
    setModal({ open: true, type, qual });
  };
  // Save qualification
  const saveQual = () => {
    if (!form.name || !form.rate || !form.teacher) return;
    const newQual = { id: Math.random().toString(36).slice(2), name: form.name, rate: Number(form.rate), type: form.type, teacher: form.teacher };
    if (modal.type === 'private') {
      setPrivateQuals(prev => modal.qual ? prev.map(q => q.id === modal.qual.id ? newQual : q) : [...prev, newQual]);
    } else {
      setGroupQuals(prev => modal.qual ? prev.map(q => q.id === modal.qual.id ? newQual : q) : [...prev, newQual]);
    }
    setModal(null);
  };
  // Remove qualification
  const removeQual = (type: 'private' | 'group', id: string) => {
    if (type === 'private') setPrivateQuals(prev => prev.filter(q => q.id !== id));
    else setGroupQuals(prev => prev.filter(q => q.id !== id));
  };

  // Get teacher options
  const teacherOptions = mockTeachers.map(t => t.name);

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
                  <span>Subjects</span>
                </div>
                <Typography.H1>Subjects & Qualifications</Typography.H1>
                <Typography.Body className="mt-1">View, add, edit, or remove subjects/qualifications for all teachers.</Typography.Body>
              </div>
              {/* Private Qualifications Table */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <Typography.H2>Private Qualifications</Typography.H2>
                  <Button onClick={() => openModal('private')}>Add Private Qualification</Button>
                </div>
                <div className="overflow-x-auto rounded border bg-card">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Name</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Category</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Hourly Rate</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Teacher</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {privateQuals.map(q => (
                        <tr key={q.id} className="border-t">
                          <td className="px-3 py-2 whitespace-nowrap">{q.name}</td>
                          <td className="px-3 py-2"><Badge className="bg-blue-100 text-blue-800 border-blue-200">Private</Badge></td>
                          <td className="px-3 py-2">₹{q.rate}</td>
                          <td className="px-3 py-2">{q.teacher}</td>
                          <td className="px-3 py-2 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openModal('private', q)}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => removeQual('private', q.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Group Qualifications Table */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <Typography.H2>Group Qualifications</Typography.H2>
                  <Button onClick={() => openModal('group')}>Add Group Qualification</Button>
                </div>
                <div className="overflow-x-auto rounded border bg-card">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Name</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Category</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Hourly Rate</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Teacher</th>
                        <th className="px-3 py-2 text-left font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupQuals.map(q => (
                        <tr key={q.id} className="border-t">
                          <td className="px-3 py-2 whitespace-nowrap">{q.name}</td>
                          <td className="px-3 py-2"><Badge className="bg-green-100 text-green-800 border-green-200">Group</Badge></td>
                          <td className="px-3 py-2">₹{q.rate}</td>
                          <td className="px-3 py-2">{q.teacher}</td>
                          <td className="px-3 py-2 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openModal('group', q)}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => removeQual('group', q.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Add/Edit Modal */}
              <Dialog open={!!modal} onOpenChange={open => !open && setModal(null)}>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>{modal?.qual ? 'Edit' : 'Add'} {modal?.type === 'private' ? 'Private' : 'Group'} Qualification</DialogTitle>
                    <DialogDescription>Enter subject/qualification details below.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Input placeholder="Subject/Qualification Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    <Input placeholder="Hourly Rate (INR)" type="number" value={form.rate} onChange={e => setForm(f => ({ ...f, rate: e.target.value }))} />
                    <Select value={form.teacher} onValueChange={v => setForm(f => ({ ...f, teacher: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherOptions.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button className="w-full mt-2" onClick={saveQual} disabled={!form.name || !form.rate || !form.teacher}>Save</Button>
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

export default SubjectsPage; 