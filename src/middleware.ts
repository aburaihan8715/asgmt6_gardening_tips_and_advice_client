import { NextRequest, NextResponse } from 'next/server';
// import { getCurrentUser } from './actions/auth.action';

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const userData = await getCurrentUser();
  // const user = userData?.data;
  // // console.log('user from middleware', user);

  // // Public routes accessible without authentication
  // const publicAuthRoutes = [
  //   '/',
  //   '/auth/register',
  //   '/auth/forget-password',
  //   '/auth/reset-password',
  // ];

  // // Unauthorized routes for admin
  // const restrictedAdminRoutes = ['/payment', '/posts', '/comments'];
  // // Unauthorized routes for user
  // const restrictedUserRoutes = ['/admin'];

  // // Unauthenticated user handling
  // if (!user) {
  //   if (publicAuthRoutes.includes(pathname)) {
  //     return NextResponse.next(); // Allow access to public auth routes
  //   }
  //   return NextResponse.redirect(new URL('/', request.url)); // Redirect to login
  // }

  // // Redirect authenticated users away from public auth routes
  // if (publicAuthRoutes.includes(pathname)) {
  //   return NextResponse.redirect(
  //     new URL(`/${user?.role}/dashboard`, request.url),
  //   );
  // }

  // // Role-based redirection
  // if (user.role === 'admin' && pathname.startsWith('/user')) {
  //   return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  // }

  // if (user.role === 'user' && pathname.startsWith('/admin')) {
  //   return NextResponse.redirect(new URL('/user/dashboard', request.url));
  // }

  // // Restrict admin access to certain routes
  // if (
  //   user.role === 'admin' &&
  //   restrictedAdminRoutes.some((route) => pathname.startsWith(route))
  // ) {
  //   return NextResponse.redirect(new URL('/unauth', request.url));
  // }

  // // Restrict user access to certain routes
  // if (
  //   user.role === 'user' &&
  //   restrictedUserRoutes.some((route) => pathname.startsWith(route))
  // ) {
  //   return NextResponse.redirect(new URL('/unauth', request.url));
  // }
  // Allow the request to proceed if no conditions match
  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     '/',
//     '/auth/:path*',
//     '/admin/:path*',
//     '/user/:path*',
//     '/comments/:path*',
//     '/payment/:path*',
//     '/posts/:path*',
//   ],
// };
