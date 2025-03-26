
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingLayout } from "./layouts/landing-layout";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { AuthProvider } from "./contexts/auth-context";
import { ProtectedRoute } from "./components/protected-route";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Findings from "./pages/Findings";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import ScanHistory from "./pages/ScanHistory";
import Compliance from "./pages/Compliance";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<LandingLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
            </Route>
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="findings" element={
                <ProtectedRoute requiredPermission="read:findings">
                  <Findings />
                </ProtectedRoute>
              } />
              <Route path="alerts" element={
                <ProtectedRoute requiredRole={['admin', 'manager', 'analyst']}>
                  <Alerts />
                </ProtectedRoute>
              } />
              <Route path="reports" element={
                <ProtectedRoute requiredPermission="read:reports">
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="history" element={
                <ProtectedRoute>
                  <ScanHistory />
                </ProtectedRoute>
              } />
              <Route path="compliance" element={
                <ProtectedRoute requiredRole={['admin', 'manager']}>
                  <Compliance />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute requiredRole="admin">
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
