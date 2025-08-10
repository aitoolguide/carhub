import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui';
import React from 'react';
import { ProfileForm } from './components/ProfileForm';
// import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
// import { ProfileForm } from './components/ProfileForm';

/**
 * The main user profile page component.
 * It displays a user's profile information and allows for editing.
 * This component acts as a container for the ProfileForm.
 */
const ProfilePage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {/* The ProfileForm component will be rendered here to handle the user's data */}
            <ProfileForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
