import { NextRequest, NextResponse } from 'next/server';

import { getCurrentUser } from './actions/auth.action';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  const publicAuthRoutes = [
    '/',
    '/auth/register',
    '/auth/forget-password',
    '/auth/reset-password',
  ];

  // const restrictedAdminRoutes = ['/posts', '/user'];
  // const restrictedUserRoutes = ['/admin'];

  // If the user is not authenticated
  if (!user) {
    if (publicAuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Prevent logged-in users from accessing auth pages
  if (publicAuthRoutes.includes(pathname)) {
    if (user.role === 'admin') {
      return NextResponse.redirect(
        new URL('/admin/dashboard', request.url),
      );
    } else if (user.role === 'user') {
      return NextResponse.redirect(new URL('/posts', request.url));
    }
  }

  // Role-based access control
  // if (user.role === 'admin' && pathname.startsWith('/user')) {
  //   return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  // }

  // if (user.role === 'user' && pathname.startsWith('/admin')) {
  //   return NextResponse.redirect(new URL('/user/dashboard', request.url));
  // }

  // Restrict admin access to certain routes
  // if (
  //   user.role === 'admin' &&
  //   restrictedAdminRoutes.some((route) => pathname.startsWith(route))
  // ) {
  //   return NextResponse.redirect(new URL('/unauth', request.url));
  // }

  // Restrict user access to certain routes
  // if (
  //   user.role === 'user' &&
  //   restrictedUserRoutes.some((route) => pathname.startsWith(route))
  // ) {
  //   return NextResponse.redirect(new URL('/unauth', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/admin/:path*',
    '/user/:path*',
    '/posts/:path*',
    '/unauth', // Ensure this is included
  ],
};
