'use client';

import { useState } from 'react';
import { PhotoIcon, MagnifyingGlassIcon, FolderIcon } from '@heroicons/react/24/outline';

export default function ImagesPage() {
  const [images] = useState([
    { id: 1, name: 'logo.png', size: '245 KB', dimensions: '512x512', path: '/public_html/images' },
    { id: 2, name: 'banner.jpg', size: '1.2 MB', dimensions: '1920x1080', path: '/public_html/images' },
    { id: 3, name: 'icon.svg', size: '8 KB', dimensions: '64x64', path: '/public_html/images' },
    { id: 4, name: 'hero.webp', size: '456 KB', dimensions: '1600x900', path: '/public_html/assets' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
            <PhotoIcon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Images</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Resim dosyalarınızı görüntüleyin ve yönetin</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
              <PhotoIcon className="w-16 h-16 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{img.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{img.dimensions}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{img.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
