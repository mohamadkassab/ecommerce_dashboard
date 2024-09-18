import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTHTOKEN, ROUTES } from "./utils/constants";
import { PROTECTED_ROUTES } from "./utils/constants";
import cookie from 'cookie';
import jwt from 'jsonwebtoken'; 

export function middleware(request: NextRequest) {
  
  if (!PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const cookies = request.headers.get('cookie');
    const parsedCookies = cookies ? cookie.parse(cookies) : {};
    const jwtToken = parsedCookies[AUTHTOKEN];
    const decodedToken = jwt.decode(jwtToken) ;
    if (decodedToken) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  }
}
