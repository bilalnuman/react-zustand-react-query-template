import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { SalesRepCanNotAccessTheseRoutes } from './constant.data/routes';

const publicRoutes = ["login"];

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
    const payload = JSON.parse(jsonPayload);
    
    // Check if token is expired (exp is in seconds)
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    
    return payload;
  } catch (e) {
    return null;
  }
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Run intl middleware first to handle locales
  const response = intlMiddleware(request);

  // 2. Access control logic (formerly in proxy.ts)
  const token = request.cookies.get('accessToken')?.value;
  const payload = token ? decodeJwt(token) : null;
  const role = payload?.role;

  const segments = pathname.split('/').filter(Boolean);
  const locale = routing.locales.includes(segments[0] as any) ? segments[0] : routing.defaultLocale;
  const hasLocale = routing.locales.includes(segments[0] as any);
  const currentRoute = hasLocale ? segments[1] : segments[0];

  if (role && publicRoutes.includes(currentRoute)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (role === 'sales_rep' && SalesRepCanNotAccessTheseRoutes.includes(currentRoute)) {
    return NextResponse.redirect(new URL(`/${locale}/unauthorized`, request.url));
  }

  return response;
}

export const config = {
  // Combine matchers from both
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
