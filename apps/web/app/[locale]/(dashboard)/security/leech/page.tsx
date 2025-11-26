'use client';

import { useState } from 'react';
import { UserMinusIcon } from '@heroicons/react/24/outline';

export default function LeechProtectionPage() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <UserMinusIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leech Protection</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Şifre paylaşımını ve bandwidth hırsızlığını önleyin</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Leech Protection Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Leech Protection, kullanıcıların şifrelerini başkalarıyla paylaşmasını önler. 
          Aynı hesaptan çok fazla farklı IP adresinden bağlantı geldiğinde hesabı otomatik olarak askıya alır.
        </p>
      </div>

      {/* Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leech Protection Status</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Protection Status</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {enabled ? 'Enabled - Monitoring login attempts' : 'Disabled - No leech protection'}
            </p>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              enabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {enabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Protection Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Maximum Login Attempts (2 Hour Period)
            </label>
            <input
              type="number"
              defaultValue="5"
              min="1"
              max="100"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Number of failed login attempts before suspension
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Maximum Concurrent IPs
            </label>
            <input
              type="number"
              defaultValue="2"
              min="1"
              max="20"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Maximum number of different IP addresses allowed to access same account simultaneously
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Protected URLs
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select which URLs should be protected:
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">/downloads/</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">/files/</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">/members/</span>
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Add custom URL path..."
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Action When Triggered
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="action" defaultChecked />
                <span className="text-sm text-gray-700 dark:text-gray-300">Suspend account</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="action" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Show 403 Forbidden</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="action" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Redirect to URL</span>
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Send email notification when leech is detected
              </span>
            </label>
          </div>

          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Settings
          </button>
        </div>
      </div>

      {/* Whitelist */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">IP Whitelist</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Add trusted IP addresses that should never be blocked by leech protection.
        </p>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="192.168.1.1 or 192.168.0.0/24"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono"
          />
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Add to Whitelist
          </button>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="font-mono text-sm text-gray-900 dark:text-white">203.0.113.10</span>
            <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="font-mono text-sm text-gray-900 dark:text-white">198.51.100.0/24</span>
            <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Leech Detection Activity</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
            No leech activity detected in the last 30 days
          </p>
        </div>
      </div>
    </div>
  );
}
