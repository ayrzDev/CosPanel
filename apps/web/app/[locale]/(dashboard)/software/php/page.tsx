'use client';

import { useState } from 'react';
import { 
  CodeBracketIcon, 
  ServerIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function PHPManagerPage() {
  const [selectedVersion, setSelectedVersion] = useState('8.2');
  
  const phpVersions = [
    { version: '5.6', status: 'available', eol: true },
    { version: '7.0', status: 'available', eol: true },
    { version: '7.4', status: 'available', eol: true },
    { version: '8.0', status: 'installed', eol: false },
    { version: '8.1', status: 'installed', eol: false },
    { version: '8.2', status: 'active', eol: false },
    { version: '8.3', status: 'available', eol: false },
  ];

  const domains = [
    { domain: 'siyezden.com', phpVersion: '8.2', path: '/home/siyezden/public_html' },
    { domain: 'test.com', phpVersion: '8.1', path: '/home/siyezden/test' },
    { domain: 'old.com', phpVersion: '7.4', path: '/home/siyezden/old' },
  ];

  const phpExtensions = [
    { name: 'mysqli', status: true, description: 'MySQL Database Support' },
    { name: 'pdo_mysql', status: true, description: 'PDO MySQL Driver' },
    { name: 'gd', status: true, description: 'Image Processing' },
    { name: 'curl', status: true, description: 'cURL Library' },
    { name: 'mbstring', status: true, description: 'Multibyte String' },
    { name: 'xml', status: true, description: 'XML Parser' },
    { name: 'zip', status: true, description: 'ZIP Archive' },
    { name: 'json', status: true, description: 'JSON Support' },
    { name: 'openssl', status: true, description: 'OpenSSL' },
    { name: 'intl', status: true, description: 'Internationalization' },
    { name: 'imagick', status: false, description: 'ImageMagick' },
    { name: 'redis', status: false, description: 'Redis Cache' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <CodeBracketIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              PHP Version Manager
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              PHP versiyonlarınızı ve eklentilerinizi yönetin
            </p>
          </div>
        </div>
      </div>

      {/* PHP Versions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Kullanılabilir PHP Versiyonları</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {phpVersions.map((php) => (
              <div
                key={php.version}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  php.status === 'active'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : php.status === 'installed'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
                onClick={() => setSelectedVersion(php.version)}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CodeBracketIcon className={`w-8 h-8 ${
                      php.status === 'active' ? 'text-green-600 dark:text-green-400' :
                      php.status === 'installed' ? 'text-blue-600 dark:text-blue-400' :
                      'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    PHP {php.version}
                  </p>
                  <div className="mt-2">
                    {php.status === 'active' && (
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                        Aktif
                      </span>
                    )}
                    {php.status === 'installed' && (
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full">
                        Yüklü
                      </span>
                    )}
                    {php.status === 'available' && (
                      <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded-full">
                        Mevcut
                      </span>
                    )}
                  </div>
                  {php.eol && (
                    <div className="mt-2">
                      <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full">
                        EOL
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Domain PHP Versions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Domain PHP Versiyonları</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  PHP Versiyonu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Path
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {domains.map((domain, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ServerIcon className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {domain.domain}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={domain.phpVersion}
                      className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {phpVersions.filter(v => v.status !== 'available').map((v) => (
                        <option key={v.version} value={v.version}>
                          PHP {v.version}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {domain.path}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      Kaydet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PHP Extensions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            PHP {selectedVersion} Eklentileri
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phpExtensions.map((ext) => (
              <div
                key={ext.name}
                className={`p-4 rounded-lg border transition-all ${
                  ext.status
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {ext.status ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <ExclamationTriangleIcon className="w-5 h-5 text-gray-400" />
                      )}
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {ext.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {ext.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ext.status}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PHP Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            PHP {selectedVersion} Yapılandırması
          </h2>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
            Kaydet
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                memory_limit
              </label>
              <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white">
                <option value="128M">128M</option>
                <option value="256M" selected>256M</option>
                <option value="512M">512M</option>
                <option value="1024M">1024M</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                max_execution_time
              </label>
              <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white">
                <option value="30" selected>30 seconds</option>
                <option value="60">60 seconds</option>
                <option value="120">120 seconds</option>
                <option value="300">300 seconds</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                upload_max_filesize
              </label>
              <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white">
                <option value="2M">2M</option>
                <option value="8M">8M</option>
                <option value="16M">16M</option>
                <option value="32M" selected>32M</option>
                <option value="64M">64M</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                post_max_size
              </label>
              <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white">
                <option value="8M">8M</option>
                <option value="16M">16M</option>
                <option value="32M">32M</option>
                <option value="64M" selected>64M</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
