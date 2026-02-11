'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';

type Action = 'forward' | 'discard' | 'fail';

export default function DefaultAddressPage() {
  const [action, setAction] = useState<Action>('forward');
  const [forwardTo, setForwardTo] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const res = await apiClient.get('/email/default');
      const data = res.data;
      if (data) {
        setAction(data.action || 'forward');
        setForwardTo(data.forwardTo || '');
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { load(); }, []);

  async function save() {
    setSaving(true);
    try {
      const payload: any = { action };
      if (action === 'forward' && forwardTo && forwardTo.trim() !== '') payload.forwardTo = forwardTo;
      await apiClient.put('/email/default', payload);
      alert('Saved');
    } catch (e) {
      console.error(e);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Default Address</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bilinmeyen e-postalara varsayılan adres atayın</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Address Action</label>
            <select value={action} onChange={(e) => setAction(e.target.value as Action)} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option value="forward">Forward to Email Address</option>
              <option value="discard">Discard (Not Recommended)</option>
              <option value="fail">Fail (Return to Sender)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Forward to</label>
            <input value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} type="email" placeholder="admin@siyezden.com" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
          </div>
          <button onClick={save} disabled={saving} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}
