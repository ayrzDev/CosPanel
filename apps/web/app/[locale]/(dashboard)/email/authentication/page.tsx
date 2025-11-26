'use client';

import { useState } from 'react';
import { ShieldCheckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function AuthenticationPage() {
  const [spfStatus] = useState({ enabled: true, record: 'v=spf1 +a +mx +ip4:192.168.1.1 ~all' });
  const [dkimStatus] = useState({ enabled: true, selector: 'default._domainkey.siyezden.com' });
  const [dmarcStatus] = useState({ enabled: true, policy: 'quarantine', rua: 'mailto:dmarc@siyezden.com' });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <ShieldCheckIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Authentication</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">SPF, DKIM ve DMARC ayarları</p>
          </div>
        </div>
      </div>

      {/* SPF */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              SPF (Sender Policy Framework)
              {spfStatus.enabled ? (
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-600" />
              )}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">E-posta gönderme yetkisi kontrolü</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Edit SPF</button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-sm text-gray-800 dark:text-gray-300">
          {spfStatus.record}
        </div>
      </div>

      {/* DKIM */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              DKIM (DomainKeys Identified Mail)
              {dkimStatus.enabled ? (
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-600" />
              )}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">E-posta imzalama ve doğrulama</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Manage DKIM</button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Selector:</strong> {dkimStatus.selector}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">DNS kaydı Zone Editor'dan eklenmelidir</p>
        </div>
      </div>

      {/* DMARC */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              DMARC (Domain-based Message Authentication)
              {dmarcStatus.enabled ? (
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-600" />
              )}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">SPF ve DKIM politikası</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Edit DMARC</button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Policy:</strong> {dmarcStatus.policy}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300"><strong>RUA:</strong> {dmarcStatus.rua}</p>
        </div>
      </div>
    </div>
  );
}
