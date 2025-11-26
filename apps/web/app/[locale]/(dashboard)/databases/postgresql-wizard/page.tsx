'use client';

import { useState } from 'react';

export default function PostgreSQLWizardPage() {
  const [step, setStep] = useState(1);
  const [dbName, setDbName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PostgreSQL Database Wizard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Adım adım PostgreSQL veritabanı oluşturun</p>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                {step > s ? '✓' : s}
              </div>
              {s < 4 && <div className={`w-24 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Create Database */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Step 1: Create a Database</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Database Name</label>
              <input 
                type="text" 
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
                placeholder="mypostgresdb" 
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <button onClick={() => setStep(2)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Next Step →
            </button>
          </div>
        )}

        {/* Step 2: Create User */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Step 2: Create Database User</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="pguser" 
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg">
                ← Previous
              </button>
              <button onClick={() => setStep(3)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Grant Privileges */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Step 3: Grant Privileges</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
              <label className="flex items-center gap-2 mb-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ALL PRIVILEGES</span>
              </label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Kullanıcıya veritabanı üzerinde tam yetki verir (SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, etc.)
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg">
                ← Previous
              </button>
              <button onClick={() => setStep(4)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Summary */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Step 4: Complete Setup</h3>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3">✓ Configuration Summary</h4>
              <div className="space-y-2 text-sm text-green-800 dark:text-green-300">
                <p><strong>Database:</strong> {dbName || 'mypostgresdb'}</p>
                <p><strong>Username:</strong> {username || 'pguser'}</p>
                <p><strong>Password:</strong> ••••••••</p>
                <p><strong>Privileges:</strong> ALL PRIVILEGES granted</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg">
                ← Previous
              </button>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                Complete Setup ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
