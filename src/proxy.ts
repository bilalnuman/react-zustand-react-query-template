import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SalesRepCanNotAccessTheseRoutes } from './constant.data/routes';
const publicRoutes = ["login"]

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
  const role = payload?.role;

  const segments = pathname.split('/').filter(Boolean);

  const currentRoute = segments[0];
  if (role && publicRoutes.includes(currentRoute)) {
    return NextResponse.redirect(
      new URL('/', request.url)
    );
  }
  if (role === 'sales_rep' && SalesRepCanNotAccessTheseRoutes.includes(currentRoute)
  ) {
    return NextResponse.redirect(
      new URL('/unauthorized', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
