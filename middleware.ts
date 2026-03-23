import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only protect custom admin routes (not the Payload admin interface)
  if (request.nextUrl.pathname.startsWith('/admin') &&
      !request.nextUrl.pathname.startsWith('/admin/api') &&
      !request.nextUrl.pathname.includes('_payload')) {

    const token = request.cookies.get('payload-token')

    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Token exists — allow through. Full validation happens server-side
    // in Payload's API handlers. Avoid loopback fetch from edge middleware
    // which causes deadlocks on Vercel.
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Only match custom admin routes
    '/admin/((?!api).*)',
  ]
}
