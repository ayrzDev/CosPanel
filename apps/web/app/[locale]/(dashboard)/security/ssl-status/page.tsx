'use client';

import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function SSLStatusPage() {
  const [domains] = useState([
    {
      domain: 'siyezden.com',
      hasSSL: true,
      issuer: "Let's Encrypt",
      validUntil: '2025-01-15',
      daysRemaining: 32,
      autoRenew: true,
      issues: []
    },
    {
      domain: 'www.siyezden.com',
      hasSSL: true,
      issuer: "Let's Encrypt",
      validUntil: '2025-01-15',
      daysRemaining: 32,
      autoRenew: true,
      issues: []
    },
    {
      domain: 'mail.siyezden.com',
      hasSSL: true,
      issuer: 'Self-Signed',
      validUntil: '2025-01-01',
      daysRemaining: 18,
      autoRenew: false,
      issues: ['Self-signed certificate', 'Browser warning']
    },
    {
      domain: 'test.siyezden.com',
      hasSSL: false,
      issuer: null,
      validUntil: null,
      daysRemaining: null,
      autoRenew: false,
      issues: ['No SSL certificate installed']
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <CheckCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SSL/TLS Status</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">SSL sertifikalarınızın durumunu kontrol edin</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Domains</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{domains.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">SSL Enabled</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{domains.filter(d => d.hasSSL).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">No SSL</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{domains.filter(d => !d.hasSSL).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Auto-Renew</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{domains.filter(d => d.autoRenew).length}</p>
        </div>
      </div>

      {/* Domain SSL Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Domain SSL Status</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {domains.map((domain, idx) => (
            <div key={idx} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {domain.hasSSL ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-red-600" />
                    )}
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{domain.domain}</h4>
                  </div>
                  
                  {domain.hasSSL ? (
                    <div className="ml-9 space-y-2">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          <strong>Issuer:</strong> {domain.issuer}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          <strong>Valid Until:</strong> {domain.validUntil}
                        </span>
                        <span className={`font-medium ${
                          domain.daysRemaining! < 30 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {domain.daysRemaining} days remaining
                        </span>
                      </div>
                      
                      {domain.autoRenew && (
                        <div className="flex items-center gap-2 text-sm">
                          <ClockIcon className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-600 dark:text-blue-400">Auto-renewal enabled</span>
                        </div>
                      )}
                      
                      {domain.issues.length > 0 && (
                        <div className="mt-2">
                          {domain.issues.map((issue, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                              <span>⚠️</span>
                              <span>{issue}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="ml-9">
                      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <span>⚠️</span>
                        <span>No SSL certificate installed</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {domain.hasSSL ? (
                    <>
                      <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                        View Details
                      </button>
                      <button className="px-4 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
                        Renew
                      </button>
                    </>
                  ) : (
                    <button className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg">
                      Install SSL
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {domains.some(d => d.daysRemaining && d.daysRemaining < 30) && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">⚠️ Certificate Expiration Warnings</h4>
          <ul className="text-sm text-orange-800 dark:text-orange-300 list-disc list-inside">
            {domains
              .filter(d => d.daysRemaining && d.daysRemaining < 30)
              .map((d, i) => (
                <li key={i}>
                  <strong>{d.domain}</strong> expires in {d.daysRemaining} days
                  {!d.autoRenew && ' (Auto-renewal disabled)'}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
