'use client';

import React from 'react';
import { Mail, Shield, Trash2 } from 'lucide-react';
import { Badge, Button } from '@app/components/ui';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface UserTableProps {
  users: User[];
  onDelete: (userId: string) => void;
}

/**
 * A table component to display a list of users with their details and roles.
 */
const UserTable = ({ users, onDelete }: UserTableProps) => {
  const getRoleVariant = (role: string) => {
    return role === 'Admin' ? 'default' : 'secondary';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">Last login: {user.lastLogin}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getRoleVariant(user.role)} className="inline-flex items-center gap-1">
                  <Shield size={12} />
                  {user.role}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                  {user.status}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="destructive" size="icon" onClick={() => onDelete(user.id)} className="hover:bg-red-600">
                  <Trash2 size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
