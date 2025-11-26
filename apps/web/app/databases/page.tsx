'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CircleStackIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  UserIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

export default function DatabasesPage() {
  const [showAddDbForm, setShowAddDbForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [dbFormData, setDbFormData] = useState({
    name: '',
  });
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
    database: '',
  });

  // Demo databases
  const [databases] = useState([
    {
      id: '1',
      name: 'example_wordpress',
      size: 45.8,
      tables: 12,
      createdAt: '2025-01-01',
      users: ['example_wpuser'],
    },
    {
      id: '2',
      name: 'example_shop',
      size: 120.5,
      tables: 28,
      createdAt: '2025-01-05',
      users: ['example_shopuser', 'example_admin'],
    },
  ]);

  const [dbUsers] = useState([
    {
      id: '1',
      username: 'example_wpuser',
      databases: ['example_wordpress'],
      createdAt: '2025-01-01',
    },
    {
      id: '2',
      username: 'example_shopuser',
      databases: ['example_shop'],
      createdAt: '2025-01-05',
    },
    {
      id: '3',
      username: 'example_admin',
      databases: ['example_shop'],
      createdAt: '2025-01-05',
    },
  ]);

  const handleCreateDb = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating database:', dbFormData);
    alert('Veritabanı oluşturma özelliği yakında eklenecek!');
    setShowAddDbForm(false);
    setDbFormData({ name: '' });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating user:', userFormData);
    alert('Kullanıcı oluşturma özelliği yakında eklenecek!');
    setShowAddUserForm(false);
    setUserFormData({ username: '', password: '', database: '' });
  };

  const handleDeleteDb = (dbId: string, dbName: string) => {
    if (confirm(`${dbName} veritabanını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!`)) {
      console.log('Deleting database:', dbId);
      alert('Veritabanı silme özelliği yakında eklenecek!');
    }
  };

  const handleDeleteUser = (userId: string, username: string) => {
    if (confirm(`${username} kullanıcısını silmek istediğinizden emin misiniz?`)) {
      console.log('Deleting user:', userId);
      alert('Kullanıcı silme özelliği yakında eklenecek!');
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
                <h1 className="text-2xl font-bold text-gray-900">MySQL Veritabanları</h1>
                <p className="text-sm text-gray-600">Veritabanlarınızı ve kullanıcılarınızı yönetin</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddUserForm(!showAddUserForm)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <UserIcon className="w-5 h-5" />
                <span>Yeni Kullanıcı</span>
              </button>
              <button
                onClick={() => setShowAddDbForm(!showAddDbForm)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Yeni Veritabanı</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Veritabanı</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{databases.length}</p>
              </div>
              <CircleStackIcon className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Boyut</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {databases.reduce((sum, db) => sum + db.size, 0).toFixed(1)} MB
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{dbUsers.length}</p>
              </div>
              <UserIcon className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Add Database Form */}
        {showAddDbForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Yeni Veritabanı Oluştur</h2>
            <form onSubmit={handleCreateDb} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Veritabanı Adı *
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">example_</span>
                  <input
                    type="text"
                    value={dbFormData.name}
                    onChange={(e) => setDbFormData({ ...dbFormData, name: e.target.value })}
                    placeholder="dbname"
                    required
                    pattern="[a-z0-9_]+"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Sadece küçük harf, rakam ve alt çizgi kullanılabilir
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Veritabanı Oluştur
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddDbForm(false);
                    setDbFormData({ name: '' });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Add User Form */}
        {showAddUserForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Yeni MySQL Kullanıcısı</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kullanıcı Adı *
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">example_</span>
                  <input
                    type="text"
                    value={userFormData.username}
                    onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })}
                    placeholder="username"
                    required
                    pattern="[a-z0-9_]+"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre *
                </label>
                <input
                  type="password"
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                  placeholder="Güçlü bir şifre girin"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">En az 8 karakter olmalıdır</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Veritabanı (Opsiyonel)
                </label>
                <select
                  value={userFormData.database}
                  onChange={(e) => setUserFormData({ ...userFormData, database: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Veritabanı seçin (isteğe bağlı)</option>
                  {databases.map((db) => (
                    <option key={db.id} value={db.name}>
                      {db.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Kullanıcıya tüm yetkilerle erişim verilecek
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Kullanıcı Oluştur
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddUserForm(false);
                    setUserFormData({ username: '', password: '', database: '' });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Databases List */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Veritabanları</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {databases.map((db) => (
              <div
                key={db.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CircleStackIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-mono">
                        {db.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>Boyut: {db.size} MB</span>
                        <span>•</span>
                        <span>{db.tables} tablo</span>
                        <span>•</span>
                        <span>{db.users.length} kullanıcı</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => alert('phpMyAdmin açılıyor...')}
                      className="px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      phpMyAdmin
                    </button>
                    <button
                      onClick={() => handleDeleteDb(db.id, db.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Veritabanını Sil"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Users List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">MySQL Kullanıcıları</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {dbUsers.map((user) => (
              <div
                key={user.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <UserIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-mono">
                        {user.username}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Erişim: {user.databases.join(', ')}
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
                      onClick={() => handleDeleteUser(user.id, user.username)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Kullanıcıyı Sil"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CircleStackIcon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-900">
              <p className="font-semibold mb-2">MySQL Bağlantı Bilgileri:</p>
              <ul className="space-y-1 font-mono text-xs">
                <li><strong>Host:</strong> localhost</li>
                <li><strong>Port:</strong> 3306</li>
                <li><strong>phpMyAdmin:</strong> umixpanel.com/phpmyadmin</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
