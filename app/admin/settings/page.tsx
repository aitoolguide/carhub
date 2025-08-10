'use client';

import { Card } from '@app/components/ui';
import React from 'react';
import SettingsForm from './components/SettingsForm';


/**
 * Main page for the admin settings section.
 * It displays a form to configure application-wide settings.
 */
const AdminSettingsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Site Settings</h1>
      <Card className="p-6 max-w-2xl mx-auto">
        <SettingsForm />
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
