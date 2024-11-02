import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTHTOKEN, ROUTES } from "./utils/constants";
import { SECTIONS } from "./utils/constants";
import cookie from 'cookie';
import jwt from 'jsonwebtoken';


export function middleware(request: NextRequest) {
  const section = SECTIONS.find(section => section.path === request.nextUrl.pathname);
  if (!(section?.protected || false)) {
    return NextResponse.next();
  }
  else {
    const cookies = request.headers.get('cookie');
    const parsedCookies = cookies ? cookie.parse(cookies) : {};
    const jwtToken = parsedCookies[AUTHTOKEN];

    if (jwtToken) {
      const decodedToken = jwt.decode(jwtToken);
      if (decodedToken && typeof decodedToken === 'object' && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          const response = NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
          response.headers.set('Set-Cookie', cookie.serialize(AUTHTOKEN, '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0),
            path: '/'
          }));

          return response;
        } else {
          const requiredPermissions = section?.requiredPermissions;

          if (decodedToken?.username === "root@e.com" || requiredPermissions.length === 0 || requiredPermissions.some(permission => decodedToken?.permission?.includes(permission))) {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
          }

        }
      }
    }
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  }
}
