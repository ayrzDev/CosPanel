'use client';

import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

export default function AddressImporterPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <DocumentArrowUpIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Address Importer</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">E-posta adreslerini toplu içe aktarın</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Import Email Addresses</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <DocumentArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">CSV veya TXT dosyası yükleyin</p>
              <input type="file" accept=".csv,.txt" className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
                Choose File
              </label>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">File Format Example:</h4>
            <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono">
{`email@example.com
user@domain.com
contact@company.com`}
            </pre>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Import Action</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>Create Email Forwarders</option>
              <option>Create Email Accounts</option>
              <option>Add to Mailing List</option>
            </select>
          </div>

          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Import Addresses</button>
        </div>
      </div>
    </div>
  );
}
