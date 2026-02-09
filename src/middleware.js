import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  const isMaintenancePage = pathname === '/maintenance';
  
  const hasBypassCookie = request.cookies.get('maintenance_bypass');

  if (request.nextUrl.searchParams.get('admin') === 'true') {
    const url = new URL(request.url);
    url.searchParams.delete('admin');
    
    const response = NextResponse.redirect(url);
    response.cookies.set('maintenance_bypass', 'true', { httpOnly: true, maxAge: 3600 }); // Berlaku 1 jam
    return response;
  }

  if (isMaintenanceMode) {
    if (!hasBypassCookie && !isMaintenancePage) {
      return NextResponse.rewrite(new URL('/maintenance', request.url));
    }
  }

  if (!isMaintenanceMode && isMaintenancePage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

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
            return NextResponse.redirect(new URL('/admin', request.url)); 
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