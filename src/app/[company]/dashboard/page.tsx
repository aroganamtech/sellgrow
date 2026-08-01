import React from "react";
import DashboardPage from "@/app/dashboard/page";

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

export default function CompanyDashboardPage() {
  return <DashboardPage />;
}
