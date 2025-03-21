
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth, User, UserStatus } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  profilePicture: z.string().optional(),
  sex: z.enum(['Male', 'Female', 'Other']).optional(),
  age: z.coerce.number().min(5).max(100).optional(),
  phoneNumber: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const StatusCard = ({ status }: { status: UserStatus }) => {
  let bgGradient = '';
  let accentColor = 'border-red-600';
  let statusDetail = '';
  
  switch (status) {
    case 'Blank Card':
      bgGradient = 'bg-black';
      accentColor = 'border-gray-400';
      statusDetail = 'Begin your tricking journey with basic access';
      break;
    case 'Beginner Card':
      bgGradient = 'bg-black';
      accentColor = 'border-red-400';
      statusDetail = 'Access to all beginner-level classes and resources';
      break;
    case 'Advanced Card':
      bgGradient = 'bg-black';
      accentColor = 'border-red-600';
      statusDetail = 'Full access to all classes and exclusive content';
      break;
  }
  
  return (
    <Card className={`mb-8 overflow-hidden shadow-lg border-2 ${accentColor}`}>
      <div className={`${bgGradient} h-full p-8 text-white`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <div className={`w-16 h-16 rounded-full border-4 ${accentColor} bg-black flex items-center justify-center mr-4 shadow-md`}>
                <span className="text-3xl font-bold text-white">{status.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide font-medium text-gray-400 mb-1">Membership Status</p>
                <h3 className="text-2xl font-bold text-white">{status}</h3>
              </div>
            </div>
            <div className="space-y-2 ml-1 pl-1 border-l-2 border-red-600">
              <p className="font-medium text-white">Premium Membership</p>
              <p className="text-gray-300">{statusDetail}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="px-5 py-3 rounded-lg bg-black border border-red-600 mb-3">
              <div className="text-xs uppercase tracking-wide mb-1 text-gray-400">NCKU Tricking Club</div>
              <div className="text-sm font-medium text-white">{new Date().getFullYear()} Member</div>
            </div>
            <Button 
              variant="outline" 
              className="text-white border-2 border-red-600 hover:bg-red-900 hover:text-white"
            >
              View Membership Details
            </Button>
            <Button 
              variant="outline" 
              className="text-white border-2 border-red-600 hover:bg-red-900 hover:text-white"
              asChild
            >
              <Link to="/booking-history">
                <Clock className="mr-2 h-4 w-4" />
                View Booking History
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(user?.profilePicture || null);
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      profilePicture: user?.profilePicture || '',
      sex: user?.sex,
      age: user?.age,
      phoneNumber: user?.phoneNumber || '',
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProfileImage(imageUrl);
        form.setValue('profilePicture', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const updateData: Partial<User> = {
        name: data.name,
        email: data.email,
        profilePicture: data.profilePicture,
        sex: data.sex,
        age: data.age,
        phoneNumber: data.phoneNumber,
      };
      
      updateUser(updateData);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'There was an error updating your profile',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container max-w-xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Member Area</h1>
            <p className="text-muted-foreground mt-2">Manage your NCKU Tricking profile</p>
          </div>
          
          <StatusCard status={user.status} />
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Leave blank to keep current" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Only fill if you want to change your password
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <FormField
                      control={form.control}
                      name="profilePicture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Picture</FormLabel>
                          <FormControl>
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-32 h-32 rounded-full border flex items-center justify-center overflow-hidden bg-muted">
                                {profileImage ? (
                                  <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-muted-foreground text-sm">No image</span>
                                )}
                              </div>
                              <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange}
                                className="max-w-52"
                              />
                            </div>
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biological Gender</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Optional</FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>Optional</FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Points Balance</p>
                      <p className="text-2xl font-bold">{user.points}</p>
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
