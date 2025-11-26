'use client';

import { LanguageIcon } from '@heroicons/react/24/outline';

export default function ChangeLanguagePage() {
  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <LanguageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Change Language</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tercih ettiğiniz dili seçin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-2 border-transparent hover:border-blue-500 rounded-lg transition-colors"
            >
              <span className="text-3xl">{lang.flag}</span>
              <span className="text-lg font-medium text-gray-900 dark:text-white">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Note</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Dil değişikliği tüm panel arayüzünü, menüleri ve mesajları etkileyecektir. Değişiklik anında uygulanacaktır.
        </p>
      </div>
    </div>
  );
}
