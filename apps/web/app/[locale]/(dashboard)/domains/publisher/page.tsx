'use client';

import { useState } from 'react';
import { PaintBrushIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function SitePublisherPage() {
  const [templates] = useState([
    { id: 1, name: 'Business Portfolio', category: 'Business', image: '🏢' },
    { id: 2, name: 'Personal Blog', category: 'Blog', image: '📝' },
    { id: 3, name: 'Restaurant', category: 'Food', image: '🍽️' },
    { id: 4, name: 'Photography', category: 'Portfolio', image: '📷' },
    { id: 5, name: 'Landing Page', category: 'Marketing', image: '🚀' },
    { id: 6, name: 'Coming Soon', category: 'Other', image: '⏰' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
            <PaintBrushIcon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Publisher</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Hızlı ve kolay website oluşturun</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <GlobeAltIcon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Profesyonel Website'ler Dakikalar İçinde</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Hazır şablonları kullanarak kodlama bilgisi olmadan modern, responsive website'ler oluşturun.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose a Template</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer group"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{template.image}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{template.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{template.category}</p>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Drag & Drop Editor</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Görsel editör ile kolay düzenleme</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Mobile Responsive</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tüm cihazlarda mükemmel görünüm</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">SEO Optimized</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Arama motorları için optimize</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">One-Click Publish</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Anında yayınlama</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Getting Started</h4>
        <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
          <li>Yukarıdaki şablonlardan birini seçin</li>
          <li>Görsel editör ile içeriği özelleştirin</li>
          <li>Renk, font ve layout ayarlarını yapın</li>
          <li>"Publish" butonuna tıklayarak sitenizi yayınlayın</li>
        </ol>
      </div>
    </div>
  );
}
