'use client';

import { Button, CardContent, CardHeader, CardTitle, Input, Select } from '@app/components/ui';
import React, { useState } from 'react';


// Mock API call to simulate saving settings
const saveSettings = async (settings: object) => {
  console.log('Saving settings:', settings);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

/**
 * A form component for managing application settings.
 */
const SettingsForm = () => {
  const [settings, setSettings] = useState({
    siteName: 'Car Dealership',
    maxCarsPerPage: 10,
    emailNotifications: 'enabled',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await saveSettings(settings);
      setSaveSuccess(true);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="siteName">Site Name</label>
            <Input
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="maxCarsPerPage">Cars Per Page (Listings)</label>
            <Input
              id="maxCarsPerPage"
              name="maxCarsPerPage"
              type="number"
              value={settings.maxCarsPerPage}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="emailNotifications">Email Notifications</label>
            <Select
              id="emailNotifications"
              name="emailNotifications"
              value={settings.emailNotifications}
              onChange={handleChange}
              options={[
                { value: "enabled", label: "Enabled" },
                { value: "disabled", label: "Disabled" }
              ]}
            />
          </div>
        </div>
      </CardContent>
      <div className="flex justify-end p-6 pt-0">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
      {saveSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          Settings saved successfully!
        </div>
      )}
    </form>
  );
};

export default SettingsForm;
