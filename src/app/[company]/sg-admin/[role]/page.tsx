import React from "react";
import SubAdminRoleClient from "@/app/sg-admin/[role]/SubAdminRoleClient";

export function generateStaticParams() {
  const companies = ["nomo", "apex", "retail-shop", "sellgrow", "demo", "client"];
  const roles = ["superadmin", "admin", "operator", "manager", "developer", "support"];
  
  const params: { company: string; role: string }[] = [];
  for (const company of companies) {
    for (const role of roles) {
      params.push({ company, role });
    }
  }
  return params;
}

export default function CompanySubAdminRolePage() {
  return <SubAdminRoleClient />;
}
