'use client';

import { useState } from 'react';
import { CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function CalendarsPage() {
  const [calendars] = useState([
    { id: 1, name: 'Team Calendar', email: 'team@siyezden.com', events: 23, shared: 5 },
    { id: 2, name: 'Personal', email: 'admin@siyezden.com', events: 12, shared: 0 },
  ]);
  const [contacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+90 555 123 4567' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', phone: '+90 555 987 6543' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
            <CalendarIcon className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendars and Contacts</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">CalDAV ve CardDAV yönetimi</p>
          </div>
        </div>
      </div>

      {/* Calendars */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" /> Calendars
          </h3>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Create Calendar</button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Calendar Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Events</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Shared With</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {calendars.map((cal) => (
              <tr key={cal.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{cal.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cal.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cal.events}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cal.shared} users</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Manage</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contacts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <UserGroupIcon className="w-5 h-5" /> Contacts
          </h3>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Add Contact</button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Phone</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{contact.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{contact.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{contact.phone}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Edit</button>
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
