import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Try calling FastAPI backend server first
  try {
    const fastApiResponse = await fetch("http://localhost:8000/api/detect-region", {
      cache: "no-store",
    });
    if (fastApiResponse.ok) {
      const data = await fastApiResponse.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    // FastAPI server not reachable, fallback to direct Geo-IP lookup
  }

  try {
    const geoRes = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (geoRes.ok) {
      const data = await geoRes.json();
      const countryCode = (data.country_code || "IN").toUpperCase();
      return NextResponse.json({
        status: "success",
        ip: data.ip,
        country_code: countryCode,
        country_name: data.country_name || "India",
        region: countryCode === "IN" ? "in" : "global",
        mode: "auto"
      });
    }
  } catch (geoErr) {
    // Fallback default
  }

  return NextResponse.json({
    status: "success",
    ip: "127.0.0.1",
    country_code: "IN",
    country_name: "India",
    region: "in",
    mode: "auto"
  });
}
