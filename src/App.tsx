import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentsPage from "./pages/StudentsPage";
import SchedulePage from "./pages/SchedulePage";
import SubjectsPage from "./pages/SubjectsPage";
import PaymentsPage from "./pages/PaymentsPage";
import MessagesPage from "./pages/MessagesPage";
import ReportsPage from "./pages/ReportsPage";
import DocumentsPage from "./pages/DocumentsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
