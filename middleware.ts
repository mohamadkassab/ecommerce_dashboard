// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './utils/constants';
import { PROTECTED_ROUTES } from './utils/constants';



export function middleware(request: NextRequest) {
  return NextResponse.next();
  if (!PROTECTED_ROUTES.includes(request.nextUrl.pathname)) { 
    return NextResponse.next();
  }else{
    return new NextResponse('Access Denied', { status: 403 });
  }
  //else{
  //   try{
  //     const token = request.cookies.get('auth-token')?.value;
  //     if (!token && !request.nextUrl.pathname.startsWith('/_next/static/chunks/app/(auth)/login')) {
  //       console.log(request.nextUrl.pathname);
  //       return NextResponse.redirect(new URL('/login', request.url));
  //     }
  //   }catch(error){
  //     console.log(error);
  //   }

  // }

 
  
  

 
  // return NextResponse.next();
}


// // Optionally, define specific routes for the middleware
// export const config = {
//   matcher: ['/dashboard/:path*', '/profile/:path*'], // Apply middleware to these routes
// };