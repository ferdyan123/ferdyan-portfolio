import { NextResponse } from 'next/server';

// Lindungi semua route di bawah /prd kecuali /prd/login
export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname.startsWith('/prd/login');
  const isProtected = pathname.startsWith('/prd') && !isLoginRoute;

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = request.cookies.get('prd_session');

  if (session?.value !== 'authenticated') {
    const loginUrl = new URL('/prd/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/prd/:path*'],
};