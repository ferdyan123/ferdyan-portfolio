import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();

  const validEmail = process.env.PRD_AUTH_EMAIL;
  const validPassword = process.env.PRD_AUTH_PASSWORD;

  if (email === validEmail && password === validPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('prd_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ success: false, message: 'Email atau password salah' }, { status: 401 });
}