import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { getCurrentUser } from './actions/auth.action';

export async function middleware() {
  // const { pathname } = request.nextUrl;
  // const user = await getCurrentUser();

  // let user;
  // try {
  //   user = await getCurrentUser();
  // } catch (error) {
  //   console.error('Error fetching user:', error);
  //   // Redirect to login on errors (optional)
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }

  // Public routes accessible without authentication
  // const publicAuthRoutes = [
  //   '/auth/login',
  //   '/auth/register',
  //   '/auth/forget-password',
  //   '/auth/reset-password',
  // ];

  // Unauthorized routes for admin
  // const restrictedAdminRoutes = ['/payment', '/posts', '/comments'];

  // Unauthenticated user handling
  // if (!user) {
  //   if (publicAuthRoutes.includes(pathname)) {
  //     return NextResponse.next(); // Allow access to public auth routes
  //   }
  //   return NextResponse.redirect(new URL('/auth/login', request.url)); // Redirect to login
  // }

  // Redirect authenticated users away from public auth routes
  // if (publicAuthRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL('/', request.url)); // Redirect to home/dashboard
  // }

  // Role-based redirection
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
  //   return NextResponse.redirect(new URL('/unauth', request.url)); // Redirect to unauthorized page
  // }

  // Allow the request to proceed if no conditions match
  return NextResponse.next();
}
