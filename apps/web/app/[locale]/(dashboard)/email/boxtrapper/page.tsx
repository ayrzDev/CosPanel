'use client';

import { useState } from 'react';
import { InboxIcon } from '@heroicons/react/24/outline';

export default function BoxTrapperPage() {
  const [enabled, setEnabled] = useState(true);
  const [whitelist] = useState(['partner@company.com', 'client@example.com']);
  const [blacklist] = useState(['spam@fake.com', 'phishing@bad.net']);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
            <InboxIcon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">BoxTrapper</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">E-posta doğrulama sistemi</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">BoxTrapper Status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bilinmeyen gönderenler için doğrulama gerektirir</p>
          </div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{enabled ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Whitelist */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Whitelist (Always Allow)</h4>
            <div className="space-y-2">
              {whitelist.map((email, index) => (
                <div key={index} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <span className="text-sm text-gray-900 dark:text-white">{email}</span>
                  <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                </div>
              ))}
              <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600">
                + Add Email
              </button>
            </div>
          </div>

          {/* Blacklist */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Blacklist (Always Block)</h4>
            <div className="space-y-2">
              {blacklist.map((email, index) => (
                <div key={index} className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <span className="text-sm text-gray-900 dark:text-white">{email}</span>
                  <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                </div>
              ))}
              <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600">
                + Add Email
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">How BoxTrapper Works</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
          <li>Bilinmeyen gönderenlere otomatik doğrulama e-postası gönderilir</li>
          <li>Gönderen, e-postadaki linke tıklayarak doğrulama yapar</li>
          <li>Doğrulanan gönderenler otomatik olarak whitelist'e eklenir</li>
          <li>Whitelist'teki gönderenlerin e-postaları direkt gelir</li>
        </ul>
      </div>
    </div>
  );
}
