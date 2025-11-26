'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/lib/navigation';
import { useParams, useRouter } from 'next/navigation';
import { usePathname } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import {
  EnvelopeIcon,
  GlobeAltIcon,
  FolderIcon,
  CircleStackIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  ServerIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
  KeyIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  CogIcon,
  BellIcon,
  BuildingStorefrontIcon,
  CreditCardIcon,
  PencilSquareIcon,
  LanguageIcon,
  GlobeAltIcon as WebIcon,
  CodeBracketIcon,
  PhotoIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

interface AppIcon {
  name: string;
  icon: any;
  href: string;
  description?: string;
}

export default function DashboardPage() {
  const t = useTranslations();
  const td = useTranslations('dashboardPage');
  const tn = useTranslations('nav');
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params.locale as string;

  // Session ID ve cPanel-style URL
  const [sessionId, setSessionId] = useState<string>('');
  const [dbStatus, setDbStatus] = useState<{ postgres: boolean; mysql: boolean }>({ 
    postgres: false, 
    mysql: false 
  });
  const [serviceStatus, setServiceStatus] = useState({
    api: false,
    database: false,
    email: false,
    ftp: false,
    dns: false,
  });

  useEffect(() => {
    // Generate session ID (or get from server)
    const genSessionId = Math.floor(Math.random() * 10000000000).toString();
    setSessionId(genSessionId);

    // Check Backend Services Status
    const checkServices = async () => {
      try {
        // API Health Check
        const apiResponse = await fetch('http://localhost:3001/health');
        const apiHealthy = apiResponse.ok;

        // Database check (PostgreSQL)
        const dbHealthy = apiHealthy; // Health endpoint kontrol ediyor zaten

        setServiceStatus({
          api: apiHealthy,
          database: dbHealthy,
          email: apiHealthy, // Email service API'de çalışıyor
          ftp: true, // Mock - FTP servisini varsayılan olarak aktif kabul ediyoruz
          dns: true, // Mock - DNS servisini varsayılan olarak aktif kabul ediyoruz
        });

        setDbStatus({
          postgres: dbHealthy,
          mysql: true // Mock MySQL as available
        });
      } catch (error) {
        setServiceStatus({
          api: false,
          database: false,
          email: false,
          ftp: false,
          dns: false,
        });
        setDbStatus({ postgres: false, mysql: false });
      }
    };

    checkServices();
    // Check every 15 seconds
    const interval = setInterval(checkServices, 15000);
    return () => clearInterval(interval);
  }, []);

  // Redirect to cPanel-style URL if not already there
  useEffect(() => {
    if (sessionId && !pathname.includes('/cpsess')) {
      const cpanelUrl = `/${locale}/cpsess${sessionId}/frontend/jupiter/dashboard`;
      window.history.replaceState(null, '', cpanelUrl);
    }
  }, [sessionId, pathname, locale]);

  // Collapsible state for each category - Load from localStorage
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({
    'E-POSTA': false,
    'DOSYALAR': false,
    'VERİTABANLARI': false,
    'ALAN ADLARI': false,
    'METRİKLER': false,
    'GÜVENLİK': false,
    'YAZILIM': false,
    'GELİŞMİŞ': false,
    'TERCİHLER': false,
  });

  // Client-side only - Load from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem('dashboardExpandedCategories');
    if (saved) {
      try {
        setExpandedCategories(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse saved categories:', error);
      }
    }
  }, []);

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => {
      const newState = {
        ...prev,
        [title]: !prev[title]
      };
      // Save to localStorage
      localStorage.setItem('dashboardExpandedCategories', JSON.stringify(newState));
      return newState;
    });
  };

  // Kategori durumlarını belirle
  const getCategoryStatus = (categoryTitle: string) => {
    switch (categoryTitle) {
      case 'E-POSTA':
        return {
          status: serviceStatus.email,
          label: serviceStatus.email ? 'Email Server Aktif' : 'Email Server Kapalı',
          color: serviceStatus.email ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
          bgColor: serviceStatus.email ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30',
          dotColor: serviceStatus.email ? 'bg-green-500' : 'bg-red-500',
          animate: serviceStatus.email,
        };
      case 'DOSYALAR':
        return {
          status: serviceStatus.ftp,
          label: serviceStatus.ftp ? 'FTP Server Çalışıyor' : 'FTP Server Kapalı',
          color: serviceStatus.ftp ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400',
          bgColor: serviceStatus.ftp ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-red-100 dark:bg-red-900/30',
          dotColor: serviceStatus.ftp ? 'bg-orange-500' : 'bg-red-500',
          animate: serviceStatus.ftp,
        };
      case 'VERİTABANLARI':
        return {
          status: serviceStatus.database,
          label: serviceStatus.database ? 'PostgreSQL Bağlı' : 'Veritabanı Bağlantı Yok',
          color: serviceStatus.database ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400',
          bgColor: serviceStatus.database ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-red-100 dark:bg-red-900/30',
          dotColor: serviceStatus.database ? 'bg-blue-500' : 'bg-red-500',
          animate: serviceStatus.database,
        };
      case 'ALAN ADLARI':
        return {
          status: serviceStatus.dns,
          label: serviceStatus.dns ? 'DNS Server Aktif' : 'DNS Server Kapalı',
          color: serviceStatus.dns ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400',
          bgColor: serviceStatus.dns ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-red-100 dark:bg-red-900/30',
          dotColor: serviceStatus.dns ? 'bg-teal-500' : 'bg-red-500',
          animate: serviceStatus.dns,
        };
      case 'GÜVENLİK':
        return {
          status: serviceStatus.api,
          label: serviceStatus.api ? 'API Server Güvenli' : 'API Server Kapalı',
          color: serviceStatus.api ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400',
          bgColor: serviceStatus.api ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-red-100 dark:bg-red-900/30',
          dotColor: serviceStatus.api ? 'bg-purple-500' : 'bg-red-500',
          animate: serviceStatus.api,
        };
      default:
        return null;
    }
  };

  // Her app'in durumunu belirle (kategori bazında)
  const getAppStatus = (categoryTitle: string, appName: string) => {
    // E-posta kategorisi - Email servisi
    if (categoryTitle === 'E-POSTA') {
      return serviceStatus.email;
    }
    // Dosyalar kategorisi - FTP servisi
    if (categoryTitle === 'DOSYALAR') {
      return serviceStatus.ftp;
    }
    // Veritabanları kategorisi - Database servisi
    if (categoryTitle === 'VERİTABANLARI') {
      return serviceStatus.database;
    }
    // Alan Adları kategorisi - DNS servisi
    if (categoryTitle === 'ALAN ADLARI') {
      return serviceStatus.dns;
    }
    // Güvenlik kategorisi - API servisi
    if (categoryTitle === 'GÜVENLİK') {
      return serviceStatus.api;
    }
    // Yazılım, Gelişmiş, Tercihler - API servisi
    if (['YAZILIM', 'GELİŞMİŞ', 'TERCİHLER', 'METRİKLER'].includes(categoryTitle)) {
      return serviceStatus.api;
    }
    return true; // Diğer kategoriler varsayılan olarak aktif
  };

  // cPanel kategorileri ve ikonları
  const categories = [
    {
      title: 'E-POSTA',
      apps: [
        { name: 'E-posta Hesapları', icon: EnvelopeIcon, href: '/email' },
        { name: 'Forwarders', icon: ArrowPathIcon, href: '/email/forwarders' },
        { name: 'Email Routing', icon: CodeBracketIcon, href: '/email/routing' },
        { name: 'Autoresponders', icon: DocumentTextIcon, href: '/email/autoresponders' },
        { name: 'Default Address', icon: EnvelopeIcon, href: '/email/default' },
        { name: 'Mailing Lists', icon: UserGroupIcon, href: '/email/lists' },
        { name: 'Track Delivery', icon: MagnifyingGlassIcon, href: '/email/track' },
        { name: 'Global Email Filters', icon: DocumentMagnifyingGlassIcon, href: '/email/global-filters' },
        { name: 'Email Filters', icon: DocumentMagnifyingGlassIcon, href: '/email/filters' },
        { name: 'Authentication', icon: ShieldCheckIcon, href: '/email/authentication' },
        { name: 'Address Importer', icon: ArrowPathIcon, href: '/email/importer' },
        { name: 'Encryption', icon: LockClosedIcon, href: '/email/encryption' },
        { name: 'Calendars and Contacts', icon: ClockIcon, href: '/email/calendars' },
        { name: 'BoxTrapper', icon: BeakerIcon, href: '/email/boxtrapper' },
        { name: 'Apache SpamAssassin', icon: ShieldCheckIcon, href: '/email/spamassassin' },
      ],
    },
    {
      title: 'DOSYALAR',
      apps: [
        { name: 'Dosya Yöneticisi', icon: FolderIcon, href: '/files' },
        { name: 'Images', icon: PhotoIcon, href: '/files/images' },
        { name: 'Directory Privacy', icon: LockClosedIcon, href: '/files/privacy' },
        { name: 'Disk Usage', icon: CircleStackIcon, href: '/files/disk' },
        { name: 'Web Disk', icon: ServerIcon, href: '/files/webdisk' },
        { name: 'FTP Accounts', icon: ServerIcon, href: '/files/ftp' },
        { name: 'FTP Connections', icon: ServerIcon, href: '/files/ftp-connections' },
        { name: 'Backup', icon: CloudArrowUpIcon, href: '/backups' },
        { name: 'Backup Wizard', icon: CloudArrowUpIcon, href: '/backups/wizard' },
        { name: 'Git Version Control', icon: CodeBracketIcon, href: '/files/git' },
      ],
    },
    {
      title: 'VERİTABANLARI',
      apps: [
        { name: 'phpMyAdmin', icon: CircleStackIcon, href: '/databases/phpmyadmin' },
        { name: 'MySQL Databases', icon: CircleStackIcon, href: '/databases' },
        { name: 'MySQL Database Wizard', icon: WrenchScrewdriverIcon, href: '/databases/mysql-wizard' },
        { name: 'PostgreSQL Databases', icon: CircleStackIcon, href: '/databases/postgresql' },
        { name: 'PostgreSQL Database Wizard', icon: WrenchScrewdriverIcon, href: '/databases/postgresql-wizard' },
        { name: 'Remote MySQL', icon: ServerIcon, href: '/databases/remote' },
      ],
    },
    {
      title: 'ALAN ADLARI',
      apps: [
        { name: 'Site Publisher', icon: GlobeAltIcon, href: '/domains/publisher' },
        { name: 'Domains', icon: GlobeAltIcon, href: '/domains' },
        { name: 'Addon Domains', icon: GlobeAltIcon, href: '/domains/addon' },
        { name: 'Subdomains', icon: WebIcon, href: '/domains/subdomains' },
        { name: 'Aliases', icon: DocumentDuplicateIcon, href: '/domains/aliases' },
        { name: 'Redirects', icon: ArrowPathIcon, href: '/domains/redirects' },
        { name: 'Zone Editor', icon: DocumentTextIcon, href: '/domains/zone-editor' },
        { name: 'Dynamic DNS', icon: ArrowPathIcon, href: '/domains/dynamic-dns' },
      ],
    },
    {
      title: 'METRİKLER',
      apps: [
        { name: 'Visitors', icon: UserGroupIcon, href: '/metrics/visitors' },
        { name: 'Errors', icon: DocumentTextIcon, href: '/metrics/errors' },
        { name: 'Bandwidth', icon: ChartBarIcon, href: '/metrics/bandwidth' },
        { name: 'Raw Access', icon: DocumentTextIcon, href: '/metrics/raw' },
        { name: 'Awstats', icon: ChartBarIcon, href: '/metrics/awstats' },
        { name: 'Analog Stats', icon: ChartBarIcon, href: '/metrics/analog' },
        { name: 'Webalizer', icon: ChartBarIcon, href: '/metrics/webalizer' },
        { name: 'Metrics Editor', icon: PencilSquareIcon, href: '/metrics/editor' },
      ],
    },
    {
      title: 'GÜVENLİK',
      apps: [
        { name: 'SSH Access', icon: CommandLineIcon, href: '/security/ssh' },
        { name: 'IP Blocker', icon: ShieldCheckIcon, href: '/security/ipblocker' },
        { name: 'SSL/TLS', icon: LockClosedIcon, href: '/security/ssl' },
        { name: 'SSL/TLS Status', icon: ShieldCheckIcon, href: '/security/ssl-status' },
        { name: 'Hotlink Protection', icon: ShieldCheckIcon, href: '/security/hotlink' },
        { name: 'Leech Protection', icon: ShieldCheckIcon, href: '/security/leech' },
        { name: 'ModSecurity', icon: ShieldCheckIcon, href: '/security/modsecurity' },
        { name: 'Two-Factor Authentication', icon: KeyIcon, href: '/security/2fa' },
        { name: 'Manage API Tokens', icon: KeyIcon, href: '/security/api-tokens' },
      ],
    },
    {
      title: 'YAZILIM',
      apps: [
        { name: 'PHP Version Manager', icon: CodeBracketIcon, href: '/software/php' },
        { name: 'Softaculous Apps Installer', icon: ServerIcon, href: '/software/softaculous' },
        { name: 'Site Software', icon: ServerIcon, href: '/sites' },
        { name: 'Optimize Website', icon: ChartBarIcon, href: '/software/optimize' },
        { name: 'MultiPHP INI Editor', icon: DocumentTextIcon, href: '/software/php-ini' },
        { name: 'MultiPHP Manager', icon: CogIcon, href: '/software/multiphp' },
        { name: 'Select PHP Version', icon: CodeBracketIcon, href: '/software/select-php' },
        { name: 'Perl Modules', icon: CommandLineIcon, href: '/software/perl' },
      ],
    },
    {
      title: 'GELİŞMİŞ',
      apps: [
        { name: 'Terminal', icon: CommandLineIcon, href: '/advanced/terminal' },
        { name: 'Cron Jobs', icon: ClockIcon, href: '/advanced/cron' },
        { name: 'Track DNS', icon: MagnifyingGlassIcon, href: '/advanced/track-dns' },
        { name: 'Indexes', icon: DocumentTextIcon, href: '/advanced/indexes' },
        { name: 'Error Pages', icon: DocumentTextIcon, href: '/advanced/error-pages' },
        { name: 'Apache Handlers', icon: ServerIcon, href: '/advanced/handlers' },
        { name: 'MIME Types', icon: DocumentTextIcon, href: '/advanced/mime' },
        { name: 'Virus Scanner', icon: ShieldCheckIcon, href: '/advanced/virus' },
      ],
    },
    {
      title: 'TERCİHLER',
      apps: [
        { name: 'Password & Security', icon: LockClosedIcon, href: '/settings/security' },
        { name: 'Change Language', icon: LanguageIcon, href: '/settings/language' },
        { name: 'Contact Information', icon: EnvelopeIcon, href: '/settings/contact' },
        { name: 'User Manager', icon: UserGroupIcon, href: '/settings/users' },
        { name: 'User Preferences', icon: Cog6ToothIcon, href: '/settings' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Sol Taraf: Hızlı Toollar (9 columns) */}
      <div className="xl:col-span-9 space-y-6">
        {/* cPanel Style Categories */}
        {categories.map((category) => {
          const categoryStatus = getCategoryStatus(category.title);
          
          return (
            <div key={category.title} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              {/* Category Header - Clickable */}
              <button
                onClick={() => toggleCategory(category.title)}
                className="w-full px-6 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {category.title}
                  </h2>
                  {/* Kategori Durumu kaldırıldı */}
                </div>
                {expandedCategories[category.title] ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            
            {/* Apps Grid - Collapsible */}
            {expandedCategories[category.title] && (
              <div className="p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {category.apps.map((app) => {
                  const Icon = app.icon;
                  
                  return (
                    <Link
                      key={app.name}
                      href={app.href}
                      className="group flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-150 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow hover:scale-105 relative"
                    >
                      {/* Durum indikatörü kaldırıldı */}
                      <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm group-hover:shadow transition-shadow mb-2 ring-1 ring-gray-200 dark:ring-gray-500 group-hover:ring-blue-400 dark:group-hover:ring-blue-500">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                      <span className="text-xs text-center text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium leading-tight px-1">
                        {app.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
            </div>
          );
        })}
      </div>

      {/* Sağ Taraf: İstatistikler ve Sunucu Bilgileri (3 columns) */}
      <div className="xl:col-span-3 space-y-6">
        {/* Servis Durumu - Yeni Renkli Tasarım */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <CpuChipIcon className="w-4 h-4 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                {td('serviceStatus')}
              </h3>
            </div>

            <div className="space-y-2">
              {/* API Service */}
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700/60 rounded-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${serviceStatus.api ? 'bg-green-50' : 'bg-red-50'}`}>
                    <CpuChipIcon className="w-4 h-4 text-green-600 dark:text-green-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">API Server</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${serviceStatus.api ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-xs font-medium ${serviceStatus.api ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-400'}`}>
                    {serviceStatus.api ? td('running') : td('offline')}
                  </span>
                </div>
              </div>

              {/* Database Service */}
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700/60 rounded-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${serviceStatus.database ? 'bg-blue-50' : 'bg-red-50'}`}>
                    <CircleStackIcon className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">PostgreSQL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${serviceStatus.database ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                  <span className={`text-xs font-medium ${serviceStatus.database ? 'text-blue-600 dark:text-blue-300' : 'text-red-600 dark:text-red-400'}`}>
                    {serviceStatus.database ? td('connected') : td('notConnected')}
                  </span>
                </div>
              </div>

              {/* Email Service */}
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700/60 rounded-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${serviceStatus.email ? 'bg-purple-50' : 'bg-red-50'}`}>
                    <EnvelopeIcon className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Email Server</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${serviceStatus.email ? 'bg-purple-500' : 'bg-red-500'}`}></div>
                  <span className={`text-xs font-medium ${serviceStatus.email ? 'text-purple-600 dark:text-purple-300' : 'text-red-600 dark:text-red-400'}`}>
                    {serviceStatus.email ? td('active') : td('offline')}
                  </span>
                </div>
              </div>

              {/* FTP Service */}
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700/60 rounded-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${serviceStatus.ftp ? 'bg-orange-50' : 'bg-red-50'}`}>
                    <ServerIcon className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">FTP Server</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${serviceStatus.ftp ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                  <span className={`text-xs font-medium ${serviceStatus.ftp ? 'text-orange-600 dark:text-orange-300' : 'text-red-600 dark:text-red-400'}`}>
                    {serviceStatus.ftp ? td('running') : td('offline')}
                  </span>
                </div>
              </div>

              {/* DNS Service */}
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700/60 rounded-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${serviceStatus.dns ? 'bg-teal-50' : 'bg-red-50'}`}>
                    <GlobeAltIcon className="w-4 h-4 text-teal-600 dark:text-teal-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">DNS Server</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${serviceStatus.dns ? 'bg-teal-500' : 'bg-red-500'}`}></div>
                  <span className={`text-xs font-medium ${serviceStatus.dns ? 'text-teal-600 dark:text-teal-300' : 'text-red-600 dark:text-red-400'}`}>
                    {serviceStatus.dns ? td('active') : td('offline')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Genel Bilgiler */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-md">
                <GlobeAltIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{td('generalInfo')}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">{td('currentUser')}</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">siyezden</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">{td('primaryDomain')}</span>
                <a href="https://siyezden.com" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-800 dark:text-gray-100 hover:underline">siyezden.com</a>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">Shared IP Address</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">91.217.119.88</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">{td('homeDirectory')}</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">/home/siyezden</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-gray-600 dark:text-gray-400">Last Login IP</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">104.28.164.100</span>
              </div>
            </div>
          </div>
        </div>

        {/* İstatistikler - Depolama */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-md">
                <CircleStackIcon className="w-4 h-4 text-violet-600 dark:text-violet-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{td('storageStats')}</h3>
            </div>

            <div className="space-y-3">
              {/* Inodes */}
              <div className="p-2 bg-white dark:bg-gray-700/60 rounded-md border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Inodes</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">20.525 / 25</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: '82%' }}></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">82%</span>
              </div>

              {/* Disk Kullanımı */}
              <div className="p-2 bg-white dark:bg-gray-700/60 rounded-md border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{td('diskUsage')}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">1,42 GB / ∞</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: '5%' }}></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">5%</span>
              </div>

              {/* Bandwidth */}
              <div className="p-2 bg-white dark:bg-gray-700/60 rounded-md border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{td('bandwidth')}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">126,92 MB / ∞</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: '10%' }}></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hesap Limitleri */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/10 rounded-md">
                <ChartBarIcon className="w-4 h-4 text-amber-600 dark:text-amber-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Hesap Limitleri</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">Alias Domains</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">0 / 0</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">Eklenti Etki Alanları</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">0 / 0</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">Alt Etki Alanları</span>
                <span className="font-medium text-green-600 dark:text-green-400">0 / ∞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">E-posta Hesapları</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">5 / ∞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">Otomatik Yanıtlayıcılar</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">0 / ∞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">İleticiler</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">0 / ∞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">E-posta Filtreleri</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">1 / ∞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400">FTP Hesapları</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">1 / ∞</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-gray-600 dark:text-gray-400">Veritabanları</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">3 / ∞</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sunucu Kaynakları */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-sky-50 dark:bg-sky-900/10 rounded-md">
                <CpuChipIcon className="w-4 h-4 text-sky-600 dark:text-sky-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{td('serverResources')}</h3>
            </div>

            <div className="space-y-3 text-sm">
              {/* CPU */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{td('cpuUsage')}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">0 / 100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">0%</div>
              </div>

              {/* Physical Memory */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{td('physicalMemory')}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">0 bayt / 1 GB</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">0%</div>
              </div>

              {/* Entry Processes */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{td('entryProcesses')}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">0 / 100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">0%</div>
              </div>

              {/* IOPS */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">IOPS</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">0 / 15.360</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">0%</div>
              </div>

              {/* I/O Usage */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{td('ioUsage')}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">0 bayt/s / 15 MB/s</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">0%</div>
              </div>

              {/* Processes */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{td('numberOfProcesses')}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">0 / 200</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">0%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
