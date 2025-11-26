'use client';

import { useEffect } from 'react';

export default function PhpMyAdminPage() {
  useEffect(() => {
    // In production, redirect to actual phpMyAdmin installation
    // window.location.href = '/phpmyadmin';
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">phpMyAdmin</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">MySQL veritabanlarını yönetin</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Launch phpMyAdmin</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            phpMyAdmin ile MySQL veritabanlarınızı grafik arayüzden yönetin
          </p>
          <a 
            href="/phpmyadmin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Open phpMyAdmin
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Access Information</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Server:</strong> localhost</p>
              <p><strong>Username:</strong> Your cPanel username</p>
              <p><strong>Password:</strong> Your database password</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>SQL query editor</li>
              <li>Database import/export</li>
              <li>Table structure management</li>
              <li>User privileges control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
