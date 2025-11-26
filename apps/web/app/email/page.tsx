'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  KeyIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

export default function EmailPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    quota: '1000',
  });

  // Demo email accounts
  const [emailAccounts] = useState([
    {
      id: '1',
      email: 'info@example.com',
      quota: 1000,
      used: 350,
      createdAt: '2025-01-01',
    },
    {
      id: '2',
      email: 'support@example.com',
      quota: 2000,
      used: 780,
      createdAt: '2025-01-03',
    },
    {
      id: '3',
      email: 'sales@example.com',
      quota: 1000,
      used: 120,
      createdAt: '2025-01-05',
    },
    {
      id: '4',
      email: 'noreply@example.com',
      quota: 500,
      used: 50,
      createdAt: '2025-01-07',
    },
    {
      id: '5',
      email: 'admin@example.com',
      quota: -1, // Unlimited
      used: 1500,
      createdAt: '2025-01-10',
    },
  ]);

  const getUsagePercentage = (used: number, quota: number) => {
    if (quota === -1) return 0;
    return Math.round((used / quota) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email account creation
    console.log('Creating email account:', formData);
    alert('E-posta hesabı oluşturma özelliği yakında eklenecek!');
    setShowAddForm(false);
    setFormData({ email: '', password: '', quota: '1000' });
  };

  const handleDelete = (emailId: string, emailAddress: string) => {
    if (confirm(`${emailAddress} hesabını silmek istediğinizden emin misiniz?`)) {
      // TODO: Implement email deletion
      console.log('Deleting email:', emailId);
      alert('E-posta silme özelliği yakında eklenecek!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">E-posta Hesapları</h1>
                <p className="text-sm text-gray-600">E-posta hesaplarınızı yönetin</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Yeni E-posta</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Hesap</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{emailAccounts.length}</p>
              </div>
              <EnvelopeIcon className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kota</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {emailAccounts.reduce((sum, acc) => sum + (acc.quota === -1 ? 0 : acc.quota), 0)} MB
                </p>
              </div>
              <InboxIcon className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kullanılan</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {emailAccounts.reduce((sum, acc) => sum + acc.used, 0)} MB
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-10 h-10 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Email Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Yeni E-posta Hesabı</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta Adresi *
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="kullanici"
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="text-gray-600">@example.com</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Güçlü bir şifre girin"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">En az 8 karakter olmalıdır</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kota (MB)
                </label>
                <select
                  value={formData.quota}
                  onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="250">250 MB</option>
                  <option value="500">500 MB</option>
                  <option value="1000">1 GB (1000 MB)</option>
                  <option value="2000">2 GB (2000 MB)</option>
                  <option value="5000">5 GB (5000 MB)</option>
                  <option value="-1">Sınırsız</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Hesap Oluştur
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ email: '', password: '', quota: '1000' });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Email Accounts List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">E-posta Hesapları</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {emailAccounts.map((account) => {
              const percentage = getUsagePercentage(account.used, account.quota);
              return (
                <div
                  key={account.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <EnvelopeIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {account.email}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Eklendi: {new Date(account.createdAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => alert('Şifre değiştirme özelliği yakında eklenecek!')}
                        className="flex items-center space-x-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <KeyIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Şifre Değiştir</span>
                      </button>
                      <button
                        onClick={() => handleDelete(account.id, account.email)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hesabı Sil"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Usage Bar */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Kullanım</span>
                      <span className="font-semibold text-gray-900">
                        {account.used} MB / {account.quota === -1 ? 'Sınırsız' : `${account.quota} MB`}
                        {account.quota !== -1 && ` (${percentage}%)`}
                      </span>
                    </div>
                    {account.quota !== -1 && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getUsageColor(percentage)}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <EnvelopeIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-purple-900">
              <p className="font-semibold mb-2">E-posta Hesaplarınızı Kullanma:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Webmail üzerinden erişim: <code className="bg-purple-100 px-1 rounded">mail.example.com</code></li>
                <li>IMAP Sunucusu: <code className="bg-purple-100 px-1 rounded">mail.example.com:993 (SSL)</code></li>
                <li>SMTP Sunucusu: <code className="bg-purple-100 px-1 rounded">mail.example.com:465 (SSL)</code></li>
                <li>POP3 Sunucusu: <code className="bg-purple-100 px-1 rounded">mail.example.com:995 (SSL)</code></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
