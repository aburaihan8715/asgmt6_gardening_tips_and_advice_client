import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getCurrentUser } from './services/AuthService';

const AuthRoutes = [
  '/login',
  '/register',
  '/forget-password',
  '/reset-password',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  // 01 check authentication
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : '/login',
          request.url,
        ),
      );
    }
  }

  // 02 check authorization
  if (user.role === 'ADMIN' && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }

  if (user.role === 'USER' && pathname.match(/^\/user-dashboard/)) {
    return NextResponse.next();
  }

  if (user.role === 'USER' && pathname.match(/^\/profile/)) {
    return NextResponse.next();
  }
  if (user.role === 'ADMIN' && pathname.match(/^\/profile/)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/user-dashboard/:path*',
    '/admin-dashboard/:path*',
    '/profile/change-password/:path*',
    '/profile/settings-profile/:path*',
    '/login',
    '/register',
    '/forget-password',
    '/reset-password',
  ],
};
