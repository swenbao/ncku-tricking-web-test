
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
import { Navigate } from 'react-router-dom';

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
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-700';
  let statusText = '';
  
  switch (status) {
    case 'Blank Card':
      bgColor = 'bg-gray-200';
      textColor = 'text-gray-700';
      statusText = 'You are a new member';
      break;
    case 'Beginner Card':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-700';
      statusText = 'You can attend beginner classes';
      break;
    case 'Advanced Card':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-700';
      statusText = 'You can attend all classes';
      break;
  }
  
  return (
    <div className={`border rounded-lg p-4 ${bgColor} mb-8`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">NCKU Tricking</h3>
          <p className={`font-medium ${textColor}`}>{status}</p>
          <p className="text-sm mt-1">{statusText}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor} border-2 border-white shadow-sm`}>
          <span className={`text-2xl font-bold ${textColor}`}>{status.charAt(0)}</span>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(user?.profilePicture || null);
  
  // Redirect if not logged in
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
      // Only include password if it was changed
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
