'use client';

import { useState } from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';

export default function HotlinkProtectionPage() {
  const [enabled, setEnabled] = useState(false);
  const [allowedDomains] = useState([
    'siyezden.com',
    'www.siyezden.com',
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <LinkIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hotlink Protection</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bandwidth hırsızlığını önleyin</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Hotlink Protection Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Hotlink protection, başka web sitelerinin sizin resimlerinizi, videolarınızı veya diğer medya dosyalarınızı 
          doğrudan kendi sitelerinde kullanmasını engeller. Bu, bandwidth tasarrufu sağlar ve içerik hırsızlığını önler.
        </p>
      </div>

      {/* Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hotlink Protection Status</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Protection Status</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {enabled ? 'Enabled - Hotlinking is blocked' : 'Disabled - Anyone can hotlink your files'}
            </p>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              enabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {enabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URLs to Allow Access
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Add domains that are allowed to link to your content. One per line.
            </p>
            <textarea
              rows={5}
              defaultValue={allowedDomains.join('\n')}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm"
              placeholder="example.com&#10;www.example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Block Direct Access (No Referrer)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Block requests with no HTTP_REFERER (typing URL directly in browser)
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Redirect URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://siyezden.com/hotlink-blocked.jpg"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Show this image instead when hotlinking is detected (leave empty to show 403 error)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Extensions to Protect
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp', 'pdf', 'mp4', 'mp3', 'zip'].map((ext) => (
                <label key={ext} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">.{ext}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Configuration
          </button>
        </div>
      </div>

      {/* Example .htaccess */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Generated .htaccess Rules</h4>
        <pre className="text-xs bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
{`RewriteEngine on
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^http(s)?://(www\\.)?siyezden.com [NC]
RewriteRule \\.(jpg|jpeg|png|gif|bmp|webp)$ - [F,NC]`}
        </pre>
      </div>
    </div>
  );
}
