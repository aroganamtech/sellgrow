import React from "react";
import SuperAdminPage from "@/app/sg-superadmin/page";
export function generateStaticParams() {
    return [
        { company: "nomo" },
        { company: "apex" },
        { company: "retail-shop" },
        { company: "sellgrow" },
        { company: "demo" },
        { company: "client" },
    ];
}
export default function CompanySuperAdminPage() {
    return <SuperAdminPage />;
}
