'use client';

import { useState } from 'react';
import { 
  ArrowPathIcon,
  ServerIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function EmailRoutingPage() {
  const [routingType, setRoutingType] = useState<'local' | 'auto' | 'remote'>('auto');

  const domains = [
    { domain: 'siyezden.com', routing: 'auto', mx: 'mail.siyezden.com', status: 'active' },
    { domain: 'test.com', routing: 'local', mx: 'localhost', status: 'active' },
    { domain: 'old.com', routing: 'remote', mx: 'mx.external.com', status: 'warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <ArrowPathIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              E-posta Routing
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Alan adlarınız için e-posta yönlendirme ayarlarını yapılandırın
            </p>
          </div>
        </div>
      </div>

      {/* Routing Types Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow border-2 transition-all cursor-pointer ${
          routingType === 'local' ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'
        } p-6`} onClick={() => setRoutingType('local')}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ServerIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Local Mail Exchanger
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bu sunucu üzerindeki e-posta hesaplarına teslim edilir. MX kayıtları görmezden gelinir.
              </p>
            </div>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow border-2 transition-all cursor-pointer ${
          routingType === 'auto' ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'
        } p-6`} onClick={() => setRoutingType('auto')}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Automatically Detect
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sistem MX kayıtlarına göre otomatik olarak local veya remote olarak yönlendirir (Önerilen).
              </p>
            </div>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow border-2 transition-all cursor-pointer ${
          routingType === 'remote' ? 'border-orange-500' : 'border-gray-200 dark:border-gray-700'
        } p-6`} onClick={() => setRoutingType('remote')}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <ArrowPathIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Remote Mail Exchanger
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                E-postalar MX kayıtlarında belirtilen uzak sunuculara yönlendirilir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Routing Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Domain Routing Ayarları</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Routing Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  MX Record
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Durum
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
                      value={domain.routing}
                      className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="local">Local</option>
                      <option value="auto">Auto Detect</option>
                      <option value="remote">Remote</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600 dark:text-gray-400">
                    {domain.mx}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {domain.status === 'active' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                        Uyarı
                      </span>
                    )}
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

      {/* Current Selection Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
          Seçili Routing Tipi: {routingType === 'local' ? 'Local Mail Exchanger' : routingType === 'auto' ? 'Automatically Detect' : 'Remote Mail Exchanger'}
        </h3>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          {routingType === 'local' && (
            <>
              <p>• Tüm e-postalar bu sunucuda işlenir</p>
              <p>• Harici MX kayıtları dikkate alınmaz</p>
              <p>• E-posta hesapları bu sunucuda olmalıdır</p>
            </>
          )}
          {routingType === 'auto' && (
            <>
              <p>• Sistem MX kayıtlarını kontrol eder</p>
              <p>• MX kaydı bu sunucuyu gösteriyorsa local olarak işler</p>
              <p>• MX kaydı başka bir sunucuyu gösteriyorsa remote olarak yönlendirir</p>
              <p>• Çoğu durumda en iyi seçenektir</p>
            </>
          )}
          {routingType === 'remote' && (
            <>
              <p>• Tüm e-postalar MX kayıtlarındaki sunuculara gönderilir</p>
              <p>• Google Workspace, Office 365 gibi harici e-posta servisleri için kullanılır</p>
              <p>• Bu sunucudaki e-posta hesapları kullanılmaz</p>
            </>
          )}
        </div>
      </div>

      {/* MX Records Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          MX Kayıt Öncelikleri
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white">10</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">mail.siyezden.com</span>
            </div>
            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">Primary</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white">20</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">mail2.siyezden.com</span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">Backup</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          * Düşük öncelik değerleri önce denenir. MX kayıtlarını Zone Editor'den düzenleyebilirsiniz.
        </p>
      </div>
    </div>
  );
}
