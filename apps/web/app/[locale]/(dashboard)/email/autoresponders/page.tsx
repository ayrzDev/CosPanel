'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { ClockIcon, EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Autoresponder {
  id: string;
  email: string;
  subject: string;
  body: string;
  startDate?: string;
  endDate?: string;
  interval: number;
}

export default function AutorespondersPage() {
  const [autoresponders, setAutoresponders] = useState<Autoresponder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: '', subject: '', body: '', interval: 24 });

  useEffect(() => {
    loadAutoresponders();
  }, []);

  const loadAutoresponders = async () => {
    try {
      const response = await apiClient.get('/email/autoresponders');
      setAutoresponders(response.data);
    } catch (error) {
      console.error('Failed to load autoresponders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/email/autoresponders', formData);
      setShowModal(false);
      setFormData({ email: '', subject: '', body: '', interval: 24 });
      loadAutoresponders();
    } catch (error) {
      console.error('Failed to create autoresponder:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu autoresponder\'ı silmek istediğinizden emin misiniz?')) return;
    try {
      await apiClient.delete(`/email/autoresponders/${id}`);
      loadAutoresponders();
    } catch (error) {
      console.error('Failed to delete autoresponder:', error);
    }
  };

  if (loading) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <ClockIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Autoresponders</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Otomatik e-posta yanıtları ayarlayın</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Add Autoresponder
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Interval</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {autoresponders.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  Henüz autoresponder eklenmemiş
                </td>
              </tr>
            ) : (
              autoresponders.map((ar) => (
                <tr key={ar.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{ar.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{ar.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{ar.interval}h</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(ar.id)} className="text-red-600 hover:text-red-700 text-sm">Delete</button>
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
            <h2 className="text-xl font-bold mb-4">Add Autoresponder</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Body</label>
                <textarea value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})} className="w-full px-3 py-2 border rounded-lg" rows={4} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Interval (hours)</label>
                <input type="number" value={formData.interval} onChange={(e) => setFormData({...formData, interval: parseInt(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" required />
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
