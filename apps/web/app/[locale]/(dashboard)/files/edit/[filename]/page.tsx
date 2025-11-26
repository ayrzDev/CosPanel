'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

export default function FileEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();
  const filename = decodeURIComponent(params.filename as string);
  
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Mock file content load - gerçekte API'den gelecek
    const mockContent = getMockFileContent(filename);
    setContent(mockContent);
    setOriginalContent(mockContent);
  }, [filename]);

  const getMockFileContent = (name: string) => {
    const mockFiles: Record<string, string> = {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to My Website</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
  
  <main>
    <section>
      <h2>Hello World!</h2>
      <p>This is a sample HTML file.</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2025 My Website. All rights reserved.</p>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>`,
      'style.css': `/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

header {
  background: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

header nav {
  margin-top: 1rem;
}

header nav a {
  color: #fff;
  margin: 0 1rem;
  text-decoration: none;
}

main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

footer {
  text-align: center;
  padding: 1rem;
  background: #333;
  color: #fff;
  margin-top: 2rem;
}`,
      'script.js': `// Main JavaScript file
console.log('Website loaded successfully!');

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Add click event to nav links
  const navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      console.log('Navigating to:', this.getAttribute('href'));
    });
  });
  
  // Example: Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Utility functions
function formatDate(date) {
  return new Date(date).toLocaleDateString('tr-TR');
}

function showMessage(message, type = 'info') {
  console.log(\`[\${type.toUpperCase()}] \${message}\`);
}`,
      '.htaccess': `# Apache .htaccess configuration
# Enable mod_rewrite
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove www
RewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Prevent directory browsing
Options -Indexes

# Custom error pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "no-referrer-when-downgrade"
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`,
      '.env': `# Environment Configuration
# DO NOT COMMIT THIS FILE TO VERSION CONTROL

# Application
APP_ENV=production
APP_DEBUG=false
APP_URL=https://example.com

# Database
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=mydatabase
DB_USERNAME=myuser
DB_PASSWORD=securepassword

# Email
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="\${APP_NAME}"

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# API Keys
API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here`,
      'robots.txt': `# robots.txt for example.com
User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /tmp/
Allow: /

# Sitemaps
Sitemap: https://example.com/sitemap.xml`,
    };

    return mockFiles[name] || `// ${name}\n// File content would be loaded from server\n\nconsole.log("Hello from ${name}");`;
  };

  const getLanguage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'md': 'markdown',
      'php': 'php',
      'py': 'python',
      'rb': 'ruby',
      'java': 'java',
      'sh': 'shell',
      'sql': 'sql',
      'xml': 'xml',
      'yaml': 'yaml',
      'yml': 'yaml',
      'env': 'shell',
      'htaccess': 'apache',
      'txt': 'plaintext',
    };
    return languageMap[ext || ''] || 'plaintext';
  };

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || '';
    setContent(newValue);
    setHasChanges(newValue !== originalContent);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Mock save - gerçekte API'ye gönderilecek
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOriginalContent(content);
    setHasChanges(false);
    setIsSaving(false);
    alert('File saved successfully!');
  };

  const handleDiscard = () => {
    if (confirm('Discard all changes?')) {
      setContent(originalContent);
      setHasChanges(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert('Content copied to clipboard!');
  };

  if (!mounted) return null;

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* cPanel Style Top Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Back & File Info */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Files
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {filename}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                /public_html/{filename}
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {hasChanges && (
              <span className="text-xs text-orange-600 dark:text-orange-400 font-medium px-2 py-1 bg-orange-50 dark:bg-orange-900/20 rounded">
                Unsaved changes
              </span>
            )}
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
            >
              <DocumentDuplicateIcon className="w-4 h-4" />
              Copy
            </button>
            {hasChanges && (
              <button
                onClick={handleDiscard}
                className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
              >
                <XMarkIcon className="w-4 h-4" />
                Discard
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm font-medium"
            >
              {isSaving ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={getLanguage(filename)}
          value={content}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
            renderWhitespace: 'selection',
            lineNumbers: 'on',
            folding: true,
            bracketPairColorization: {
              enabled: true,
            },
          }}
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>Language: {getLanguage(filename)}</span>
          <span>Lines: {content.split('\n').length}</span>
          <span>Size: {new Blob([content]).size} bytes</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Encoding: UTF-8</span>
          <span>Line Ending: LF</span>
        </div>
      </div>
    </div>
  );
}
