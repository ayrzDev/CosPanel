'use client';

import { useState } from 'react';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: '1',
      type: 'success',
      title: 'Yeni müşteri eklendi',
      message: 'johndoe kullanıcı adlı müşteri başarıyla oluşturuldu.',
      time: '5 dakika önce',
      read: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Sunucu kapasitesi %80',
      message: 'Main Server 1 disk kapasitesi %80\'e ulaştı. Kontrol edilmeli.',
      time: '1 saat önce',
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Yeni fatura ödendi',
      message: 'INV-2025-001 numaralı fatura ödeme alındı.',
      time: '2 saat önce',
      read: true,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Yeni destek talebi',
      message: 'TKT-001: "Web sitem açılmıyor" başlıklı talep oluşturuldu.',
      time: '3 saat önce',
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />;
      case 'info':
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
      default:
        return <BellIcon className="w-6 h-6 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bildirimler</h1>
            <p className="text-gray-600 mt-2">
              {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : 'Tüm bildirimler okundu'}
            </p>
          </div>
          <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800">
            Tümünü okundu işaretle
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-6 hover:bg-gray-50 transition-colors ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.time}
                    </p>
                  </div>
                  <button className="ml-4 text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
