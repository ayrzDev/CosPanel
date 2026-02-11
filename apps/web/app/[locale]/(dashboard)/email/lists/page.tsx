'use client';

import { useEffect, useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import apiClient from '@/lib/api-client';

type List = {
  id: string;
  name: string;
  email: string;
  description?: string;
  members?: Array<{ id: string; email: string }>;
  createdAt?: string;
};

export default function MailingListsPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [manageList, setManageList] = useState<List | null>(null);

  async function loadLists() {
    setLoading(true);
    try {
      const res = await apiClient.get('/email/mailing-lists');
      setLists(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLists();
  }, []);

  async function createList() {
    // client-side validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!newEmail || !emailRegex.test(newEmail)) {
      alert('Please enter a valid email for the list (e.g. newsletter@site.local)');
      return;
    }

    try {
      await apiClient.post('/email/mailing-lists', { email: newEmail, name: newName });
      setShowCreate(false);
      setNewEmail('');
      setNewName('');
      loadLists();
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.message || 'Failed to create list';
      alert(msg);
    }
  }

  async function deleteList(id: string) {
    if (!confirm('Are you sure you want to delete this mailing list?')) return;
    try {
      await apiClient.delete(`/email/mailing-lists/${id}`);
      loadLists();
    } catch (e) {
      console.error(e);
      alert('Failed to delete list');
    }
  }

  async function openManage(id: string) {
    try {
      const res = await apiClient.get(`/email/mailing-lists/${id}`);
      setManageList(res.data);
    } catch (e) {
      console.error(e);
      alert('Failed to load list');
    }
  }

  async function addMember(listId: string, email: string) {
    try {
      await apiClient.post(`/email/mailing-lists/${listId}/members`, { email });
      const res = await apiClient.get(`/email/mailing-lists/${listId}`);
      setManageList(res.data);
      loadLists();
    } catch (e) {
      console.error(e);
      alert('Failed to add member');
    }
  }

  async function removeMember(memberId: string) {
    if (!confirm('Remove member?')) return;
    try {
      await apiClient.delete(`/email/mailing-lists/members/${memberId}`);
      if (manageList) {
        const res = await apiClient.get(`/email/mailing-lists/${manageList.id}`);
        setManageList(res.data);
      }
      loadLists();
    } catch (e) {
      console.error(e);
      alert('Failed to remove member');
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mailing Lists</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">E-posta listelerinizi yönetin</p>
            </div>
          </div>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Create List</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">List Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Subscribers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-4">Loading...</td></tr>
            ) : lists.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4">No lists found</td></tr>
            ) : (
              lists.map((list) => (
                <tr key={list.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{list.name || list.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{(list.members || []).length}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{list.createdAt?.slice(0,10) || ''}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openManage(list.id)} className="text-blue-600 hover:text-blue-700 text-sm mr-3">Manage</button>
                    <button onClick={() => deleteList(list.id)} className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Create Mailing List</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">List Email</label>
                <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name (optional)</label>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowCreate(false)} className="px-4 py-2">Cancel</button>
                <button onClick={createList} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Modal */}
      {manageList && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-lg font-bold mb-4">Manage: {manageList.name || manageList.email}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Add Member</label>
                <div className="flex gap-2">
                  <input id="newMember" placeholder="email@example.com" className="flex-1 px-3 py-2 border rounded" />
                  <button onClick={() => { const el = document.getElementById('newMember') as HTMLInputElement; if(el?.value) addMember(manageList.id, el.value); el.value=''; }} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Members</h3>
                <ul className="mt-2 divide-y">
                  {(manageList.members || []).map((m) => (
                    <li key={m.id} className="flex justify-between items-center py-2">
                      <span>{m.email}</span>
                      <button onClick={() => removeMember(m.id)} className="text-red-600">Remove</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <button onClick={() => setManageList(null)} className="px-4 py-2">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
