'use client';

import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function MetricsEditorPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Cog6ToothIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Metrics Editor</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Metrik toplama ve raporlama ayarları</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Analytics Tools</h3>
        <div className="space-y-3">
          {[
            { name: 'AWStats', enabled: true, description: 'Advanced web statistics' },
            { name: 'Webalizer', enabled: true, description: 'Fast web log analyzer' },
            { name: 'Analog Stats', enabled: false, description: 'Analog log analysis' },
            { name: 'Visitors', enabled: true, description: 'Built-in visitor tracking' },
          ].map((tool, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{tool.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
              </div>
              <button className={`px-4 py-2 rounded-lg font-medium ${
                tool.enabled
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {tool.enabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Schedule</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Statistics Update Frequency</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>Every Hour</option>
              <option>Every 6 Hours</option>
              <option>Daily (Midnight)</option>
              <option>Weekly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Log Retention Period</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>7 Days</option>
              <option>30 Days</option>
              <option>90 Days</option>
              <option>1 Year</option>
              <option>Forever</option>
            </select>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Schedule
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy & Data Collection</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Collect visitor IP addresses</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Track user agents (browsers)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Anonymize IP addresses (GDPR compliance)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Collect referrer information</span>
          </label>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
}
