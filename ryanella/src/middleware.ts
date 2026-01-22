import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect Admin routes
    if (pathname.startsWith('/api/admin')) {
        const token = request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
        }

        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);

            if (decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_ADMIN') {
                return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
            }

            return NextResponse.next();
        } catch (error) {
            return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
        }
    }

    // Protect User-specific routes (e.g., placing orders, viewing account)
    if (pathname.startsWith('/api/orders') && request.method !== 'GET') {
        const token = request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        try {
            jwt.verify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/admin/:path*', '/api/orders/:path*', '/api/user/:path*'],
};
