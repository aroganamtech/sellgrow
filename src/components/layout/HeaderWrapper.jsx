"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function HeaderWrapper() {
    const pathname = usePathname();

    if (!pathname) return <Navbar />;

    // Routes where public website header must NOT be rendered
    const isExcludedRoute =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/service-person") ||
        pathname.startsWith("/sg-admin") ||
        pathname.startsWith("/sg-superadmin") ||
        pathname.includes("/dashboard") ||
        pathname.includes("/login") ||
        pathname.includes("/sg-admin") ||
        pathname.includes("/sg-superadmin");

    if (isExcludedRoute) {
        return null;
    }

    return <Navbar />;
}
