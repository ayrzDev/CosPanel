'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Filter {
  id: string;
  name: string;
  condition: string;
  action: string;
  order: number;
  isActive: boolean;
}

export default function EmailFiltersPage() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', condition: '', action: '', order: 0 });

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const response = await apiClient.get('/email/filters');
      setFilters(response.data);
    } catch (error) {
      console.error('Failed to load filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/email/filters', formData);
      setShowModal(false);
      setFormData({ name: '', condition: '', action: '', order: 0 });
      loadFilters();
    } catch (error) {
      console.error('Failed to create filter:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu filtreyi silmek istediğinizden emin misiniz?')) return;
    try {
      await apiClient.delete(`/email/filters/${id}`);
      loadFilters();
    } catch (error) {
      console.error('Failed to delete filter:', error);
    }
  };

  if (loading) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <FunnelIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Filters</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Hesap bazlı e-posta filtreleri</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Create Filter
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Filter Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filters.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  Henüz filtre eklenmemiş
                </td>
              </tr>
            ) : (
              filters.map((filter) => (
                <tr key={filter.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{filter.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{filter.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{filter.order}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${filter.isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'}`}>
                      {filter.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(filter.id)} className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Filter</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Condition (JSON)</label>
                <textarea value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} className="w-full px-3 py-2 border rounded-lg" rows={3} placeholder='{"field":"subject","operator":"contains","value":"newsletter"}' required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Action (JSON)</label>
                <textarea value={formData.action} onChange={(e) => setFormData({...formData, action: e.target.value})} className="w-full px-3 py-2 border rounded-lg" rows={3} placeholder='{"type":"move","value":"Newsletters"}' required />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
