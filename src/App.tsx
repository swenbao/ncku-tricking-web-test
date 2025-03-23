
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/auth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import TricktionaryPage from "./pages/Tricktionary";
import PointsPage from "./pages/Points";
import BookingPage from "./pages/Booking";
import BookingHistoryPage from "./pages/BookingHistory";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import TricktionaryManager from "./pages/admin/tricktionary";
import ClassManager from "./pages/admin/ClassManager";
import CourseCardManager from "./pages/admin/CourseCardManager";
import OrdersManager from "./pages/admin/OrdersManager";
import PrerequisitesManager from "./pages/admin/PrerequisitesManager";

const queryClient = new QueryClient();

// Protected route wrapper component
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Protected route for logged-in users only
const ProtectedUserRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes - accessible to everyone */}
              <Route path="/" element={<Index />} />
              <Route path="/tricktionary" element={<TricktionaryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected user routes - require login */}
              <Route path="/points" element={
                <ProtectedUserRoute>
                  <PointsPage />
                </ProtectedUserRoute>
              } />
              <Route path="/booking" element={
                <ProtectedUserRoute>
                  <BookingPage />
                </ProtectedUserRoute>
              } />
              <Route path="/booking-history" element={
                <ProtectedUserRoute>
                  <BookingHistoryPage />
                </ProtectedUserRoute>
              } />
              <Route path="/profile" element={
                <ProtectedUserRoute>
                  <ProfilePage />
                </ProtectedUserRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/tricktionary" element={
                <ProtectedAdminRoute>
                  <TricktionaryManager />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/classes" element={
                <ProtectedAdminRoute>
                  <ClassManager />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/course-cards" element={
                <ProtectedAdminRoute>
                  <CourseCardManager />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedAdminRoute>
                  <OrdersManager />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/prerequisites" element={
                <ProtectedAdminRoute>
                  <PrerequisitesManager />
                </ProtectedAdminRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
