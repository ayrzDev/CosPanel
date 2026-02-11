'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  EnvelopeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  KeyIcon,
  InboxIcon,
  PaperAirplaneIcon,
  Cog6ToothIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { emailApi, type EmailAccount } from '@/lib/api';

export default function EmailPage() {
  const t = useTranslations('emailModule');
  const [searchQuery, setSearchQuery] = useState('');
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [newEmail, setNewEmail] = useState({ username: '', domain: 'example.com', password: '', quota: 1 });
  const [selectedAccount, setSelectedAccount] = useState<EmailAccount | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ password: '', confirm: '' });
  const [quotaForm, setQuotaForm] = useState({ quotaGb: 1 });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [quotaLoading, setQuotaLoading] = useState(false);

  // Fetch email accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await emailApi.getAccounts();
        setAccounts(data);
      } catch (err) {
        console.error('Error fetching email accounts:', err);
        setError('E-posta hesapları yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Add email handler
  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.username.trim() || !newEmail.password.trim()) return;
    
    setAddLoading(true);
    setError(null);
    
    try {
      const email = `${newEmail.username.trim()}@${newEmail.domain}`;
      const created = await emailApi.createAccount({
        email,
        password: newEmail.password,
        quota: newEmail.quota * 1024, // Convert GB to MB for backend
      });
      setAccounts(prev => [...prev, created]);
      setNewEmail({ username: '', domain: 'example.com', password: '', quota: 1 });
      setShowAddModal(false);
    } catch (err: any) {
      console.error('Error adding email:', err);
      setError(err?.response?.data?.message || 'E-posta hesabı eklenirken hata oluştu');
    } finally {
      setAddLoading(false);
    }
  };

  // Delete email handler
  const handleDeleteEmail = async (id: string, email: string) => {
    if (!confirm(`"${email}" e-posta hesabını silmek istediğinize emin misiniz?`)) return;
    
    try {
      await emailApi.deleteAccount(id);
      setAccounts(prev => prev.filter(a => a.id !== id));
    } catch (err: any) {
      console.error('Error deleting email:', err);
      setError(err?.response?.data?.message || 'E-posta hesabı silinirken hata oluştu');
    }
  };

  const filteredAccounts = accounts.filter((account) =>
    account.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openPasswordModal = (account: EmailAccount) => {
    setSelectedAccount(account);
    setPasswordForm({ password: '', confirm: '' });
    setShowQuotaModal(false);
    setShowPasswordModal(true);
    setError(null);
  };

  const openQuotaModal = (account: EmailAccount) => {
    setSelectedAccount(account);
    setQuotaForm({ quotaGb: Math.max(1, Math.round(account.quota / 1024) || 1) });
    setShowPasswordModal(false);
    setShowQuotaModal(true);
    setError(null);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({ password: '', confirm: '' });
    setSelectedAccount(null);
  };

  const closeQuotaModal = () => {
    setShowQuotaModal(false);
    setQuotaForm({ quotaGb: 1 });
    setSelectedAccount(null);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount) return;

    if (!passwordForm.password.trim() || passwordForm.password !== passwordForm.confirm) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    setPasswordLoading(true);
    setError(null);

    try {
      const updated = await emailApi.updateAccount(selectedAccount.id, {
        password: passwordForm.password,
      });
      setAccounts((prev) => prev.map((acc) => (acc.id === updated.id ? { ...acc, ...updated } : acc)));
      closePasswordModal();
    } catch (err: any) {
      console.error('Error updating password:', err);
      setError(err?.response?.data?.message || 'Şifre güncellenirken hata oluştu');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleQuotaUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount) return;

    setQuotaLoading(true);
    setError(null);

    try {
      const updated = await emailApi.updateAccount(selectedAccount.id, {
        quota: quotaForm.quotaGb * 1024,
      });
      setAccounts((prev) => prev.map((acc) => (acc.id === updated.id ? { ...acc, ...updated } : acc)));
      closeQuotaModal();
    } catch (err: any) {
      console.error('Error updating quota:', err);
      setError(err?.response?.data?.message || 'Kota güncellenirken hata oluştu');
    } finally {
      setQuotaLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('accounts')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            E-posta hesaplarınızı oluşturun ve yönetin
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Yeni E-posta
        </button>
      </div>

      {/* Add Email Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni E-posta Hesabı</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleAddEmail} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  E-posta Adresi
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={newEmail.username}
                    onChange={(e) => setNewEmail(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="kullanici"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <span className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-600 dark:text-gray-300">
                    @{newEmail.domain}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Şifre
                </label>
                <input
                  type="password"
                  value={newEmail.password}
                  onChange={(e) => setNewEmail(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={8}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  En az 8 karakter
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kota (GB)
                </label>
                <select
                  value={newEmail.quota}
                  onChange={(e) => setNewEmail(prev => ({ ...prev, quota: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>1 GB</option>
                  <option value={2}>2 GB</option>
                  <option value={5}>5 GB</option>
                  <option value={10}>10 GB</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addLoading ? 'Oluşturuluyor...' : 'Oluştur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Hesap</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {accounts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Aktif</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {accounts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <InboxIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Kota</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(accounts.reduce((sum, a) => sum + a.quota, 0) / 1024).toFixed(1)} GB
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <PaperAirplaneIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Kullanılan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(accounts.reduce((sum, a) => sum + a.used, 0) / 1024).toFixed(2)} GB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="E-posta ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Email Accounts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  E-posta Adresi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kullanım
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Oluşturulma
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    E-posta hesabı bulunamadı
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => {
                  const usagePercent = (account.used / account.quota) * 100;
                  return (
                    <tr
                      key={account.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {account.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          Aktif
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 max-w-[120px]">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  usagePercent > 80
                                    ? 'bg-red-500'
                                    : usagePercent > 60
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                                }`}
                                style={{ width: `${usagePercent}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {usagePercent.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {(account.used / 1024).toFixed(2)} / {(account.quota / 1024).toFixed(1)} GB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(account.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => openPasswordModal(account)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded transition-colors"
                          >
                            <KeyIcon className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openQuotaModal(account)}
                            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            <Cog6ToothIcon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteEmail(account.id, account.email)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {/* Password Modal */}
      {showPasswordModal && selectedAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Şifre Güncelle</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedAccount.email}</p>
              </div>
              <button onClick={closePasswordModal} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handlePasswordUpdate} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Yeni Şifre</label>
                <input
                  type="password"
                  value={passwordForm.password}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Yeni şifre"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifre Tekrar</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirm: e.target.value }))}
                  placeholder="Şifre tekrar"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={8}
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closePasswordModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quota Modal */}
      {showQuotaModal && selectedAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kota Düzenle</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedAccount.email}</p>
              </div>
              <button onClick={closeQuotaModal} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleQuotaUpdate} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Yeni Kota (GB)</label>
                <select
                  value={quotaForm.quotaGb}
                  onChange={(e) => setQuotaForm({ quotaGb: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size} GB
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeQuotaModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={quotaLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {quotaLoading ? 'Güncelleniyor...' : 'Kotayı Güncelle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
