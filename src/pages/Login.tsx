
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState<'student' | 'admin'>('student');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use predefined accounts for demo purposes
      // For admin, use admin@example.com with any password
      // For student, use any other email with any password
      if (formType === 'admin' && email !== 'admin@example.com') {
        toast({
          title: language === 'en' ? 'Login Failed' : '登入失敗',
          description: language === 'en' ? 'Invalid admin credentials' : '管理員帳號或密碼不正確',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
      
      await login(email, password);
      toast({
        title: language === 'en' ? 'Login Successful' : '登入成功',
        description: language === 'en' ? 'Welcome back!' : '歡迎回來！',
      });
      
      // Redirect based on user role
      if (email === 'admin@example.com') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: language === 'en' ? 'Login Failed' : '登入失敗',
        description: language === 'en' ? 'Invalid credentials' : '帳號或密碼不正確',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container max-w-md px-4 md:px-6">
          <Tabs value={formType} onValueChange={(v) => setFormType(v as 'student' | 'admin')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">
                {language === 'en' ? 'Student Login' : '學生登入'}
              </TabsTrigger>
              <TabsTrigger value="admin">
                {language === 'en' ? 'Admin Login' : '管理員登入'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Student Login' : '學生登入'}</CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Enter your credentials to access your account' 
                      : '請輸入您的帳號密碼登入您的帳戶'}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {language === 'en' ? 'Email' : '電子郵件'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={language === 'en' ? 'student@example.com' : 'student@example.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">
                          {language === 'en' ? 'Password' : '密碼'}
                        </Label>
                        <Link
                          to="#"
                          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
                        >
                          {language === 'en' ? 'Forgot password?' : '忘記密碼？'}
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' 
                          ? '(For demo, use any email except admin@example.com)' 
                          : '(演示用：使用任何電子郵件，除了admin@example.com)'}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading 
                        ? (language === 'en' ? 'Logging in...' : '登入中...') 
                        : (language === 'en' ? 'Sign In' : '登入')}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      {language === 'en' ? 'Don\'t have an account?' : '還沒有帳戶？'}{' '}
                      <Link
                        to="/signup"
                        className="underline underline-offset-4 hover:text-primary"
                      >
                        {language === 'en' ? 'Sign up' : '註冊'}
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Admin Login' : '管理員登入'}</CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Enter your credentials to access the admin panel' 
                      : '請輸入您的管理員帳號密碼'}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">
                        {language === 'en' ? 'Email' : '電子郵件'}
                      </Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">
                        {language === 'en' ? 'Password' : '密碼'}
                      </Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' 
                          ? '(For demo, use admin@example.com with any password)' 
                          : '(演示用：使用 admin@example.com 加上任意密碼)'}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading 
                        ? (language === 'en' ? 'Logging in...' : '登入中...') 
                        : (language === 'en' ? 'Admin Sign In' : '管理員登入')}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
