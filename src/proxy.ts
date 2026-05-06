import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  const payload = token ? decodeJwt(token) : null;
  const role = payload?.role; // Assuming role is in the token payload
  
  // Protected routes
  const isManagerRoute = pathname.startsWith('/manager');
  const isSalesRoute = pathname.startsWith('/sales');

  if (isManagerRoute && role !== 'manager') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isSalesRoute && role !== 'sale_rep') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Auth pages redirect
  if ((pathname === '/login' || pathname === '/verify-otp') && role) {
    const dashboard = role === 'manager' ? '/manager' : '/sales';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/manager/:path*', '/sales/:path*', '/login', '/verify-otp'],
};
