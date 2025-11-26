'use client';

import './globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AuthProvider from '../components/AuthProvider';
import {
  HomeIcon,
  UserGroupIcon,
  ServerIcon,
  DocumentTextIcon,
  TicketIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  GlobeAltIcon,
  ChartBarIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const navigationGroups = [
  {
    name: 'Genel',
    items: [
      { name: 'Dashboard', href: '/', icon: HomeIcon },
      { name: 'Bildirimler', href: '/notifications', icon: BellIcon, badge: 3 },
    ],
  },
  {
    name: 'Altyapı Yönetimi',
    items: [
      { name: 'Sunucular', href: '/servers', icon: ServerIcon },
      { name: 'IP Adresleri', href: '/servers/ip-addresses', icon: GlobeAltIcon },
    ],
  },
  {
    name: 'Müşteri Yönetimi',
    items: [
      { name: 'Müşteriler', href: '/customers', icon: UserGroupIcon },
      { name: 'Hosting Planları', href: '/hosting-plans', icon: ChartBarIcon },
    ],
  },
  {
    name: 'Finans & Destek',
    items: [
      { name: 'Faturalar', href: '/invoices', icon: DocumentTextIcon },
      { name: 'Destek Talepleri', href: '/tickets', icon: TicketIcon },
    ],
  },
  {
    name: 'Ayarlar',
    items: [
      { name: 'Sistem Ayarları', href: '/settings', icon: Cog6ToothIcon },
    ],
  },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Don't show sidebar on login page
  const isLoginPage = pathname === '/login';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Get token
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    
    if (token) {
      try {
        // Call logout API
        await fetch('http://localhost:3001/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout API error:', error);
      }
    }
    
    // Clear any stored auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      sessionStorage.clear();
    }
    
    // Redirect to login page
    setTimeout(() => {
      window.location.href = '/login';
    }, 300);
  };

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-gray-50 to-gray-100">
        <AuthProvider>
          {isLoginPage ? (
            // Login page without sidebar
            children
          ) : (
            // Dashboard layout with sidebar
            <div className="flex h-screen">
              {/* Sidebar */}
              <div className="w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col shadow-2xl">
                {/* Logo */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <ServerIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        UmixPanel
                      </h1>
                      <p className="text-xs text-gray-400">Admin Panel v1.0</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                  {navigationGroups.map((group) => {
                    const isCollapsed = collapsedGroups.has(group.name);
                    
                    return (
                      <div key={group.name} className="mb-4">
                        <button
                          onClick={() => toggleGroup(group.name)}
                          className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
                        >
                          <span>{group.name}</span>
                          {isCollapsed ? (
                            <ChevronRightIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          )}
                        </button>
                        
                        {!isCollapsed && (
                          <div className="mt-1 space-y-1">
                            {group.items.map((item) => {
                              const Icon = item.icon;
                              const isActive = pathname === item.href || 
                                (item.href !== '/' && pathname?.startsWith(item.href));
                              
                              return (
                                <Link
                                  key={item.name}
                                  href={item.href as any}
                                  className={`flex items-center justify-between space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                                    isActive
                                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50'
                                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium text-sm">{item.name}</span>
                                  </div>
                                  {item.badge && (
                                    <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold">AD</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Admin User</p>
                      <p className="text-xs text-gray-400">admin@umixpanel.local</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>{isLoggingOut ? 'Çıkış Yapılıyor...' : 'Çıkış Yap'}</span>
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
