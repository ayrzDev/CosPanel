'use client';

import { useState } from 'react';
import { LockClosedIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function SSLTLSPage() {
  const [certificates] = useState([
    {
      id: 1,
      domain: 'siyezden.com',
      issuer: "Let's Encrypt",
      validFrom: '2024-10-15',
      validUntil: '2025-01-15',
      autoRenew: true,
      status: 'Valid'
    },
    {
      id: 2,
      domain: 'mail.siyezden.com',
      issuer: 'Self-Signed',
      validFrom: '2024-01-01',
      validUntil: '2025-01-01',
      autoRenew: false,
      status: 'Valid'
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <LockClosedIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SSL/TLS</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">SSL sertifikalarını yönetin ve yükleyin</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
              <LockClosedIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Generate CSR</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Create Certificate Signing Request</p>
        </button>

        <button className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 hover:border-green-500 dark:hover:border-green-500 transition-colors text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
              <ArrowUpTrayIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Upload Certificate</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Install existing SSL certificate</p>
        </button>

        <button className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 hover:border-purple-500 dark:hover:border-purple-500 transition-colors text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
              <LockClosedIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Self-Signed</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Generate self-signed certificate</p>
        </button>
      </div>

      {/* Install Certificate */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Install SSL Certificate</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domain</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>siyezden.com</option>
              <option>www.siyezden.com</option>
              <option>mail.siyezden.com</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certificate (CRT)</label>
            <textarea
              rows={5}
              placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Private Key (KEY)</label>
            <textarea
              rows={5}
              placeholder="-----BEGIN PRIVATE KEY-----&#10;...&#10;-----END PRIVATE KEY-----"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certificate Authority Bundle (CA Bundle) - Optional</label>
            <textarea
              rows={3}
              placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Install Certificate
          </button>
        </div>
      </div>

      {/* Current Certificates */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Installed Certificates</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Issuer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Valid From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Valid Until</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Auto-Renew</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{cert.domain}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cert.validFrom}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cert.validUntil}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {cert.autoRenew ? '✓ Enabled' : '✗ Disabled'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                    <button className="text-orange-600 hover:text-orange-700 text-sm">Renew</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">SSL Sertifikası Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          SSL/TLS sertifikaları, web siteniz ile ziyaretçileriniz arasındaki bağlantıyı şifreler ve HTTPS protokolünü etkinleştirir. 
          Bu, hassas verilerin güvenli bir şekilde iletilmesini sağlar ve SEO için önemlidir.
        </p>
      </div>
    </div>
  );
}
