'use client';

import { useState } from 'react';
import { DevicePhoneMobileIcon, QrCodeIcon } from '@heroicons/react/24/outline';

export default function TwoFactorAuthPage() {
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [backupCodes] = useState([
    'A1B2-C3D4-E5F6',
    'G7H8-I9J0-K1L2',
    'M3N4-O5P6-Q7R8',
    'S9T0-U1V2-W3X4',
    'Y5Z6-A7B8-C9D0',
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <DevicePhoneMobileIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Two-Factor Authentication</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Hesabınıza ekstra güvenlik katmanı ekleyin</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">2FA Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Two-Factor Authentication (2FA), şifrenize ek olarak telefonunuzdaki bir uygulama ile üretilen 
          tek kullanımlık kod gerektirerek hesabınızı korur. Google Authenticator, Authy veya benzeri uygulamalar kullanabilirsiniz.
        </p>
      </div>

      {/* Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">2FA Status</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tfaEnabled ? 'Enabled - Your account is protected with 2FA' : 'Disabled - Only password protection'}
            </p>
          </div>
          <button
            onClick={() => {
              if (!tfaEnabled) {
                setShowSetup(true);
              } else {
                setTfaEnabled(false);
              }
            }}
            className={`px-6 py-2 rounded-lg font-semibold ${
              tfaEnabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {tfaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      {/* Setup */}
      {showSetup && !tfaEnabled && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Setup Two-Factor Authentication</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Step 1: Install Authenticator App</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Download and install an authenticator app on your mobile device:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                <li>Google Authenticator (iOS/Android)</li>
                <li>Microsoft Authenticator (iOS/Android)</li>
                <li>Authy (iOS/Android/Desktop)</li>
                <li>1Password (iOS/Android/Desktop)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Step 2: Scan QR Code</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Open your authenticator app and scan this QR code:
              </p>
              <div className="flex justify-center p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <QrCodeIcon className="w-48 h-48 text-gray-400" />
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">QR Code Placeholder</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Or enter this key manually:</p>
                <code className="text-sm font-mono text-gray-900 dark:text-white">JBSWY3DPEHPK3PXP</code>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Step 3: Enter Verification Code</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Enter the 6-digit code from your authenticator app:
              </p>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-2xl text-center tracking-widest"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setTfaEnabled(true);
                  setShowSetup(false);
                }}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Complete Setup
              </button>
              <button
                onClick={() => setShowSetup(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backup Codes */}
      {tfaEnabled && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Backup Codes</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Save these backup codes in a safe place. Each code can be used once if you lose access to your authenticator app.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {backupCodes.map((code, idx) => (
              <div
                key={idx}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono text-center text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
              >
                {code}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Download Codes
            </button>
            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
              Generate New Codes
            </button>
          </div>
        </div>
      )}

      {/* Trusted Devices */}
      {tfaEnabled && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trusted Devices</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Chrome on Windows</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last used: 2024-12-14 15:30 from 203.0.113.10</p>
                </div>
                <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Safari on iPhone</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last used: 2024-12-13 10:15 from 198.51.100.25</p>
                </div>
                <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
