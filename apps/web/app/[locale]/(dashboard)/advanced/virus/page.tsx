'use client';

import { useState } from 'react';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

export default function VirusScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scanResults] = useState({
    totalFiles: 15234,
    scannedFiles: 15234,
    threatsFound: 2,
    lastScan: '2024-12-15 14:30',
    threats: [
      { file: '/public_html/uploads/malware.php', threat: 'PHP.Backdoor.Generic', severity: 'High' },
      { file: '/public_html/temp/suspicious.js', threat: 'JS.Trojan.Generic', severity: 'Medium' },
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <ShieldExclamationIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Virus Scanner</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dosyalarınızı virüslere karşı tarayın</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Files</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{scanResults.totalFiles.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Scanned</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{scanResults.scannedFiles.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Threats Found</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{scanResults.threatsFound}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Last Scan</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">{scanResults.lastScan}</p>
        </div>
      </div>

      {/* Scan Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Scan Controls</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scan Directory</label>
            <input
              type="text"
              defaultValue="/home/siyezden"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Scan subdirectories</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Auto-quarantine infected files</span>
            </label>
          </div>
          <button
            onClick={() => setScanning(true)}
            disabled={scanning}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg"
          >
            {scanning ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>
      </div>

      {/* Threats */}
      {scanResults.threats.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-red-200 dark:border-red-800">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-200">⚠️ Threats Detected</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">File Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Threat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Severity</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {scanResults.threats.map((threat, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-mono">{threat.file}</td>
                  <td className="px-6 py-4 text-sm text-red-600 dark:text-red-400 font-medium">{threat.threat}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      threat.severity === 'High' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Quarantine</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
