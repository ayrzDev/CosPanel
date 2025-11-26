'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Public pages that don't require auth (compare without locale prefix)
      const publicPages = ['/login'];
      const localeMatch = pathname?.match(/^\/([a-z]{2})(\/|$)/);
      const pathnameWithoutLocale = localeMatch ? pathname.replace(`/${localeMatch[1]}`, '') : pathname;

      if (publicPages.includes(pathnameWithoutLocale)) {
        setIsChecking(false);
        return;
      }

      // Check if user is authenticated
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('customer_token');
        
        if (!token) {
          // Not authenticated, set demo data for testing
          console.log('No customer token found, setting demo data');
          localStorage.setItem('customer_user', JSON.stringify({
            id: '1',
            username: 'demo',
            fullName: 'Demo Customer',
            email: 'demo@example.com',
            status: 'ACTIVE',
            hostingPlan: {
              name: 'Starter',
              diskSpaceMB: 10240,
              bandwidthMB: 100000,
            },
          }));
          setIsChecking(false);
          return;
        }

        // Validate token with API
        try {
          const response = await fetch('http://localhost:3001/customer-auth/validate', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            // Token is invalid or expired
            console.log('Token validation failed, clearing and using demo');
            localStorage.removeItem('customer_token');
            localStorage.setItem('customer_user', JSON.stringify({
              id: '1',
              username: 'demo',
              fullName: 'Demo Customer',
              email: 'demo@example.com',
              status: 'ACTIVE',
              hostingPlan: {
                name: 'Starter',
                diskSpaceMB: 10240,
                bandwidthMB: 100000,
              },
            }));
            setIsChecking(false);
            return;
          }

          const data = await response.json();
          
          // Update user data if needed
          if (data.customer) {
            localStorage.setItem('customer_user', JSON.stringify(data.customer));
          }
        } catch (error) {
          console.error('Token validation error:', error);
          // On network error, set demo data
          localStorage.setItem('customer_user', JSON.stringify({
            id: '1',
            username: 'demo',
            fullName: 'Demo Customer',
            email: 'demo@example.com',
            status: 'ACTIVE',
            hostingPlan: {
              name: 'Starter',
              diskSpaceMB: 10240,
              bandwidthMB: 100000,
            },
          }));
        }
        
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return <>{children}</>;
}
