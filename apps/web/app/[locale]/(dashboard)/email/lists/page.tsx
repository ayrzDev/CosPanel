'use client';

import { useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function MailingListsPage() {
  const [lists] = useState([
    { id: 1, name: 'newsletter@siyezden.com', subscribers: 1245, createdAt: '2024-10-01' },
    { id: 2, name: 'updates@siyezden.com', subscribers: 567, createdAt: '2024-09-15' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mailing Lists</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">E-posta listelerinizi yönetin</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Create List</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">List Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Subscribers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {lists.map((list) => (
              <tr key={list.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{list.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{list.subscribers.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{list.createdAt}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Manage</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
