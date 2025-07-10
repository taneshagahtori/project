
import React, { useState } from 'react';
import { mockTeacher } from '@/data/mockData';
import { Teacher } from '@/types/teacher';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import TeacherDetailView from '@/components/teacher/TeacherDetailView';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [teacher, setTeacher] = useState<Teacher>(mockTeacher);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleTeacherUpdate = (updatedTeacher: Teacher) => {
    setTeacher(updatedTeacher);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
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
                  <span>Teachers</span>
                  <span>/</span>
                  <span>{teacher.name}</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground">Teacher Profile</h1>
                <p className="text-muted-foreground mt-1">
                  Manage teacher information, schedule, and performance
                </p>
              </div>
              
              <TeacherDetailView 
                teacher={teacher} 
                onUpdate={handleTeacherUpdate} 
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
