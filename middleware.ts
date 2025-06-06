import { clerkMiddleware, createRouteMatcher, } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/login',
  '/signup',
  '/companies',
  '/jobs',
    '/jobs/:id' ,
  '/companies/:id',
  '/api/jobs',
  '/api/companies',
  '/api/jobs/:id'

])
//grants you access to user authentication state throughout your app.
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}