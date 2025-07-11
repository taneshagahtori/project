import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, BookOpen, Calendar } from 'lucide-react';
import Typography from '@/components/ui/typography';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/use-mobile';

const StyleGuide = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
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
            <div className="max-w-4xl mx-auto space-y-10">
              <section>
                <Typography.H1>Style Guide</Typography.H1>
                <Typography.Body className="mt-2">This page demonstrates the core UI elements and layout for consistent design across the app.</Typography.Body>
              </section>
              <section>
                <Typography.H2>Typography</Typography.H2>
                <Typography.H1>Heading 1</Typography.H1>
                <Typography.H2>Heading 2</Typography.H2>
                <Typography.H3>Heading 3</Typography.H3>
                <Typography.Body>Body text example. Use this for normal content.</Typography.Body>
                <Typography.Muted>Muted/secondary text example.</Typography.Muted>
              </section>
              <section>
                <Typography.H2>Colors</Typography.H2>
                <div className="flex gap-4 flex-wrap">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded">Primary</span>
                  <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded">Secondary</span>
                  <span className="bg-muted text-muted-foreground px-4 py-2 rounded">Muted</span>
                  <span className="bg-card text-foreground px-4 py-2 rounded border">Card</span>
                  <span className="bg-green-600 text-white px-4 py-2 rounded">Success</span>
                  <span className="bg-yellow-500 text-white px-4 py-2 rounded">Warning</span>
                  <span className="bg-red-600 text-white px-4 py-2 rounded">Error</span>
                </div>
              </section>
              <section>
                <Typography.H2>Buttons</Typography.H2>
                <div className="flex gap-4 flex-wrap">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                </div>
              </section>
              <section>
                <Typography.H2>Badges</Typography.H2>
                <div className="flex gap-4 flex-wrap">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
                  <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
                </div>
              </section>
              <section>
                <Typography.H2>Icons</Typography.H2>
                <div className="flex gap-6 items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                  <BookOpen className="h-8 w-8 text-green-600" />
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <Typography.Muted className="mt-2">Use Lucide icons with consistent size and color classes.</Typography.Muted>
              </section>
              <section>
                <Typography.H2>Cards & Stat Cards</Typography.H2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-semibold text-foreground">Total Teachers</CardTitle>
                      <Users className="h-6 w-6 text-blue-600" />
                    </CardHeader>
                    <CardContent className="text-2xl font-bold text-foreground">12</CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-semibold text-foreground">Total Students</CardTitle>
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </CardHeader>
                    <CardContent className="text-2xl font-bold text-foreground">48</CardContent>
                  </Card>
                </div>
              </section>
              <section>
                <Typography.H2>Layout</Typography.H2>
                <Typography.Body>
                  All pages should use this layout: sidebar always present, header at the top, main content in a <code>max-w-7xl mx-auto</code> container, and consistent padding (<code>p-4 md:p-6 lg:p-8</code>).
                </Typography.Body>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StyleGuide; 