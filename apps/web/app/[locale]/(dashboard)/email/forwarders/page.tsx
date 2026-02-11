'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  EnvelopeIcon,
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { emailApi, type Forwarder } from '@/lib/api';

export default function ForwardersPage() {
  const [forwarders, setForwarders] = useState<Forwarder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedForwarder, setSelectedForwarder] = useState<Forwarder | null>(null);
  const [form, setForm] = useState({ source: '', destination: '' });
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const loadForwarders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await emailApi.getForwarders();
        setForwarders(data);
      } catch (err) {
        console.error('Error fetching forwarders:', err);
        setError('Forwarder listesi yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadForwarders();
  }, []);

  const destinationBadges = (forwarder: Forwarder) =>
    forwarder.destination
      .split(/[,;\s]+/)
      .map((item) => item.trim())
      .filter(Boolean);

  const filteredForwarders = useMemo(
    () =>
      forwarders.filter((forwarder) =>
        `${forwarder.source} ${forwarder.destination}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [forwarders, searchQuery]
  );

  const totalDestinationCount = useMemo(
    () => forwarders.reduce((acc, f) => acc + destinationBadges(f).length, 0),
    [forwarders]
  );

  const resetForm = () => setForm({ source: '', destination: '' });

  const openAddModal = () => {
    resetForm();
    setError(null);
    setShowAddModal(true);
  };

  const openEditModal = (forwarder: Forwarder) => {
    setSelectedForwarder(forwarder);
    setForm({ source: forwarder.source, destination: forwarder.destination });
    setError(null);
    setShowEditModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedForwarder(null);
    resetForm();
  };

  const handleCreateForwarder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.source.trim() || !form.destination.trim()) return;

    setCreateLoading(true);
    setError(null);

    try {
      const payload = {
        source: form.source.trim().toLowerCase(),
        destination: form.destination.trim().toLowerCase(),
      };
      const created = await emailApi.createForwarder(payload);
      setForwarders((prev) => [created, ...prev]);
      closeAddModal();
    } catch (err: any) {
      console.error('Error creating forwarder:', err);
      setError(err?.response?.data?.message || 'Forwarder oluşturulurken hata oluştu');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleEditForwarder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForwarder) return;

    setEditLoading(true);
    setError(null);

    try {
      const payload = {
        source: form.source.trim().toLowerCase(),
        destination: form.destination.trim().toLowerCase(),
      };
      const updated = await emailApi.updateForwarder(selectedForwarder.id, payload);
      setForwarders((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
      closeEditModal();
    } catch (err: any) {
      console.error('Error updating forwarder:', err);
      setError(err?.response?.data?.message || 'Forwarder güncellenirken hata oluştu');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteForwarder = async (forwarder: Forwarder) => {
    if (!confirm(`"${forwarder.source}" yönlendirmesini silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      await emailApi.deleteForwarder(forwarder.id);
      setForwarders((prev) => prev.filter((f) => f.id !== forwarder.id));
    } catch (err: any) {
      console.error('Error deleting forwarder:', err);
      setError(err?.response?.data?.message || 'Forwarder silinirken hata oluştu');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ArrowPathIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">E-posta Forwarders</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                E-postaları otomatik olarak başka adreslere yönlendirin
              </p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Yeni Forwarder
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ArrowPathIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Forwarder</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{forwarders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Kaynak Adresleri</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{forwarders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hedef Adresleri</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalDestinationCount}</p>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kaynak veya hedef adres ara..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Forwarders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mevcut Forwarders</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Kaynak Adres
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Hedef Adresler
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Oluşturulma
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredForwarders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      Forwarder bulunamadı
                    </td>
                  </tr>
                ) : (
                  filteredForwarders.map((forwarder) => (
                    <tr key={forwarder.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {forwarder.source}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {destinationBadges(forwarder).map((email) => (
                            <span
                              key={`${forwarder.id}-${email}`}
                              className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded"
                            >
                              <ArrowPathIcon className="w-3 h-3 mr-1" />
                              {email}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(forwarder.createdAt).toLocaleString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(forwarder)}
                            className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 p-2 rounded transition-colors"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteForwarder(forwarder)}
                            className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 p-2 rounded transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <ArrowPathIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
              E-posta Yönlendirme Nasıl Çalışır?
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Kaynak adrese gelen e-postalar otomatik olarak hedef adreslere yönlendirilir</li>
              <li>• Virgül veya boşluk ile birden fazla hedef adres ekleyebilirsiniz</li>
              <li>• Forwarder aynı zamanda kaynak adreste de e-postayı saklayabilir</li>
              <li>• Spam filtreleri yönlendirilen e-postalara da uygulanır</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Forwarder</h3>
              <button onClick={closeAddModal} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreateForwarder} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaynak E-posta</label>
                <input
                  type="email"
                  value={form.source}
                  onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value }))}
                  placeholder="ornek@alan.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hedef E-postalar</label>
                <textarea
                  value={form.destination}
                  onChange={(e) => setForm((prev) => ({ ...prev, destination: e.target.value }))}
                  placeholder="hedef1@alan.com, hedef2@alan.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Birden fazla adresi virgül veya boşlukla ayırabilirsiniz.</p>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createLoading ? 'Kaydediliyor...' : 'Forwarder Oluştur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedForwarder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Forwarder Düzenle</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedForwarder.source}</p>
              </div>
              <button onClick={closeEditModal} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleEditForwarder} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaynak E-posta</label>
                <input
                  type="email"
                  value={form.source}
                  onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hedef E-postalar</label>
                <textarea
                  value={form.destination}
                  onChange={(e) => setForm((prev) => ({ ...prev, destination: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editLoading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
