'use client';

import { Link, usePathname } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { 
  HomeIcon, 
  GlobeAltIcon, 
  ServerIcon, 
  DocumentIcon,
  CircleStackIcon,
  EnvelopeIcon,
  CloudArrowUpIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  FolderIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';

export function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { name: t('dashboard'), href: '/dashboard', icon: HomeIcon },
    { name: t('domains'), href: '/domains', icon: GlobeAltIcon },
    { name: t('sites'), href: '/sites', icon: ServerIcon },
    { name: t('files'), href: '/files', icon: FolderIcon },
    { name: t('databases'), href: '/databases', icon: CircleStackIcon },
    { name: t('email'), href: '/email', icon: EnvelopeIcon },
    { name: t('backups'), href: '/backups', icon: CloudArrowUpIcon },
    { name: t('metrics'), href: '/metrics', icon: ChartBarIcon },
    { name: t('settings'), href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div 
      className={`flex h-screen flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
  {!isCollapsed && <h1 className="text-xl font-bold text-white">UmixPanel</h1>}
        {isCollapsed && <span className="text-xl font-bold text-white">cP</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto overflow-x-hidden">
        {navigation.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
              title={isCollapsed ? item.name : ''}
            >
              <item.icon
                className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'} ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}
              />
              {!isCollapsed && item.name}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div className="border-t border-gray-800 p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
        >
          {isCollapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5" />
          ) : (
            <>
              <ChevronDoubleLeftIcon className="h-5 w-5 mr-2" />
              <span className="text-sm">{t('collapse')}</span>
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Kullanıcı</p>
              <p className="text-xs text-gray-400">user@example.com</p>
            </div>
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="border-t border-gray-800 p-2">
          <div className="h-9 w-9 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-medium text-white">U</span>
          </div>
        </div>
      )}
    </div>
  );
}
