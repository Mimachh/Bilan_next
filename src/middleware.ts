import NextAuth from "next-auth";

import authConfig from "@/next-auth-config/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
  DEFAULT_FORBIDDEN_REDIRECT,
  recaptchaRoute,
  publicBetaPages
} from "@/next-auth-config/routes";
import { NextResponse } from "next/server";
import { useCheckAdminRole, useCheckSuperAdminRole } from "@/hooks/use-check-admin-role";

const { auth } = NextAuth(authConfig);

//@ts-ignore
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;



  const isAdmin = await useCheckAdminRole(req.auth?.user.roles) || await useCheckSuperAdminRole(req.auth?.user.roles);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isPublicBetaPages = publicBetaPages.includes(nextUrl.pathname);
  const isRecaptchaRoute = nextUrl.pathname === recaptchaRoute;

  if (!isPublicBetaPages && !isApiAuthRoute) {
    if (isRecaptchaRoute || isPublicBetaPages) {
      return null;
    } else {
      return NextResponse.redirect(new URL("/", nextUrl));
    }

  }


  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      // return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null;
  }

  if (isAdminRoute) {
    if (isLoggedIn && isAdmin) {
      return null;
    } else if (isLoggedIn && !isAdmin) {
      return Response.redirect(new URL(DEFAULT_FORBIDDEN_REDIRECT, nextUrl))
    }
  }


  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    // return Response.redirect(new URL(
    //   `/auth/login?callbackUrl=${encodedCallbackUrl}`,
    //   nextUrl
    // ));
  }

  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}