
import React from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  BarChart3, 
  Settings, 
  DollarSign, 
  GraduationCap,
  MessageSquare,
  FileText,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, current: false },
  { name: 'Teachers', href: '/teachers', icon: Users, current: true },
  { name: 'Students', href: '/students', icon: GraduationCap, current: false },
  { name: 'Schedule', href: '/schedule', icon: Calendar, current: false },
  { name: 'Subjects', href: '/subjects', icon: BookOpen, current: false },
  { name: 'Payments', href: '/payments', icon: DollarSign, current: false },
  { name: 'Messages', href: '/messages', icon: MessageSquare, current: false },
  { name: 'Reports', href: '/reports', icon: BarChart3, current: false },
  { name: 'Documents', href: '/documents', icon: FileText, current: false },
  { name: 'Settings', href: '/settings', icon: Settings, current: false },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">TeacherHub</span>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={item.current ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10",
                    item.current && "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </nav>
          
          <div className="border-t p-4">
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@teacherhub.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
