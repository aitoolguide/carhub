'use client';

import React, { useState } from 'react';
import { User, Mail, Shield, Trash2 } from 'lucide-react';
import { Button, Card, Modal } from '@app/components/ui';
import UserTable from './components/UserTable';


// Mock data for users
const mockUsers = [
  {
    id: 'USR-001',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-11-01',
  },
  {
    id: 'USR-002',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2023-10-30',
  },
  {
    id: 'USR-003',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-09-15',
  },
  {
    id: 'USR-004',
    name: 'Dana Scully',
    email: 'dana.s@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2023-11-02',
  },
];

/**
 * Main page for the admin user management section.
 * It displays a list of all users in a table.
 */
const AdminUsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState('');

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== userToDelete));
    setIsModalOpen(false);
    setUserToDelete('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>
      <Card className="p-6">
        <UserTable users={users} onDelete={handleDeleteUser} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Confirm Deletion">
        <p className="text-gray-700">Are you sure you want to delete this user? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
