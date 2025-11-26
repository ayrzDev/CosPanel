'use client';

import { useState } from 'react';
import { 
  CommandLineIcon, 
  PlayIcon,
  StopIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function TerminalPage() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{cmd: string; output: string}>>([
    { cmd: 'whoami', output: 'siyezden' },
    { cmd: 'pwd', output: '/home/siyezden' },
    { cmd: 'ls -la', output: `total 48
drwxr-xr-x  7 siyezden siyezden 4096 Dec  3 10:25 .
drwxr-xr-x  3 root     root     4096 Jan 10  2024 ..
-rw-r--r--  1 siyezden siyezden  220 Jan 10  2024 .bash_logout
-rw-r--r--  1 siyezden siyezden 3526 Jan 10  2024 .bashrc
drwx------  2 siyezden siyezden 4096 Dec  1 14:30 .ssh
drwxr-xr-x  5 siyezden siyezden 4096 Nov 28 09:15 public_html
drwxr-xr-x  3 siyezden siyezden 4096 Oct 15 16:45 logs
drwxr-xr-x  2 siyezden siyezden 4096 Sep 20 11:20 backups` },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // Simulate command execution
    let output = '';
    const cmd = command.trim().toLowerCase();

    if (cmd === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    } else if (cmd === 'help') {
      output = `Available commands:
  ls [-la]        - List directory contents
  pwd             - Print working directory
  whoami          - Print current user
  cd <directory>  - Change directory
  cat <file>      - Display file contents
  mkdir <name>    - Create directory
  rm <file>       - Remove file
  clear           - Clear terminal
  help            - Show this help message`;
    } else if (cmd === 'date') {
      output = new Date().toString();
    } else if (cmd === 'uptime') {
      output = ' 10:25:32 up 45 days,  3:14,  1 user,  load average: 0.15, 0.18, 0.12';
    } else if (cmd === 'df -h') {
      output = `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        99G   62G   32G  66% /
tmpfs           3.9G     0  3.9G   0% /dev/shm
/dev/sdb1       500G  142G  333G  30% /home`;
    } else if (cmd.startsWith('echo ')) {
      output = cmd.substring(5);
    } else {
      output = `bash: ${cmd}: command not found`;
    }

    setHistory([...history, { cmd: command, output }]);
    setCommand('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-900 dark:bg-gray-700 rounded-lg">
              <CommandLineIcon className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Terminal
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Web tabanlı SSH terminal erişimi
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
              <PlayIcon className="w-4 h-4" />
              Bağlan
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm">
              <StopIcon className="w-4 h-4" />
              Bağlantıyı Kes
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400 font-mono">siyezden@server ~ bash</span>
          <button 
            onClick={() => setHistory([])}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 h-[600px] overflow-y-auto font-mono text-sm">
          {/* History */}
          {history.map((item, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex items-center gap-2">
                <span className="text-green-400">siyezden@server</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="text-white">{item.cmd}</span>
              </div>
              <div className="text-gray-300 whitespace-pre-wrap mt-1 pl-4">
                {item.output}
              </div>
            </div>
          ))}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-green-400">siyezden@server</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-400">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none border-none"
              placeholder="Komut girin..."
              autoFocus
            />
          </form>
        </div>
      </div>

      {/* Quick Commands */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Hızlı Komutlar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Disk Kullanımı', cmd: 'df -h' },
            { label: 'Çalışma Süresi', cmd: 'uptime' },
            { label: 'Aktif Süreçler', cmd: 'top' },
            { label: 'Ağ Bilgileri', cmd: 'ifconfig' },
            { label: 'Dosyaları Listele', cmd: 'ls -la' },
            { label: 'Sistem Bilgisi', cmd: 'uname -a' },
            { label: 'Bellek Kullanımı', cmd: 'free -h' },
            { label: 'Tarih/Saat', cmd: 'date' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCommand(item.cmd);
                // Auto-execute
                const output = item.cmd === 'df -h' 
                  ? `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        99G   62G   32G  66% /` 
                  : item.cmd === 'uptime'
                  ? ' 10:25:32 up 45 days,  3:14,  1 user,  load average: 0.15, 0.18, 0.12'
                  : `Executing: ${item.cmd}...`;
                setHistory([...history, { cmd: item.cmd, output }]);
                setCommand('');
              }}
              className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-left"
            >
              <CommandLineIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{item.cmd}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Help Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <DocumentTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
              Terminal Kullanım İpuçları
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Yardım için <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">help</code> komutunu kullanın</li>
              <li>• Ekranı temizlemek için <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">clear</code> yazın</li>
              <li>• Önceki komutlarınız geçmişte saklanır</li>
              <li>• Hızlı erişim için sağdaki butonları kullanabilirsiniz</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
