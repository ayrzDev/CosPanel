import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Root path redirect to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
  }
  
  // cPanel-style URL rewriting: /en/cpsess123/frontend/jupiter/dashboard -> /en/dashboard
  const cpanelMatch = pathname.match(/^\/([a-z]{2})\/(cpsess\d+)\/frontend\/jupiter\/(.+)$/);
  if (cpanelMatch) {
    const [, locale, , internalPath] = cpanelMatch;
    
    // Temporarily modify the request URL for processing
    const originalPathname = request.nextUrl.pathname;
    request.nextUrl.pathname = `/${locale}/${internalPath}`;
    
    // Process with intl middleware using modified path
    const response = intlMiddleware(request);
    
    // Restore original path for rewrite
    request.nextUrl.pathname = originalPathname;
    
    // If intl middleware wants to redirect, respect that
    if (response.status === 307 || response.status === 308) {
      return response;
    }
    
    // Create a rewrite response that keeps cPanel URL but serves clean path
    const rewriteUrl = new URL(request.url);
    rewriteUrl.pathname = `/${locale}/${internalPath}`;
    
    const rewriteResponse = NextResponse.rewrite(rewriteUrl);
    
    // CRITICAL: Copy all headers and cookies from intl response
    response.headers.forEach((value, key) => {
      rewriteResponse.headers.set(key, value);
    });
    
    // Especially important: preserve locale cookie
    const localeCookie = response.cookies.get('NEXT_LOCALE');
    if (localeCookie) {
      rewriteResponse.cookies.set('NEXT_LOCALE', localeCookie.value, localeCookie);
    }
    
    return rewriteResponse;
  }
  
  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  
  // Public routes (login, register, etc.)
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.some(route => pathnameWithoutLocale.startsWith(route));
  
  // Check for auth token
  const token = request.cookies.get('accessToken')?.value;
  
  // If trying to access protected route without token, redirect to login
  if (!isPublicRoute && !token && pathnameWithoutLocale.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  
  // If logged in and trying to access login page, redirect to dashboard
  if (isPublicRoute && token && pathnameWithoutLocale === '/login') {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }
  
  // Apply i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(tr|en)/:path*']
};
