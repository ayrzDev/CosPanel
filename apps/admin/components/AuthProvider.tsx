'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page
      if (pathname === '/login') {
        setIsChecking(false);
        setIsAuthenticated(true); // Allow rendering
        return;
      }

      // Check if user is authenticated
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_token');
        
        if (!token) {
          // Not authenticated, redirect to login
          setIsAuthenticated(false);
          setIsChecking(false);
          router.replace('/login');
          return;
        }

        // Validate token with API
        try {
          const response = await fetch('http://localhost:3001/auth/validate', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            // Token is invalid or expired
            console.log('Token validation failed, clearing and redirecting');
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
            setIsAuthenticated(false);
            setIsChecking(false);
            router.replace('/login');
            return;
          }

          const data = await response.json();
          
          // Update user data if needed
          if (data.user) {
            localStorage.setItem('admin_user', JSON.stringify(data.user));
          }
          
          // Authenticated
          setIsAuthenticated(true);
          setIsChecking(false);
        } catch (error) {
          console.error('Token validation error:', error);
          // On network error, allow access (offline mode)
          setIsAuthenticated(true);
          setIsChecking(false);
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Yükleniyor...</div>
      </div>
    );
  }

  // Don't render anything if not authenticated and not on login page
  if (!isAuthenticated && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}
