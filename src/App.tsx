
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingLayout } from "./layouts/landing-layout";
import { DashboardLayout } from "./layouts/dashboard-layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Findings from "./pages/Findings";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import ScanHistory from "./pages/ScanHistory";
import Compliance from "./pages/Compliance";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Index />} />
          </Route>
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/findings" element={<Findings />} />
            <Route path="/dashboard/alerts" element={<Alerts />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/history" element={<ScanHistory />} />
            <Route path="/dashboard/compliance" element={<Compliance />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
