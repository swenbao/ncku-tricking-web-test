
import React from 'react';

interface ProfileHeaderProps {
  title: string;
  subtitle?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
    </div>
  );
};

export default ProfileHeader;
