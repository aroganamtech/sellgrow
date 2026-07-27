import React from "react";
import SubAdminRoleClient from "./SubAdminRoleClient";

export function generateStaticParams() {
  return [
    { role: "operator" },
    { role: "developer" },
    { role: "manager" },
    { role: "support" },
    { role: "admin" },
    { role: "superadmin" },
  ];
}

export default function SubAdminRolePage() {
  return <SubAdminRoleClient />;
}
