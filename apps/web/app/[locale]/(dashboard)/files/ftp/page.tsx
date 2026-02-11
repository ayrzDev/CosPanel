 'use client';

import { useState, useEffect } from 'react';
import { 
  ServerIcon, 
  PlusIcon,
  KeyIcon,
  TrashIcon,
  PencilSquareIcon,
  FolderIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { filesApi } from '@/lib/api/files';

interface FTPAccount {
  id: string;
  username: string;
  directory: string;
  quota: number | string;
  used?: string | number;
  createdAt?: string;
}

export default function FTPAccountsPage() {
  const [ftpAccounts, setFtpAccounts] = useState<FTPAccount[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccount, setNewAccount] = useState({ username: '', directory: '', quota: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFtpAccounts();
  }, []);

  const loadFtpAccounts = async () => {
    try {
      setLoading(true);
      const data = await filesApi.getAllFtp();
      console.log('[FTP Page] Loaded accounts:', data);
      setFtpAccounts(data || []);
    } catch (err) {
      console.error('Failed to load FTP accounts', err);
      alert('FTP hesapları yüklenemedi: ' + (err?.response?.data?.message || err?.message || 'Bilinmeyen hata'));
    } finally {
      setLoading(false);
    }
  };

  const getQuotaPercentage = (used: string, quota: string): number => {
    if (!quota || quota === 'Unlimited' || Number(quota) === 0) return 0;
    const usedGB = parseFloat(String(used || '0')) || 0;
    const quotaGB = parseFloat(String(quota)) || 0;
    if (quotaGB === 0) return 0;
    return (usedGB / quotaGB) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ServerIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                FTP Accounts
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                FTP hesaplarınızı oluşturun ve yönetin
              </p>
            </div>
          </div>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <PlusIcon className="w-5 h-5" />
            Create FTP Account
          </button>
        </div>
      </div>
      
      {/* Add FTP Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni FTP Hesabı Oluştur</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">✕</button>
            </div>
            <form onSubmit={async (e) => { e.preventDefault(); try { await filesApi.createFtp(newAccount); setShowAddModal(false); setNewAccount({ username: '', directory: '', quota: '' }); await loadFtpAccounts(); } catch (err) { console.error(err); alert('Oluşturma başarısız'); } }} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kullanıcı Adı</label>
                <input value={newAccount.username} onChange={(e) => setNewAccount(prev => ({ ...prev, username: e.target.value }))} className="w-full px-3 py-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dizin</label>
                <input value={newAccount.directory} onChange={(e) => setNewAccount(prev => ({ ...prev, directory: e.target.value }))} className="w-full px-3 py-2 border rounded" required />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded">İptal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Oluştur</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ServerIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Accounts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{ftpAccounts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FolderIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Storage</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8.4 GB</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <KeyIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <LockClosedIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">SFTP Enabled</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Yes</p>
            </div>
          </div>
        </div>
      </div>

      {/* FTP Connection Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
          FTP Connection Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-700 dark:text-blue-400 font-medium">FTP Server:</p>
            <code className="text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
              ftp.siyezden.com
            </code>
          </div>
          <div>
            <p className="text-blue-700 dark:text-blue-400 font-medium">FTP Port:</p>
            <code className="text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
              21
            </code>
          </div>
          <div>
            <p className="text-blue-700 dark:text-blue-400 font-medium">SFTP Port:</p>
            <code className="text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
              22
            </code>
          </div>
          <div>
            <p className="text-blue-700 dark:text-blue-400 font-medium">Username Format:</p>
            <code className="text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
              username@domain.com
            </code>
          </div>
        </div>
      </div>

      {/* FTP Accounts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">FTP Accounts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Directory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Quota Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={5} className="p-6 text-center">Yükleniyor...</td></tr>
              ) : (ftpAccounts.length === 0) ? (
                <tr><td colSpan={5} className="p-6 text-center">FTP hesabı bulunamadı</td></tr>
              ) : (
                ftpAccounts.map((account) => {
                  const percentage = getQuotaPercentage(account.used || '0', String(account.quota || '0'));
                  return (
                    <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <ServerIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {account.username}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FolderIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-mono text-xs">
                            {account.directory}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400">
                              {account.used || '0 MB'} / {account.quota === 0 ? 'Unlimited' : account.quota + ' MB'}
                            </span>
                            {account.quota !== 'Unlimited' && (
                              <span className="text-gray-500 dark:text-gray-500">
                                {percentage.toFixed(0)}%
                              </span>
                            )}
                          </div>
                          {account.quota !== 'Unlimited' && (
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  percentage > 80 ? 'bg-red-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {account.createdAt ? new Date(account.createdAt).toLocaleDateString('tr-TR') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={async () => { /* TODO change password */ }} className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 p-2 rounded transition-colors">
                            <KeyIcon className="w-5 h-5" title="Change Password" />
                          </button>
                          <button onClick={async () => {
                            const newQuota = prompt('Yeni kota (GB) girin veya boş bırakın (Unlimited):', account.quota === 'Unlimited' ? '' : account.quota);
                            if (newQuota === null) return;
                            try {
                              await filesApi.updateFtp(account.id.toString(), { quota: newQuota || 'Unlimited' });
                              await loadFtpAccounts();
                            } catch (err) { console.error(err); alert('Güncelleme başarısız'); }
                          }} className="text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 p-2 rounded transition-colors">
                            <PencilSquareIcon className="w-5 h-5" title="Edit Quota" />
                          </button>
                          <button onClick={async () => {
                            if (!confirm('Bu FTP hesabını silmek istediğinize emin misiniz?')) return;
                            try {
                              await filesApi.deleteFtp(account.id.toString());
                              await loadFtpAccounts();
                            } catch (err) { console.error(err); alert('Silme başarısız'); }
                          }} className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 p-2 rounded transition-colors">
                            <TrashIcon className="w-5 h-5" title="Delete" />
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

      {/* Recommended FTP Clients */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recommended FTP Clients
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">FileZilla</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Free, cross-platform FTP client
            </p>
            <a href="https://filezilla-project.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Download →
            </a>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">WinSCP</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Windows FTP/SFTP client
            </p>
            <a href="https://winscp.net/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Download →
            </a>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cyberduck</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              macOS/Windows FTP client
            </p>
            <a href="https://cyberduck.io/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Download →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
