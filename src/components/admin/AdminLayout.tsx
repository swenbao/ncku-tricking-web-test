
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  CalendarDays, 
  CreditCard, 
  Users, 
  Settings,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not an admin
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/admin' },
    { label: 'Tricktionary', icon: <FileText className="w-5 h-5" />, href: '/admin/tricktionary' },
    { label: 'Class Management', icon: <CalendarDays className="w-5 h-5" />, href: '/admin/classes' },
    { label: 'Course Cards', icon: <CreditCard className="w-5 h-5" />, href: '/admin/course-cards' },
    { label: 'Orders', icon: <Users className="w-5 h-5" />, href: '/admin/orders' },
    { label: 'Advanced Class Prerequisites', icon: <Settings className="w-5 h-5" />, href: '/admin/prerequisites' },
  ];
  
  const handleBackToMainSite = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 fixed h-full">
        <div className="p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <Separator />
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    window.location.pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => navigate(item.href)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </li>
            ))}
            <li className="pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-left font-normal"
                onClick={handleBackToMainSite}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="ml-2">Back to Main Site</span>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-left font-normal text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-2">Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
