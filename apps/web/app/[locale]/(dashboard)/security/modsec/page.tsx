'use client';

import { useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function ModSecurityPage() {
  const [modsecEnabled, setModsecEnabled] = useState(true);
  const [rules] = useState([
    { id: 1, name: 'SQL Injection Protection', enabled: true, severity: 'Critical' },
    { id: 2, name: 'XSS Attack Prevention', enabled: true, severity: 'High' },
    { id: 3, name: 'Remote File Inclusion', enabled: true, severity: 'Critical' },
    { id: 4, name: 'Session Fixation', enabled: false, severity: 'Medium' },
    { id: 5, name: 'Command Injection', enabled: true, severity: 'High' },
  ]);

  const [blockedRequests] = useState([
    { time: '2024-12-14 15:23:45', ip: '192.168.1.100', rule: 'SQL Injection', url: '/admin/login.php' },
    { time: '2024-12-14 14:12:33', ip: '185.220.101.45', rule: 'XSS Attack', url: '/search?q=<script>' },
    { time: '2024-12-14 12:05:12', ip: '10.0.0.50', rule: 'Remote File Inclusion', url: '/index.php?page=http://' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <ShieldCheckIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ModSecurity</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Web Application Firewall (WAF) ayarları</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">ModSecurity Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          ModSecurity, web uygulamalarınızı SQL injection, XSS, RFI gibi yaygın saldırı türlerine karşı koruyan 
          açık kaynaklı bir Web Application Firewall (WAF) 'dır. OWASP Core Rule Set ile birlikte gelir.
        </p>
      </div>

      {/* Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ModSecurity Status</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Web Application Firewall</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {modsecEnabled ? 'Enabled - Your site is protected' : 'Disabled - No WAF protection'}
            </p>
          </div>
          <button
            onClick={() => setModsecEnabled(!modsecEnabled)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              modsecEnabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {modsecEnabled ? 'Disable WAF' : 'Enable WAF'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Rules</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{rules.filter(r => r.enabled).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Blocked Today</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{blockedRequests.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Protection Level</p>
          <p className="text-3xl font-bold text-green-600 mt-2">High</p>
        </div>
      </div>

      {/* Rule Sets */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Rule Sets</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Rule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{rule.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rule.severity === 'Critical' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : rule.severity === 'High'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {rule.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rule.enabled
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                  }`}>
                    {rule.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Configure</button>
                  <button className={`text-sm ${rule.enabled ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}>
                    {rule.enabled ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Blocks */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recently Blocked Requests</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Rule Triggered</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Request URL</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {blockedRequests.map((req, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{req.time}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">{req.ip}</td>
                <td className="px-6 py-4 text-sm text-red-600 dark:text-red-400 font-medium">{req.rule}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">{req.url}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Rules */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Custom Rule</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rule Name</label>
            <input
              type="text"
              placeholder="My Custom Rule"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rule Definition</label>
            <textarea
              rows={4}
              placeholder="SecRule ARGS..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Add Custom Rule
          </button>
        </div>
      </div>
    </div>
  );
}
