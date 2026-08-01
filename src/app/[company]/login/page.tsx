import React from "react";
import LoginPage from "@/app/login/page";

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

export default function CompanyLoginPage() {
  return <LoginPage />;
}
