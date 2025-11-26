'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  FolderIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
  FolderPlusIcon,
  DocumentPlusIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
  CheckIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  permissions: string;
  content?: string;
}

export default function FilesPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [currentPath, setCurrentPath] = useState('/public_html');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [settings, setSettings] = useState({
    showHidden: false,
    disableCharsetValidation: false,
    defaultDirectory: '/public_html',
  });

  // Mock data - her klasör için içerik
  const getMockFiles = (path: string): FileItem[] => {
    const allFilesByPath: Record<string, FileItem[]> = {
      '/public_html': [
        { id: '1', name: '.htaccess', type: 'file', size: '1.2 KB', modified: '2024-11-25 14:30', permissions: '644', content: '# Apache .htaccess file\nRewriteEngine On' },
        { id: '2', name: 'index.html', type: 'file', size: '4.8 KB', modified: '2024-11-28 10:00', permissions: '644', content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Welcome</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>' },
        { id: '3', name: 'style.css', type: 'file', size: '12.3 KB', modified: '2024-11-27 16:45', permissions: '644', content: 'body {\n  margin: 0;\n  padding: 0;\n  font-family: Arial, sans-serif;\n}' },
        { id: '4', name: 'script.js', type: 'file', size: '8.7 KB', modified: '2024-11-26 12:20', permissions: '644', content: 'console.log("Hello from script.js");' },
        { id: '5', name: 'images', type: 'folder', modified: '2024-11-20 09:15', permissions: '755' },
        { id: '6', name: 'css', type: 'folder', modified: '2024-11-18 14:30', permissions: '755' },
        { id: '7', name: 'js', type: 'folder', modified: '2024-11-15 08:30', permissions: '755' },
        { id: '8', name: 'uploads', type: 'folder', modified: '2024-11-10 11:45', permissions: '755' },
        { id: '9', name: 'favicon.ico', type: 'file', size: '15 KB', modified: '2024-10-05 13:20', permissions: '644' },
        { id: '10', name: 'robots.txt', type: 'file', size: '245 B', modified: '2024-09-12 09:00', permissions: '644', content: 'User-agent: *\nDisallow: /admin/' },
        { id: '11', name: '.env', type: 'file', size: '512 B', modified: '2024-11-01 08:00', permissions: '600', content: 'APP_ENV=production\nDB_HOST=localhost' },
      ],
      '/public_html/images': [
        { id: 'img1', name: 'logo.png', type: 'file', size: '245 KB', modified: '2024-11-20 09:15', permissions: '644' },
        { id: 'img2', name: 'banner.jpg', type: 'file', size: '1.2 MB', modified: '2024-11-19 14:30', permissions: '644' },
        { id: 'img3', name: 'icon.svg', type: 'file', size: '8 KB', modified: '2024-11-18 11:20', permissions: '644' },
        { id: 'img4', name: 'thumbnails', type: 'folder', modified: '2024-11-15 10:00', permissions: '755' },
      ],
      '/public_html/css': [
        { id: 'css1', name: 'main.css', type: 'file', size: '45 KB', modified: '2024-11-18 14:30', permissions: '644' },
        { id: 'css2', name: 'responsive.css', type: 'file', size: '23 KB', modified: '2024-11-17 10:15', permissions: '644' },
        { id: 'css3', name: 'animations.css', type: 'file', size: '12 KB', modified: '2024-11-16 09:45', permissions: '644' },
      ],
      '/public_html/js': [
        { id: 'js1', name: 'app.js', type: 'file', size: '78 KB', modified: '2024-11-15 08:30', permissions: '644' },
        { id: 'js2', name: 'vendor.js', type: 'file', size: '234 KB', modified: '2024-11-10 16:20', permissions: '644' },
        { id: 'js3', name: 'utils.js', type: 'file', size: '15 KB', modified: '2024-11-12 11:30', permissions: '644' },
      ],
      '/public_html/uploads': [
        { id: 'up1', name: 'document.pdf', type: 'file', size: '2.4 MB', modified: '2024-11-10 11:45', permissions: '644' },
        { id: 'up2', name: 'video.mp4', type: 'file', size: '45 MB', modified: '2024-11-05 09:30', permissions: '644' },
        { id: 'up3', name: '2024', type: 'folder', modified: '2024-11-01 08:00', permissions: '755' },
      ],
    };
    
    return allFilesByPath[path] || [];
  };

  const allFiles = getMockFiles(currentPath);

  const files = settings.showHidden 
    ? allFiles 
    : allFiles.filter(f => !f.name.startsWith('.'));

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Breadcrumb hesaplama
  const breadcrumbs = currentPath === '/public_html' 
    ? [] 
    : currentPath.replace('/public_html/', '').split('/').filter(Boolean);

  const handleEdit = (file: FileItem) => {
    if (file.type === 'folder') {
      // Klasöre gir
      const newPath = `${currentPath}/${file.name}`;
      setCurrentPath(newPath);
      setSelectedFiles([]);
    } else if (file.type === 'file') {
      // Image dosyalarını editörde açma, sadece kod dosyalarını aç
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico', '.bmp'];
      const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.webm'];
      const isImage = imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      const isVideo = videoExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      
      if (isImage || isVideo) {
        // Image/video dosyaları için önizleme göster (şimdilik alert, ileride modal olabilir)
        alert(`Önizleme: ${file.name}\n\nBoyut: ${file.size}\nTür: ${isImage ? 'Resim' : 'Video'}\n\nGerçek uygulamada burada bir önizleme modal'ı açılacak.`);
      } else {
        // Sadece kod dosyalarını editörde aç
        router.push(`/${locale}/files/edit/${encodeURIComponent(file.name)}`);
      }
    }
  };

  const handleRename = (fileId: string, currentName: string) => {
    setRenamingFile(fileId);
    setNewFileName(currentName);
  };

  const handleSaveRename = (fileId: string) => {
    // Mock rename - gerçekte API'ye gönderilecek
    console.log('Renaming file:', fileId, 'to', newFileName);
    setRenamingFile(null);
  };

  const handleDelete = (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      console.log('Deleting file:', fileId);
    }
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Mock upload with progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            alert(`${files[0].name} uploaded successfully!`);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      console.log('Creating folder:', newFolderName);
      setShowNewFolder(false);
      setNewFolderName('');
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* New Folder Modal */}
      {showNewFolder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Folder
              </h3>
              <button
                onClick={() => setShowNewFolder(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Folder Name
              </label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="my-folder"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowNewFolder(false)}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-[300px] z-50">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Uploading...
          </h4>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {uploadProgress}%
          </p>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                File Manager Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gelecekte varsayılan olarak bu dizini her zaman aç:
                </label>
                <select
                  value={settings.defaultDirectory}
                  onChange={(e) => setSettings({ ...settings, defaultDirectory: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm"
                >
                  <option value="/home">Giriş Dizini</option>
                  <option value="/public_html">Web Kökü (public_html or www)</option>
                  <option value="/public_ftp">Genel FTP Root (public_ftp)</option>
                  <option value="/siyezden.com">Şunun Belge Kök Dizini: siyezden.com</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showHidden"
                  checked={settings.showHidden}
                  onChange={(e) => setSettings({ ...settings, showHidden: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="showHidden" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Gizli Dosyaları Göster (dotfiles)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disableCharset"
                  checked={settings.disableCharsetValidation}
                  onChange={(e) => setSettings({ ...settings, disableCharsetValidation: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="disableCharset" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Karakter Kodlama Doğrulama Mesajlarını Devre Dışı Bırak
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setCurrentPath(settings.defaultDirectory);
                }}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* cPanel Style Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-4 flex flex-wrap items-center gap-3 border-b border-gray-200 dark:border-gray-700">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <button 
              onClick={handleUpload}
              className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
            >
              <ArrowUpTrayIcon className="w-4 h-4 mr-1.5" />
              Upload
            </button>
            <button 
              onClick={() => setShowNewFolder(true)}
              className="flex items-center px-3 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors"
            >
              <FolderPlusIcon className="w-4 h-4 mr-1.5" />
              Folder
            </button>
            <button className="flex items-center px-3 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors">
              <DocumentPlusIcon className="w-4 h-4 mr-1.5" />
              File
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center px-3 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors"
            >
              <Cog6ToothIcon className="w-4 h-4 mr-1.5" />
              Settings
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex items-center px-3 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors"
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="w-4 h-4" />
              ) : (
                <ArrowsPointingOutIcon className="w-4 h-4" />
              )}
            </button>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                } transition-colors`}
              >
                <ListBulletIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                } transition-colors border-l border-gray-300 dark:border-gray-600`}
              >
                <Squares2X2Icon className="w-4 h-4" />
              </button>
            </div>
            <button className="p-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors">
              <ArrowsPointingOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => setCurrentPath('/public_html')}
              className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
            >
              <HomeIcon className="w-4 h-4 mr-1" />
              home
            </button>
            {breadcrumbs.map((crumb, idx) => {
              const pathUpToHere = '/public_html/' + breadcrumbs.slice(0, idx + 1).join('/');
              return (
                <div key={idx} className="flex items-center space-x-2">
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                  <button 
                    onClick={() => setCurrentPath(pathUpToHere)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
                  >
                    {crumb}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* File List/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Last Modified
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Permissions
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No files found
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file) => {
                  const Icon = file.type === 'folder' ? FolderIcon : DocumentIcon;
                  return (
                    <tr
                      key={file.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input 
                          type="checkbox" 
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => toggleFileSelection(file.id)}
                          className="rounded border-gray-300 dark:border-gray-600" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Icon
                            className={`w-5 h-5 mr-3 ${
                              file.type === 'folder'
                                ? 'text-yellow-500'
                                : 'text-blue-500'
                            }`}
                          />
                          {renamingFile === file.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                className="px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveRename(file.id)}
                                className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded"
                              >
                                <CheckIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setRenamingFile(null)}
                                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onDoubleClick={() => file.type === 'folder' ? setCurrentPath(`${currentPath}/${file.name}`) : handleEdit(file)}
                              className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {file.name}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {file.size || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {file.modified}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {file.permissions}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {file.type === 'file' && (
                            <>
                              <button 
                                onClick={() => handleEdit(file)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded transition-colors" 
                                title="Edit"
                              >
                                <PencilSquareIcon className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30 rounded transition-colors" title="Download">
                                <ArrowDownTrayIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => handleRename(file.id, file.name)}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded transition-colors" 
                            title="Rename"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded transition-colors" title="Copy">
                            <DocumentDuplicateIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(file.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded transition-colors" 
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
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
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map((file) => {
              const Icon = file.type === 'folder' ? FolderIcon : DocumentIcon;
              return (
                <div
                  key={file.id}
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all cursor-pointer group"
                >
                  <Icon
                    className={`w-12 h-12 mb-2 ${
                      file.type === 'folder'
                        ? 'text-yellow-500'
                        : 'text-blue-500'
                    }`}
                  />
                  <span className="text-xs text-center text-gray-700 dark:text-gray-300 truncate w-full">
                    {file.name}
                  </span>
                  {file.size && (
                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {file.size}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{filteredFiles.length} items</span>
          <span>{filteredFiles.filter(f => f.type === 'folder').length} folders, {filteredFiles.filter(f => f.type === 'file').length} files</span>
        </div>
      </div>
    </div>
  );
}
