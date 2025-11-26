'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TicketIcon,
  PlusIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function TicketsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: 'TECHNICAL',
    priority: 'MEDIUM',
    message: '',
  });

  // Demo tickets
  const [tickets] = useState([
    {
      id: '1',
      ticketNumber: 'TKT-001',
      subject: 'Web sitem açılmıyor',
      category: 'TECHNICAL',
      priority: 'HIGH',
      status: 'OPEN',
      createdAt: '2025-01-10T10:30:00',
      lastReply: '2025-01-10T14:20:00',
      messages: 3,
    },
    {
      id: '2',
      ticketNumber: 'TKT-002',
      subject: 'E-posta hesabı oluşturma',
      category: 'GENERAL',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      createdAt: '2025-01-09T15:45:00',
      lastReply: '2025-01-10T09:15:00',
      messages: 5,
    },
    {
      id: '3',
      ticketNumber: 'TKT-003',
      subject: 'Disk kotası artırma talebi',
      category: 'BILLING',
      priority: 'LOW',
      status: 'CLOSED',
      createdAt: '2025-01-08T11:20:00',
      lastReply: '2025-01-08T16:40:00',
      messages: 4,
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: '1', // TODO: Get from auth
          subject: formData.subject,
          category: formData.category,
          priority: formData.priority,
          message: formData.message,
        }),
      });

      if (response.ok) {
        alert('Destek talebiniz başarıyla oluşturuldu!');
        setShowCreateForm(false);
        setFormData({ subject: '', category: 'TECHNICAL', priority: 'MEDIUM', message: '' });
        // TODO: Refresh tickets list
      } else {
        const error = await response.json();
        alert(`Hata: ${error.message}`);
      }
    } catch (error) {
      console.error('Failed to create ticket:', error);
      alert('Destek talebi oluşturulurken bir hata oluştu!');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      OPEN: { bg: 'bg-green-100', text: 'text-green-800', icon: ClockIcon, label: 'Açık' },
      IN_PROGRESS: { bg: 'bg-blue-100', text: 'text-blue-800', icon: ExclamationCircleIcon, label: 'İşlemde' },
      CLOSED: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircleIcon, label: 'Kapalı' },
    };
    const badge = badges[status as keyof typeof badges] || badges.OPEN;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        <span>{badge.label}</span>
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      LOW: 'bg-gray-100 text-gray-800',
      MEDIUM: 'bg-yellow-100 text-yellow-800',
      HIGH: 'bg-orange-100 text-orange-800',
      URGENT: 'bg-red-100 text-red-800',
    };
    const labels = {
      LOW: 'Düşük',
      MEDIUM: 'Orta',
      HIGH: 'Yüksek',
      URGENT: 'Acil',
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[priority as keyof typeof colors]}`}>
        {labels[priority as keyof typeof labels]}
      </span>
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      TECHNICAL: 'Teknik',
      BILLING: 'Faturalama',
      GENERAL: 'Genel',
    };
    return labels[category as keyof typeof labels] || category;
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
                <h1 className="text-2xl font-bold text-gray-900">Destek Talepleri</h1>
                <p className="text-sm text-gray-600">Destek taleplerinizi görüntüleyin ve yönetin</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Yeni Talep</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Ticket Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Yeni Destek Talebi</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konu *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Sorununuzu kısaca özetleyin"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="TECHNICAL">Teknik Destek</option>
                    <option value="BILLING">Faturalama</option>
                    <option value="GENERAL">Genel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Öncelik *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="LOW">Düşük</option>
                    <option value="MEDIUM">Orta</option>
                    <option value="HIGH">Yüksek</option>
                    <option value="URGENT">Acil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajınız *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Sorununuzu detaylı olarak açıklayın..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Talep Oluştur
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setFormData({ subject: '', category: 'TECHNICAL', priority: 'MEDIUM', message: '' });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tickets List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Taleplerim</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-mono text-sm text-gray-600">
                        {ticket.ticketNumber}
                      </span>
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                      <span className="text-xs text-gray-500">
                        {getCategoryLabel(ticket.category)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {ticket.subject}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>
                        Oluşturulma: {new Date(ticket.createdAt).toLocaleString('tr-TR')}
                      </span>
                      <span>•</span>
                      <span>
                        Son Yanıt: {new Date(ticket.lastReply).toLocaleString('tr-TR')}
                      </span>
                      <span>•</span>
                      <span>{ticket.messages} mesaj</span>
                    </div>
                  </div>

                  <Link
                    href={{ pathname: '/tickets/[id]', query: { id: ticket.id } }}
                    className="ml-4 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    Görüntüle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TicketIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-2">Destek Hakkında:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Teknik destek talepleri genellikle 24 saat içinde yanıtlanır.</li>
                <li>Acil talepler öncelikli olarak değerlendirilir.</li>
                <li>Ticket numaranızı not alın ve referans olarak kullanın.</li>
                <li>Sorun çözüldüğünde talebi kapatmayı unutmayın.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
