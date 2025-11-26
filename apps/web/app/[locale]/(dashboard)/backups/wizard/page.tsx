'use client';

import { useState } from 'react';
import { 
  CloudArrowUpIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function BackupWizardPage() {
  const [step, setStep] = useState(1);
  const [backupType, setBackupType] = useState<'full' | 'partial'>('full');
  const [selectedItems, setSelectedItems] = useState({
    homeDirectory: true,
    databases: true,
    emailForwarders: true,
    emailFilters: true,
  });

  const steps = [
    { id: 1, name: 'Backup Type', description: 'Choose what to backup' },
    { id: 2, name: 'Select Items', description: 'Select specific items' },
    { id: 3, name: 'Destination', description: 'Choose backup location' },
    { id: 4, name: 'Confirm', description: 'Review and execute' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <CloudArrowUpIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Backup Wizard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Adım adım yedekleme oluşturun
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {step > s.id ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <span className="font-semibold">{s.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.description}</p>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <ChevronRightIcon className="w-6 h-6 text-gray-400 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Backup Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setBackupType('full')}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  backupType === 'full'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Full Backup
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Home directory, databases, email forwarders ve filters
                </p>
              </div>
              <div
                onClick={() => setBackupType('partial')}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  backupType === 'partial'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Partial Backup
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sadece seçtiğiniz öğeleri yedekleyin
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && backupType === 'partial' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Items to Backup
            </h2>
            {Object.entries(selectedItems).map(([key, value]) => (
              <label key={key} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSelectedItems({ ...selectedItems, [key]: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Backup Destination
            </h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                <input type="radio" name="destination" defaultChecked className="w-4 h-4" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                  Home Directory
                </span>
              </label>
              <label className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                <input type="radio" name="destination" className="w-4 h-4" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                  Remote FTP Server
                </span>
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Backup
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-300">
                <strong>Type:</strong> {backupType === 'full' ? 'Full Backup' : 'Partial Backup'}
              </p>
              <p className="text-sm text-blue-900 dark:text-blue-300 mt-2">
                <strong>Destination:</strong> Home Directory
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Next
            </button>
          ) : (
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
              Generate Backup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
