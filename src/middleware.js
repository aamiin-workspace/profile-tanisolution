import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const isLoginPage = pathname === '/admin/login';
  const isAdminPage = pathname.startsWith('/admin');
  
  const isWriteApi = pathname.startsWith('/api') && 
                     !pathname.startsWith('/api/auth') && 
                     method !== 'GET'; 
  
  if (isLoginPage) {
    const token = request.cookies.get('token')?.value;
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);
            return NextResponse.redirect(new URL('/admin', request.url)); // atau /admin/partners
        } catch (e) {
        }
    }
    return NextResponse.next();
  }

  if (!isAdminPage && !isWriteApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  const unauthorized = () => {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  };

  if (!token) return unauthorized();

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return unauthorized();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};