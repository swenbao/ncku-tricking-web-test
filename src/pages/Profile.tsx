
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatusCard from '@/components/profile/StatusCard';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileHeader from '@/components/profile/ProfileHeader';

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container max-w-xl mx-auto px-4 py-8">
          <ProfileHeader 
            title="Member Area" 
            subtitle="Manage your NCKU Tricking profile" 
          />
          
          <StatusCard status={user.status} />
          
          <ProfileForm user={user} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
