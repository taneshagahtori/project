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
import { Download, Eye, Trash2, UploadCloud } from 'lucide-react';

const mockDocuments = [
  { id: '1', name: 'M.A. Music Degree', type: 'Certification', uploaded: '2023-08-10', status: 'Verified', fileUrl: '#', },
  { id: '2', name: 'Aadhar Card', type: 'ID Proof', uploaded: '2023-08-12', status: 'Verified', fileUrl: '#', },
  { id: '3', name: 'PAN Card', type: 'ID Proof', uploaded: '2023-08-12', status: 'Pending', fileUrl: '#', },
  { id: '4', name: '2023-24 Work Contract', type: 'Contract', uploaded: '2023-08-15', status: 'Verified', fileUrl: '#', },
  { id: '5', name: '2022-23 Tax Statement', type: 'Tax Document', uploaded: '2023-08-20', status: 'Verified', fileUrl: '#', },
  { id: '6', name: 'Payment Statement Jan 2024', type: 'Payment', uploaded: '2024-02-01', status: 'Verified', fileUrl: '#', },
  { id: '7', name: 'Background Check', type: 'HR', uploaded: '2023-08-25', status: 'Verified', fileUrl: '#', },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Verified': return 'bg-green-100 text-green-800 border-green-200';
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const DocumentsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const [documents, setDocuments] = useState(mockDocuments);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ name: '', type: '', file: null as File | null });

  const handleDelete = (id: string) => {
    setDocuments(docs => docs.filter(doc => doc.id !== id));
  };

  const handleUpload = () => {
    if (!uploadForm.name || !uploadForm.type || !uploadForm.file) return;
    setDocuments(docs => [
      ...docs,
      {
        id: Math.random().toString(36).slice(2),
        name: uploadForm.name,
        type: uploadForm.type,
        uploaded: new Date().toISOString().slice(0, 10),
        status: 'Pending',
        fileUrl: '#',
      },
    ]);
    setUploadOpen(false);
    setUploadForm({ name: '', type: '', file: null });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={toggleSidebar} isMobile={isMobile} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <span>Documents</span>
                  </div>
                  <Typography.H1>Teacher Documents</Typography.H1>
                  <Typography.Body className="mt-1">Store, manage, and access important files related to the teacher. (Admins & teacher access)</Typography.Body>
                </div>
                <Button onClick={() => setUploadOpen(true)} className="flex gap-2"><UploadCloud className="h-5 w-5" />Upload Document</Button>
              </div>
              <div className="overflow-x-auto rounded border bg-card">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Uploaded</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map(doc => (
                      <tr key={doc.id} className="border-t">
                        <td className="p-3 font-medium">{doc.name}</td>
                        <td className="p-3">{doc.type}</td>
                        <td className="p-3">{doc.uploaded}</td>
                        <td className="p-3"><Badge className={statusColor(doc.status)}>{doc.status}</Badge></td>
                        <td className="p-3 flex gap-2">
                          <Button size="sm" variant="outline" className="flex gap-1"><Eye className="h-4 w-4" />View</Button>
                          <Button size="sm" variant="outline" className="flex gap-1"><Download className="h-4 w-4" />Download</Button>
                          <Button size="sm" variant="destructive" className="flex gap-1" onClick={() => handleDelete(doc.id)}><Trash2 className="h-4 w-4" />Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Upload Dialog */}
              <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>Fill in the details and select a file to upload.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Input placeholder="Document Name" value={uploadForm.name} onChange={e => setUploadForm(f => ({ ...f, name: e.target.value }))} />
                    <Input placeholder="Type (e.g. Certification, ID Proof, Contract, Tax, Payment, HR)" value={uploadForm.type} onChange={e => setUploadForm(f => ({ ...f, type: e.target.value }))} />
                    <Input type="file" onChange={e => setUploadForm(f => ({ ...f, file: e.target.files?.[0] || null }))} />
                    <Button className="w-full mt-2" onClick={handleUpload} disabled={!uploadForm.name || !uploadForm.type || !uploadForm.file}>Upload</Button>
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

export default DocumentsPage; 