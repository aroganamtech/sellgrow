import React from "react";
import AdminGrowthPage from "@/app/sg-superadmin/admin-growth/page";
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
export default function CompanyAdminGrowthPage() {
    return <AdminGrowthPage />;
}
