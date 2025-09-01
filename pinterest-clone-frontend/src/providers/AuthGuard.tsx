"use client";
import { useGetMe } from "@/hooks/auth";
import { useAuthStore } from "@/zustand/auth-state";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearAuth, user: storedUser } = useAuthStore();

  const publicRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/terms-of-service",
    "/privacy-policy",
  ];
  const redirectOnAuthRoutes = ["/auth/sign-in", "/auth/sign-up"];

  const isPublicRoute = publicRoutes.includes(pathname);
  const isRedirectOnAuthRoute = redirectOnAuthRoutes.includes(pathname);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetMe({
    isEnabled: true,
  });

  useEffect(() => {
    if (isPublicRoute) {
      if (user && !isLoading && !isError && isRedirectOnAuthRoute) {
        router.push("/homefeed");
        setIsAuth(true);
        return;
      }
      setIsAuth(true);
      return;
    }

    if (isError) {
      console.log("Authentication failed:", error);
      clearAuth();
      setIsAuth(false);
      router.push("/auth/sign-in");
      return;
    }

    if (!isLoading && !user) {
      clearAuth();
      setIsAuth(false);
      router.push("/auth/sign-in");
      return;
    }

    if (!isLoading && user && !isError && !isAuth) {
      setIsAuth(true);
      return;
    }
  }, [
    user,
    isLoading,
    isError,
    error,
    router,
    setUser,
    clearAuth,
    isPublicRoute,
    isRedirectOnAuthRoute,
    isAuth,
  ]);

  if (!isPublicRoute && (isAuth === null || isLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return isAuth ? <>{children}</> : null;
}
